import { Link } from 'react-router';


const PlaylistList = (props) => {
    return (
      <main className="playlist-list-container">
    <h1>Playlist Catalog</h1>
    {props.playlists.map((playlist) => (
        <div key={playlist._id} className="playlist-card">
            <div className="playlist-card-content">
                <Link to={`/playlists/${playlist._id}`}>
                    <h3 className="playlist-title">{playlist.playlist}</h3>
                    {playlist.description && <p className="playlist-description">{playlist.description}</p>}
                    <div className="playlist-stats">
                        {playlist.songs && <span className="playlist-stat">{playlist.songs.length} songs</span>}
                        {playlist.createdAt && <span className="playlist-stat">Created {new Date(playlist.createdAt).toLocaleDateString()}</span>}
                    </div>
                </Link>
            </div>
        </div>
    ))}
</main>
    );
};

export default PlaylistList;