import React, { Component } from "react";
import Album from "./Album";
import { client } from "../Client";
import VerticalMenu from "./VerticalMenu";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "../../../node_modules/react-router-dom";
const ALBUM_IDS = [
  "23O4F21GDWiGd33tFN3ZgI",
  "3AQgdwMNCiN7awXch5fAaG",
  "1kmyirVya5fRxdjsPFDM05",
  "6ymZBbRSmzAvoSGmwAFoxm",
  "4Mw9Gcu1LT7JaipXdwrq1Q"
];

class AlbumsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false,
      albums: []
    };
    this.getAlbums = this.getAlbums.bind(this);
  }
  //反应会自动地将方法绑定到它的标准API中，这就是为什么我们不需要这样做为像渲染这样的方法执行任何绑定
  componentDidMount() {
    this.getAlbums();
  }

  getAlbums() {
    client.setToken("D6W69PRgCoDKgHZGJmRUNA");
    client.getAlbums(ALBUM_IDS).then(albums =>
      this.setState({
        fetched: true,
        albums: albums
      })
    );
  }

  render() {
    if (!this.state.fetched) {
      return <div className="ui active centerd inline loader">正在加载</div>;
    } else {
      return (
        <div>
          <div className="ui six wide column" style={{ maxWidth: 250 }}>
            {/* VerticalMenu will go here */}
            <VerticalMenu albums={this.state.albums} />
          </div>
          <div className="ui ten wide column">
            <Route
              path={this.props.pathname+"/:albumId"}
              render={({ params }) => {
                const album = this.state.albums.find(
                  a => a.id === params.albumId
                );
                return (
                    <Album
                      album={album}
                      albumsPathname={this.props.pathname}
                    />
                );
              }}
            />
          </div>
        </div>
      );
    }
  }
}
