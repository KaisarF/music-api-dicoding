/* eslint-disable no-underscore-dangle */

const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class AlbumsService {
  constructor() {
    this._albums = [];
  }

  addAlbum({ name, year }) {
    const id = `album_${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newAlbum = {
      name, year, id, createdAt, updatedAt,
    };

    this._albums.push(newAlbum);

    const isSuccess = this._albums.filter((album) => album.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Album gagal ditambahkan');
    }
  }

  getAlbums() {
    return this._albums;
  }

  getAlbumById(id) {
    const albumId = this._albums.find((album) => album.id === id);

    if (!albumId) {
      throw new NotFoundError(`catatan dengan id ${id} tidak ditemukan`);
    }

    return albumId;
  }

  editAlbumById(id, { name, year }) {
    const index = this._albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this._albums[index] = {
      ...this._albums[index],
      name,
      year,
      updatedAt,
    };
  }

  deleteAlbumById(id) {
    const index = this._albums.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
    }
    this._albums.splice(index, 1);
  }
}

module.exports = AlbumsService;
