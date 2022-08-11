import React, {useState} from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

const AlbumForm = ({create}) => {
  const [album, setAlbum] = useState({ title: '', description: '' });

  const addNewAlbum = (e) => {
    e.preventDefault()
    create(album)
    setAlbum({ title: '', description: '' })
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