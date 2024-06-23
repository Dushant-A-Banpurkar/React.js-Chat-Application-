import Conversation from "../models/conversation_model.js";
import Message from "../models/message_model.js";
import mongoose from "mongoose";
export const sendmsg = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverID } = req.params;
    const senderID = req.user._id;

    const senderObjectId = new mongoose.Types.ObjectId(senderID);
    const receiverObjectId = new mongoose.Types.ObjectId(receiverID);

    let conversation = await Conversation.findOne({
      particpant: { $all: [senderObjectId, receiverObjectId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        particpant: [senderObjectId, receiverObjectId],
      });
    }

    const newMessage = new Message({
      senderID: senderObjectId,
      receiverID: receiverObjectId,
      message,
    });

    await Promise.all([await conversation.save(), await newMessage.save()]);
    conversation.message.push(newMessage._id);
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in sendmsg controller: ", error);
    res.status(500).json({ error: "Internal server error!!!" });
  }
};

export const getmsg = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderID = req.user._id;

    const senderObjectId = new mongoose.Types.ObjectId(senderID);
    const receiverObjectId = new mongoose.Types.ObjectId(userToChatId);

    let conversation = await Conversation.findOne({
      particpant: { $all: [senderObjectId, receiverObjectId] },
    }).populate("message");

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    res.status(200).json(conversation.message);
  } catch (error) {
    console.log("error in getmsg controller: ", error);
    res.status(500).json({ error: "Internal server error!!!" });
  }
};
