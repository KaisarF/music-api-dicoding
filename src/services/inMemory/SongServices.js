/* eslint-disable no-underscore-dangle */

const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongsService {
  constructor() {
    this._songs = [];
  }

  addSong({
    title, year, genre, performer, duration, albumId,
  }) {
    const id = `song_${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newSong = {
      id, title, year, genre, performer, duration, albumId, createdAt, updatedAt,
    };

    this._songs.push(newSong);

    const isSuccess = this._songs.filter((song) => song.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Song gagal ditambahkan');
    }
  }

  getSongs() {
    return this._songs;
  }

  getSongById(id) {
    const songId = this._songs.filter((song) => song.id === id);

    if (!songId) {
      throw new NotFoundError(`Song dengan id ${id} tidak ditemukan`);
    }

    return songId;
  }

  editSongById(id, {
    title, year, genre, performer, duration, album,
  }) {
    const index = this._songs.findIndex((song) => song.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui song. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this._songs[index] = {
      ...this._songs[index],
      title,
      year,
      genre,
      performer,
      duration,
      album,
      updatedAt,
    };
  }

  deleteSongById(id) {
    const index = this._songs.findIndex((song) => song.id === id);
    if (index === -1) {
      throw new NotFoundError('Song gagal dihapus. Id tidak ditemukan');
    }
    this._songs.splice(index, 1);
  }
}

module.exports = SongsService;
