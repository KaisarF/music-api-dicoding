const Joi = require('joi');

const AlbumPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().integer().max(2100).required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number().integer().positive(),
  albumId: Joi.string().required(),
});

module.exports = { AlbumPayloadSchema };
