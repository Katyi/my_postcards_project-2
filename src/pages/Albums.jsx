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
  const [modal, setModal] = useState(false);
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
    const lastPage = Math.ceil((albums.length + 1) / limit);
    const newAlbum = {
      ...album, id: albums.length + 1
    }
    setAlbums([...albums, newAlbum])
    setModal(false)
    changePage(lastPage)
  }
  
  const removeAlbum = (album) => {
    setAlbums(albums.filter(a => a.id !== album.id))
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
      <AlbumForm create={createAlbum} />
      </MyModal>
      
      {albumError &&
        <div className="aboutPage">An error has occurred ${albumError}</div>
      }
      {isAlbumsLoading
        ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 250 }}><Loader /></div>
        : <AlbumList remove={removeAlbum} albums={currentAlbums} title="Albums of postcards"/>
      }
      <Pagination limit={limit} totalAlbums={albums.length} paginate={changePage} page={page} />
    </div>
  );
}

export default Albums;