const Album = ({ album, albumsPathname }) => (
  <div className="six wide column">
    <p>
      {`By ${album.artist.name}
        - ${album.year}
        - ${album.tracks.length} songs`}
    </p>
    <Link to={albumsPathname} className="ui left floated large button">
      Close
    </Link>
  </div>
);
