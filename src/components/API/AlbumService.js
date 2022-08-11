import axios from "axios";

export default class AlbumService {
  static async getAll(limit = 5, page = 1) {
    const response = await axios.get('https://my-json-server.typicode.com/katyi/mockjson/albums',
      {params: {
          _limit: limit,
          _page: page,
        }
      })
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