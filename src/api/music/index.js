const AlbumHandler = require('./albumHandler');
const SongHandler = require('./songHandler');
const albumRoutes = require('./albumRoutes');
const songRoutes = require('./songRoutes');

module.exports = {
  name: 'music api',
  version: '1.0.0',
  register: async (server, { service }) => {
    const albumsHandler = new AlbumHandler(service);
    const songsHandler = new SongHandler(service);
    server.route(albumRoutes(albumsHandler));
    server.route(songRoutes(songsHandler));
  },
};
