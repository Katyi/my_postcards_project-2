import React, { useEffect, useState } from "react";
import MyModal from "../components/UI/MyModal/MyModal";
import AlbumForm from "../components/AlbumForm";
import AlbumList from "../components/AlbumList";
import '../styles/App.css';
import MyButton from "../components/UI/button/MyButton";
import AlbumService from "../components/API/AlbumService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import Pagination from "../components/UI/pagination/Pagination";

function Albums() {
  const [albums, setAlbums] = useState([]);
  let [modal, setModal] = useState(false);
  const [limit] = useState(5);
  const [page, setPage] = useState(1);

  const indexOfLastAlbum = page * limit;
  const indexOfFirstAlbum = indexOfLastAlbum - limit;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  const [fetchAlbums, isAlbumsLoading, albumError] = useFetching(async () => {
    const response = await AlbumService.getAll();
    setAlbums(response);
  })

  useEffect(() => {
    fetchAlbums()
  }, [])
  
  const createAlbum = async (album) => {
    const response = await fetch('https://my-postcards-api.herokuapp.com/albums', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(album)
    })
    const lastPage = Math.ceil((albums.length + 1) / limit);
    const data = await response.json()
    setAlbums([...albums, data])
    setModal(false)
    changePage(lastPage)
  }
  
  const removeAlbum = async (album) => {
    // if (window.confirm('Are you sure you want to delete?')) {
    await fetch(`https://my-postcards-api.herokuapp.com/albums/${album.id}`, { method: 'DELETE' })
    setAlbums(albums.filter((item) => item.id !== album.id))
    // }
    const lastPage = Math.ceil((albums.length - 1) / limit);
    changePage(lastPage)
  }

  const updateAlbum = async (album, UpdItem) => {
    const response = await fetch(`https://my-postcards-api.herokuapp.com/albums/${album.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(UpdItem)
    })
    const data = await response.json()
    setAlbums(
      albums.map((item) => (item.id === album.id ? {
        ...item, ...
          data } : item))
    )
    setModal(false)
  }

  const changePage = (pageNumber) => {
    setPage(pageNumber);
  }
  
  return (
    <div className="App">
      <MyButton style={{marginTop: 130}} onClick={() => setModal(true)}>
        Create an album of postcards
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
      <AlbumForm create={createAlbum} ind='1'/>
      </MyModal>
      
      {albumError &&
        <div className="aboutPage">An error has occurred ${albumError}</div>
      }
      {isAlbumsLoading
        ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 250 }}><Loader /></div>
        : <AlbumList remove={removeAlbum} upDate={updateAlbum} albums={currentAlbums} title="Albums of postcards"/>
      }
      <Pagination limit={limit} totalAlbums={albums.length} paginate={changePage} page={page} />
    </div>
  );
}

export default Albums;