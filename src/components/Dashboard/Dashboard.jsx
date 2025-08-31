import { useEffect, useContext, useState } from 'react';

import { UserContext } from '../../contexts/UserContext';

import * as userService from '../../services/userService';


const Dashboard = () => {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await userService.index();
                setUsers(fetchedUsers);
            } catch (err) {
                console.log(err)
            }
        }
        if (user) fetchUsers();
    }, [user]);

    return (
       <main className="dj-dashboard-container">
        <div className="dj-cards-grid">
        <div className="welcome-header-card">
            <h1>Welcome, {user.username}</h1>
            <p>
                Meet the amazing DJs of KRUD-FM Radio Station
            </p>
        </div>
        {users.map((dj) => (
            <div key={dj._id} className="dj-card">
                <div className="dj-card-content">
                    {dj.logo && (<img src={dj.logo} alt={`${dj.username} logo`} className="dj-logo" />)}
                    {dj.username && <h3 className="dj-name">{dj.username}</h3> }
                    {dj.callSign && <p className="dj-call-sign">"{dj.callSign}"</p> }
                    {dj.bio && <p className="dj-bio">{dj.bio}</p>}
                    {dj.broadcastLocation && <p className="dj-location">📍 {dj.broadcastLocation}</p>}
                </div>
            </div>
        ))}
    </div>
</main>
    );
};

export default Dashboard;

