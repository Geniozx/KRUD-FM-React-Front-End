import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

import * as playlistService from '../../services/playlistService';


const PlaylistDetails = () => {
    const { playlistId } = useParams();
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {

        const fetchPlaylist = async () => {
            const playlistData = await playlistService.show(playlistId);
            setPlaylist(playlistData);
        };
        fetchPlaylist();
    
    }, [playlistId]);
    console.log('playlistId', playlistId);
    if (!playlist) return <main>Loading........</main>;
    return(
          <main>
      <section>
        <header>
          <h1>{playlist.playlist}</h1>
          <p>
            {playlist.author.username}
          </p>
         {/* add addtl details related to model here, like genre */}
        </header>
      </section>
    </main>
    )
};




export default PlaylistDetails;