
import { Link } from 'react-router';

const Landing = () => {
    return (
        <main className="landing-container">
            <div className="landing-content">
                <h1> Welcome to KRUD-FM</h1>
                <p>Your ultimate radio station experience! Join our community of DJs to create amazing playlists and connect with fellow artists.</p>
                <div className="landing-buttons">
                    <Link to="/sign-up" className="landing-button">
                        Get Started
                    </Link>
                    <Link to="/sign-in" className="landing-button secondary">
                        Sign In
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Landing;

