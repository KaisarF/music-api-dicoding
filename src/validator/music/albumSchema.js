const Joi = require('joi');

const AlbumPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().integer().max(2100).required(),
});

module.exports = { AlbumPayloadSchema };
