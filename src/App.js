import './App.css';
import React, { useEffect } from 'react';

//modal
import SignupModal from './modal/SignupModal';
//pages
import Home from './pages/Home';

function App() {
  return (
    <div className="bg-insta-back min-h-screen">
      <Home />
    </div>
  );
}

export default App;
