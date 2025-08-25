import { Link } from 'react-router';


const PlaylistList = (props) => {
    return ( 
    <main>
        {props.playlists.map((playlist) => (
            <Link key={playlist._id} to={`/playlists/${playlist._id}`}>
            <p key={playlist._id}>{playlist.playlist}</p>
            </Link>
        ))}
    </main>
    );
};

export default PlaylistList;