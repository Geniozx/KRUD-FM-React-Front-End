import { Link } from 'react-router';

const SongList = (props) => {
    return (
        <main>
            <h1>Song Library</h1>
            {props.songs.map((song) => (
                <ul>
                    <li><Link key={song._id} to = {`/songs/${song._id}`}>{song.track}</Link></li>
                </ul>
            ))}
        </main>
    )
};

export default SongList;