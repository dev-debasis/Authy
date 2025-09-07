import { User } from "../model/user.model.js";
import { Webhook } from "svix";

const clerkWebhook = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SIGNING_SECRET);

    await wh.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamps"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          name: `${data.first_name} ${data.last_name}`,
          email: data.email_addresses[0].email_address,
          isPasswordEnabled: data.password_enabled,
          isEmailVerified: data.email_addresses[0].verification.status,
          hasImage: data.has_image,
          avatarUrl: data.image_url,
          lastLoginAt: data.last_sign_in_at,
          lastActiveAt: data.last_active_at,
        };
        await User.create(userData);
        res.json({});
        break;
      }
      case "user.updated": {
        const userData = {
          name: `${data.first_name} ${data.last_name}`,
          email: data.email_addresses[0].email_address,
          avatarUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.error("Webhook error: ", error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};


export {
    clerkWebhook,
}