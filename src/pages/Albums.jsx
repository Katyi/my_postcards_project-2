import React, { useEffect, useState } from "react";
import MyModal from "../components/UI/MyModal/MyModal";
import AlbumForm from "../components/AlbumForm";
import AlbumList from "../components/AlbumList";
import '../styles/App.css';
import MyButton from "../components/UI/button/MyButton";
import AlbumService from "../components/API/AlbumService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from '../utils/pages';
import Pagination from "../components/UI/pagination/Pagination";

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  let [total, setTotal] = useState(13);
  
  
  const [fetchAlbums, isAlbumsLoading, albumError] = useFetching(async (limit, page) => {
    const response = await AlbumService.getAll(limit, page);
    setAlbums(response.data)
    let totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  })
  
  useEffect(() => {
    fetchAlbums(limit, page)
  }, [])

  const createAlbum = async (album) => {
    const newAlbum = {
      ...album, id: total + 1
    }
    setAlbums([...albums, newAlbum])
    setTotal(total + 1)
    setModal(false)
  }
  
  const removeAlbum = (album) => {
    setAlbums(albums.filter(a => a.id !== album.id))
  }

  const changePage = (page) => {
    setPage(page)
    fetchAlbums(limit, page)
    console.log(albums);
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
        <h1>Произошла ошибка ${albumError}</h1>

      }
      {isAlbumsLoading
        ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 250 }}><Loader /></div>
        : <AlbumList remove={removeAlbum} albums={albums} title="Albums of postcards"/>
      }
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Albums;