import { Link } from 'react-router';

const SongList = (props) => {
    return (
        <main>
            <h1>Song Library</h1>
            {props.songs.map((song) => (
                <div key={song._id}>
                    <span>{song.track} - {song.artist}</span>
                    <button onClick={() => props.handleAddSongToPlaylist(props.playlistId, song._id)}>
                        Add
                    </button>
                </div>
            ))}
        </main>
    )
};

export default SongList;