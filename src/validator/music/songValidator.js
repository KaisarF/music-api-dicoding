const { SongPayloadSchema } = require('./songSchema');
const InvariantError = require('../../exceptions/InvariantError');

const SongsValidator = {
  validateSongPayload: (payload) => {
    const SongValidationResult = SongPayloadSchema.validate(payload);

    if (SongValidationResult.error) {
      throw new InvariantError(SongValidationResult.error.message);
    }
  },
};

module.exports = SongsValidator;
