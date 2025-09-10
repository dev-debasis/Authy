import mongoose from "mongoose";
import { Credential } from "../model/credentials.model.js";
import { messageInRaw } from "svix";

const createCredential = async (req, res) => {
  try {
    const userId = req.auth().userId;
    const { title, username, email, phone, password, notes } = req.body;

    if (!title || !password) {
      return res.status(400).json({
        success: false,
        message: "Title and password are required",
      });
    }

    const credential = await Credential.create({
      userId,
      title,
      username: username || null,
      email: email || null,
      phone: phone || null,
      password,
      notes: notes || null,
    });

    return res.status(201).json({
      success: true,
      message: "Credential created successfully",
      credential,
    });
  } catch (error) {
    console.error("Error creating credential:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllCredentials = async (req, res) => {
  try {
    const userId = req.auth().userId;
    const credentials = await Credential.find({ userId });

    return res.status(200).json({
      success: true,
      count: credentials.length,
      credentials,
    });
  } catch (error) {
    console.error("Error fetching credentials:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getCredential = async (req, res) => {
  try {
    const userId = req.auth().userId;
    const credentialId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(credentialId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid credential ID",
      });
    }

    const credential = await Credential.findOne({ _id: credentialId, userId });

    if (!credential) {
      return res.status(404).json({
        success: false,
        message: "Credential not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      credential,
    });
  } catch (error) {
    console.error("Error fetching credential:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateCredential = async (req, res) => {
  try {
    const userId = req.auth().userId;
    const credentialId = req.params.id;

    if(!req.body){
        return res.status(400).json({
            success: false,
            message: "At least one field is required to update"
        })
    }
    
    if (!mongoose.Types.ObjectId.isValid(credentialId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid credential ID",
      });
    }

    const updatedCredential = await Credential.findOneAndUpdate(
      { _id: credentialId, userId },
      req.body,
      { new: true }
    );

    if (!updatedCredential) {
      return res.status(404).json({
        success: false,
        message: "Credential not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Credential updated successfully",
      credential: updatedCredential,
    });
  } catch (error) {
    console.error("Error updating credential:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteCredential = async (req, res) => {
  try {
    const userId = req.auth().userId;
    const credentialId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(credentialId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid credential ID",
      });
    }

    const deletedCredential = await Credential.findOneAndDelete({
      _id: credentialId,
      userId,
    });

    if (!deletedCredential) {
      return res.status(404).json({
        success: false,
        message: "Credential not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Credential deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting credential:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export {
  createCredential,
  getAllCredentials,
  getCredential,
  updateCredential,
  deleteCredential,
};
