import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import MyButton from "./UI/button/MyButton";
import AlbumUpdForm from "./AlbumUpdForm";
import MyModal from "./UI/MyModal/MyModal";

const AlbumItem = (props) => {
  let [modal, setModal] = useState(false);

  let navigate = useNavigate();
  return (
      <div className="album">
        <div className="album__content">
        <strong> {props.album.id} {props.album.title}</strong>
          <div>
          {props.album.description}
          </div>
        </div>
      <div>
        <MyButton onClick={() => navigate(`/albums/${props.album.id}`)}>
          Open
        </MyButton>
        <MyButton onClick={() => setModal(true)}>
          UpDate
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
          <AlbumUpdForm upDate={props.upDate} album={props.album} />
        </MyModal>
        <MyButton onClick={() => props.remove(props.album)}>
          Delete
        </MyButton>
        </div>
    </div>
  );
};


export default AlbumItem;