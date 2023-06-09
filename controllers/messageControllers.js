const User = require('../models/User');
const Message = require('../models/message');

// Get all messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json({ messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get messages' });
  }
};

//new Message
const newmessages = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newMessage = new Message({
      sender: sender._id,
      receiver: receiver._id,
      content,
    });

    await newMessage.save();

    // Update sender's sentMessages array
    //Write a code here to push(store) newMessage_id into sentMessage of User (refer to User.js Model)
    //After pushing newMessage_id into User, save it to a database using save() e.g: await sender.save
    /*
//
*/
    // Update receiver's receivedMessages array
    //Write a code here to push(store) newMessage_id into receivedMessage of User (refer to User.js Model)
    //After pushing newMessage_id into User, save it to a database using save() e.g: await receiver.save
    /*
//
*/
    //If successful than the status code will be 201 with message 'Message sent successfully'
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

//Update a message
const updateMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    console.log(messageId);

    const { content } = req.body;

    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { content },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json({ message: 'Message updated successfully', updatedMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update message' });
  }
};

// Delete a message
const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;

    const deletedMessage = await Message.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete message' });
  }
};

module.exports = {
  newmessages,
  updateMessage,
  getAllMessages,
  deleteMessage,
};
