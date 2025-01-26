const Message = require('../models/Message');

// إرسال رسالة
exports.sendMessage = async (req, res) => {
    try {
        const { sender, message } = req.body;
        const newMessage = new Message({ sender, message });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Error sending message' });
    }
};

// استقبال الرسائل
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching messages' });
    }
};