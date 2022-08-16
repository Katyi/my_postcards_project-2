export default class AlbumService {
  static async getAll(limit = 5, page = 1) {
    const response = await fetch(`/albums/?_sort=id&order=desc`,{
      params: {
        _limit: limit,
        _page: page
        }
      }
    );
    const data = await response.json();
      return data;
  }

  static async getById(id) {
    const response = await fetch(`/albums/${id}`);
    const data = await response.json();
      return data;
  }

  static async getPhotosByAlbumId(id) {
    const response = await fetch(`/albums/${id}/photos/`);
    const data = await response.json();
      return data;
  }
}