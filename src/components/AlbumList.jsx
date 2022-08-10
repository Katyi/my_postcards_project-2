import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import AlbumItem from "./AlbumItem";

const AlbumList = ({ albums, title, remove }) => {
  if (!albums.length) {
    return (
      <h1 style={{textAlign: 'center'}}>
        Альбомы открыток не найдены!
      </h1>
    )
  }
     
  return (
    <div>
      <div className="pageTitle">
        {title}
        </div>
      <TransitionGroup>
        {albums.map((album, index) =>
          <CSSTransition
            key={album.id}
            timeout={500}
            classNames="album"
          >
            <AlbumItem remove={remove} number={index + 1} album={album}/>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default AlbumList;