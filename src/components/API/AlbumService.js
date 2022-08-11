import axios from "axios";

export default class AlbumService {
  static async getAll() {
    const response = await axios.get('https://my-json-server.typicode.com/katyi/mockjson/albums');
      return response;
  }

  static async getById(id) {
    const response = await axios.get('https://my-json-server.typicode.com/katyi/mockjson/albums/' + id)
      return response;
  }

  static async getPhotosByAlbumId(id) {
    const response = await axios.get(`https://my-json-server.typicode.com/katyi/mockjson/albums/${id}/photos`)
      return response;
  }
}