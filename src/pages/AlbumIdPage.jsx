import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import AlbumService from '../components/API/AlbumService'
import Loader from '../components/UI/Loader/Loader'
import { useFetching } from '../hooks/useFetching'

export default function AlbumIdPage(id) {
  const params = useParams()
  const [album, setAlbum] = useState({});
  const [photos, setPhotos] = useState([]);
  const [fetchAlbumById, isLoading] = useFetching(async (id) => {
    const response = await AlbumService.getById(id)
    setAlbum(response);
  })

  const [fetchPhotos] = useFetching(async (id) => {
    const response = await AlbumService.getPhotosByAlbumId(id)
    setPhotos(response);
  })

  useEffect(() => {
    fetchAlbumById(params.id)
    fetchPhotos(params.id)
  },[])

  return (
    <div style={{ marginTop: 105}}>
      
      {isLoading
        ? <div style={{marginTop: 380}}>
          <Loader />
        </div>
        : <div>
          <div className='pageTitle'>You opened the album #{params.id} {album.title}</div>
          {photos.map(photo =>
            <div key={photo.id} style={{marginTop: 15, display: 'inline-flex', padding: 20}}>
              <img alt="Images" style={{width: 550}} src={photo.url} />
            </div>    
          )}
        </div>
      }
    </div>
  )
}
