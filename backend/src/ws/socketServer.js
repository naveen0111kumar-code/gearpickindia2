export const bindSockets = (io) => {
  io.on('connection', (socket) => {
    socket.emit('system', { message: 'Connected to AI Marketing OS realtime gateway' });
  });
};
