import { User } from "../model/user.model.js";
import { Webhook } from "svix";

const clerkWebhook = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SIGNING_SECRET);

    const evt = await wh.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = evt;

    switch (type) {
      case "user.created": {
        const primaryEmail = data.email_addresses.find(
          e => e.id === data.primary_email_address_id
        )?.email_address;

        const userData = {
          _id: data.id,
          name: `${data.first_name} ${data.last_name}`,
          email: primaryEmail,
          isPasswordEnabled: data.password_enabled,
          isEmailVerified: data.email_addresses.some(e => e.verification?.status === "verified"),
          hasImage: data.has_image,
          avatarUrl: data.image_url,
          lastLoginAt: data.last_sign_in_at || null,
          lastActiveAt: data.last_active_at || null,
        };

        await User.create(userData);
        break;
      }
      case "user.updated": {
        const primaryEmail = data.email_addresses.find(
          e => e.id === data.primary_email_address_id
        )?.email_address;

        const userData = {
          name: `${data.first_name} ${data.last_name}`,
          email: primaryEmail,
          avatarUrl: data.image_url,
        };
        await User.findByIdAndUpdate(
          data.id, 
          userData, 
          { upsert: true, new: true }
        );
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }
      default:
        console.log(`Unhandled event type: ${type}`);
        break;
    }

    return res.status(200).json({
      received: true
    });

  } catch (error) {
    console.error("Webhook error: ", error.message);
    return res.status(400).json({
      message: "Invalid webhook signature or bad request",
    });
  }
};


export {
  clerkWebhook,
}