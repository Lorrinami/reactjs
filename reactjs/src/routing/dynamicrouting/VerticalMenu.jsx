import React from "react";
import "../styles/VerticalMenu.css";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "../../../node_modules/react-router-dom";

const VerticalMenu = ({ albums, albumPathname }) => (
  <div className="ui secondary vertical menu">
    <div className="header item">Albums</div>

    {albums.map(album => (
      <Link to={`${albumsPathname}/${album.id}`} key={album.id}>
       
        {({ onClick, href, isActive }) => (
          <a
            className={isActive ? "active item" : "item"}
            onClick={onClick}
            href={href}
          >
            {album.name}
          </a>
        )}
      </Link>
    ))}
  </div>
);
export default VerticalMenu;
