import React, {useState} from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

const AlbumUpdForm = ({ upDate , album} ) => {
  const [UpdItem, setUpdItem] = useState({ title: '', description: '' });

  const updAlbum = (e) => {
    e.preventDefault()
    upDate(album, UpdItem)
    setUpdItem({ title: '', description: '' })
    
  }

  return (
    <form>
      <MyInput
        value={UpdItem.title}
        onChange={e => setUpdItem({...UpdItem, title: e.target.value})}
        type={"text"}
        placeholder={"Album name"}
      />
      <MyInput
        value={UpdItem.description}
        onChange={e => setUpdItem({ ...UpdItem, description: e.target.value })}
        type={"text"}
        placeholder={"Album description"}
      />
      <MyButton onClick={updAlbum}>Update Album</MyButton>
    </form>
  );
};

export default AlbumUpdForm;