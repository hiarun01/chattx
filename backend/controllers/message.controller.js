import Message from "../models/messages.model.js";

export const getMessages = async (req, res) => {
  try {
    const user1 = req.userId;
    const user2 = req.body.Id;

    if (!user1 || !user2) {
      return res.status(400).send("Both user Id's are required");
    }

    const messages = await Message.find({
      $or: [
        {sender: user1, recipient: user2},
        {sender: user2, recipient: user1},
      ],
    }).sort({timestamp: 1});

    return res.status(200).json({messages});
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};
