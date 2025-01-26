const socketIo = require('socket.io');
const Message = require('./models/Message');

module.exports = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('sendMessage', async (data) => {
            const { sender, message } = data;
            const newMessage = new Message({ sender, message });
            await newMessage.save();
            io.emit('receiveMessage', newMessage);
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    return io;
};