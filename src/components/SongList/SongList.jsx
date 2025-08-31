import { Link } from 'react-router';

const SongList = (props) => {
    return (
        <main className="song-list-container">
            <h1>Song Library</h1>
            {props.songs
            .slice()
            .sort((a, b) => a.track.localeCompare(b.track))
            .map((song) => (
                <div key={song._id} className="song-card">
                    <div className="song-card-content">
                    <Link to={`/songs/${song._id}`}>
                            <h3 className="song-title">{song.track}</h3>
                            <p className="song-artist">{song.artist}</p>
                            <p className="song-album">{song.album}</p>
                        </Link>

                        <button onClick={() => props.handleAddSongToPlaylist(props.playlistId, song._id)}>
                            Add
                        </button></div>
                </div>
            ))}
        </main>
    )
};

export default SongList;