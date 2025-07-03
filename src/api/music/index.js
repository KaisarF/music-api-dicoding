const AlbumHandler = require('./albumHandler');
const SongHandler = require('./songHandler');

const albumRoutes = require('./albumRoutes');
const songRoutes = require('./songRoutes');

module.exports = {
  name: 'musicApi',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const { albumServices, songServices } = service;
    const { AlbumsValidator, SongsValidator } = validator;

    const albumsHandler = new AlbumHandler(albumServices, AlbumsValidator);
    const songsHandler = new SongHandler(songServices, SongsValidator);

    server.route(albumRoutes(albumsHandler));
    server.route(songRoutes(songsHandler));
  },
};
