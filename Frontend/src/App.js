import React from 'react';
import Myrouter from './router/index.js';
// import Home from './pages/Home.js';
import Navbar from './component/Navbar.js';

function App() {
  return (
    <div>
      <Navbar />
      <Myrouter />
    </div>
  );
}

export default App;
