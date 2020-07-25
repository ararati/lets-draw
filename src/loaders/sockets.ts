import io from 'socket.io';
import config from "../config";

const socketsLoader = () => {
  const server = io.listen(config.get('socketPort'));

  // TODO: !!Test solution for sockets, add next functions
  // - Rooms for diff boards
  // - Separate events from logic
  // - Save the state of all connections
  server.on('connection', (socket) => {
    console.log(`Client connected [id=${socket.id}]`);

    socket.on('draw', (data:object) => {
      server.sockets.emit('user-draw', data);
    });
  });
};

export default socketsLoader;
