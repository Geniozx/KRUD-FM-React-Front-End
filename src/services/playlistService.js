const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}playlists`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};
const show = async (playlistId) => {
    try {
        const res = await fetch(`${BASE_URL}/${playlistId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};
const create = async (playlistFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playlistFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

const update = async (playlistId, playlistFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${playlistId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playlistFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const deletePlaylist = async (playlistId) => {
    try {
        const res = await fetch(`${BASE_URL}/${playlistId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const postSongToPlaylist = async (playlistId, songId) => {
    // console.log('songId', songId, 'playlistId', playlistId);
    try {
        const res = await fetch(`${BASE_URL}/api/${playlistId}/${songId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({ songId }),
        });
        console.log('songId', songId, 'playlistId', playlistId);
        return res.json();
        // const updated = await res.json();
        // onSongAdded(updated.playlist);
    } catch (error) {
        console.log(error);
    };
};

const removeSongFromPlaylist = async (playlistId, songId) => {
    try {
        const res = await fetch(`${BASE_URL}/api/${playlistId}/${songId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
        });
        console.log('songId', songId, 'playlistId', playlistId);
        return res.json();
    } catch (error) {
        console.log(error);
    };
};



export {
    index,
    show,
    create,
    update,
    deletePlaylist,
    postSongToPlaylist,
    removeSongFromPlaylist,
};