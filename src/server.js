require('dotenv').config();

const Hapi = require('@hapi/hapi');
const musicApi = require('./api/music');
const users = require('./api/users');

const AlbumService = require('./services/postgres/AlbumServices');
const SongService = require('./services/postgres/SongServices');
const UserService = require('./services/postgres/UserServices');

const AlbumsValidator = require('./validator/music/albumValidator');
const SongsValidator = require('./validator/music/songValidator');
const UsersValidator = require('./validator/users');

const ClientError = require('./exceptions/ClientError');

const init = async () => {
  const albumServices = new AlbumService();
  const songServices = new SongService();
  const usersService = new UserService();
  const server = Hapi.server({

    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: musicApi,
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
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }
    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
