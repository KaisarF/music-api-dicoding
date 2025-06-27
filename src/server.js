const Hapi = require('@hapi/hapi');
const musicApiPlugin = require('./api/music');

const AlbumService = require('./services/inMemory/AlbumServices');
const SongService = require('./services/inMemory/SongServices');

const AlbumsValidator = require('./validator/music/albumValidator')
const SongsValidator = require('./validator/music/songValidator');

const init = async () => {
  const albumServices = new AlbumService();
  const songServices = new SongService();

  const server = Hapi.server({

    port: 3000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: musicApiPlugin,
    options: {
      service: {
        albumServices,
        songServices,
      },
      validator: {
        AlbumsValidator,
        SongsValidator,
      },
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
