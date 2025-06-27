const { AlbumPayloadSchema } = require('./albumSchema');
const InvariantError = require('../../exceptions/InvariantError');

const AlbumsValidator = {
  validateAlbumPayload: (payload) => {
    const AlbumValidationResult = AlbumPayloadSchema.validate(payload);

    if (AlbumValidationResult.error) {
      throw new InvariantError(AlbumValidationResult.error.message);
    }
  },
};

module.exports = AlbumsValidator;
