import { Link } from 'react-router';

const SongList = (props) => {
    return (
        <main>
            <h1>Song Library</h1>
            {props.songs.map((song) => (
                <ul key={song._id}>
                    <li><Link to = {`/songs/${song._id}`}>
                    <p key={song._id}>{song.track}</p>
                    </Link></li>
                </ul>
            ))}
        </main>
    )
};

export default SongList;