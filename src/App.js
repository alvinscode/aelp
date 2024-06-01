import React, { useState } from 'react';
import Login from './Login';
import MapView from './MapView'

function App() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const openLoginBox = () => setIsLoginOpen(true);
    const closeLoginBox = () => setIsLoginOpen(false);

    return (
      <div className='App'>
        <button onClick={openLoginBox}>Login</button>
        {isLoginOpen && <Login closeLoginBox={closeLoginBox} />}
        <MapView />
      </div>
    )
}

export default App;
