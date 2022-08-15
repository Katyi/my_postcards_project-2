import React from "react";
import { useNavigate } from 'react-router-dom';
import MyButton from "./UI/button/MyButton";

const AlbumItem = (props) => {
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
        <MyButton onClick={() => props.remove(props.album)}>
          Delete
        </MyButton>
        </div>
      </div>
  );
};

export default AlbumItem;