import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Destination from './pages/Destination';
import AuthPage from './pages/Auth';
import { useState,useEffect } from 'react';
import './App.css';
import Category from './pages/Category';
import Profile from './pages/Profile';

import PublicDestinationPage from './pages/PublicDestination';
import Saved from './pages/Saved';

function App() {
  
  const [token, setToken] = useState(null);
  
      useEffect(() => {
          const checkToken = () => {
            const token = localStorage.getItem('jwt');
            setToken(token);
          };
        
          
          checkToken();
        
         
          window.addEventListener('storage', checkToken);
        
          return () => {
            window.removeEventListener('storage', checkToken);
          };
        }, []);
        const [authView, setAuthView] = useState(null);
  return (
    
    <>
    
      
        <Navbar setAuthView={setAuthView} token={token} setToken={setToken} />
          <Routes >
             <Route path="/"  element={<Home authView={authView}/>} />
             <Route path="/login" element={<AuthPage setToken={setToken} />} />
             <Route path="/signup" element={<AuthPage />} />
             <Route path="/destinations" element={<Destination />} />
             <Route path="/categories" element={<Category />} />
             <Route path="/profile" element={<Profile />}/>
             <Route path="/all" element={<PublicDestinationPage />}/>
             <Route path="/saved" element={<Saved />}/>
           </Routes>
       
    
  </>
    
  );
}
export default App