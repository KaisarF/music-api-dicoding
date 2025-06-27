/* eslint-disable no-underscore-dangle */

class SongHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this.postNoteHandler = this.postSongHandler.bind(this);
    this.getNotesHandler = this.getSongsHandler.bind(this);
    this.getNoteByIdHandler = this.getSongByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  postSongHandler(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);
      const {
        title, year, genre, performer, duration, albumId,
      } = request.payload;

      const songId = this._service.addSong({
        title, year, genre, performer, duration, albumId,
      });

      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan',
        data: {
          songId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(400);
      return response;
    }
  }

  getSongsHandler() {
    const songs = this._service.getSongs();
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  getSongByIdHandler(request, h) {
    const { id } = request.params;
    const song = this._service.getSongById(id);
    try {
      const response = h.response({
        status: 'success',
        data: {
          song,
        },
      });
      response.code(200);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  putSongByIdHandler(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);
      const { id } = request.params;
      this._service.editSongById(id, request.payload);
      const response = h.response({
        status: 'success',
        message: 'lagu berhasil ditambahkan',

      });
      response.code(200);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  deleteSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.deleteSongById(id);
      return {
        status: 'success',
        message: 'Lagu berhasil dihapus',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = SongHandler;
