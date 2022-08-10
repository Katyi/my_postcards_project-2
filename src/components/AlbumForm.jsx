import React, {useState} from "react";
// import Albums from "../pages/Albums";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import AlbumService from "./API/AlbumService";



const AlbumForm = ({ create }) => {
  const [album, setAlbum] = useState({ title: '', description: '' });

  const addNewAlbum = async (e) => {
    e.preventDefault()
    
    const newAlbum = {
      ...album, id: Date.now()
    }
    create(newAlbum)
    setAlbum({title: '', description: ''})
  }

  return (
    <form>
        <MyInput
          value={album.title}
          onChange={e=> setAlbum({...album, title: e.target.value})}
          type={"text"}
          placeholder={"Album name"}
      />
        <MyInput
          value={album.description}
          onChange={e => setAlbum({...album, description: e.target.value})}
          type={"text"}
          placeholder={"Album description"}
        />
        <MyButton onClick={addNewAlbum}>Create Album</MyButton>
    </form>
  );
};

export default AlbumForm;