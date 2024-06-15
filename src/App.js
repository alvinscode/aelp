import React, { useState, useEffect } from 'react';
import Login from './Login';
import MapView from './MapView';
import './App.css';

function App() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const openLoginBox = () => setIsLoginOpen(true);
    const closeLoginBox = () => setIsLoginOpen(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <div className='App'>
            {isLoggedIn ? (
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            ) : (
                <button className="login-button" onClick={openLoginBox}>Login</button>
            )}
            {isLoginOpen && <Login closeLoginBox={closeLoginBox} setIsLoggedIn={setIsLoggedIn} />}
            <MapView />
        </div>
    );
}

export default App;