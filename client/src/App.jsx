import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Destination from './pages/Destination';
import AuthPage from './pages/Auth';
import { useState,useEffect } from 'react';
import './App.css';
import Category from './pages/Category';
import Profile from './pages/Profile';

function App() {
  // const [authView, setAuthView] = useState(null);
  const [token, setToken] = useState(null);
  
      useEffect(() => {
          const checkToken = () => {
            const token = localStorage.getItem('jwt');
            setToken(token);
          };
        
          // Initial check
          checkToken();
        
          // Re-check when localStorage changes (e.g., login/logout)
          window.addEventListener('storage', checkToken);
        
          return () => {
            window.removeEventListener('storage', checkToken);
          };
        }, []);
        const [authView, setAuthView] = useState(null);
  return (
    
    <>
    <Navbar setAuthView={setAuthView} token={token} setToken={setToken} />
    <Routes>
      <Route path="/"  element={<Home authView={authView}/>} />
      <Route path="/login" element={<AuthPage setToken={setToken} />} />
      <Route path="/signup" element={<AuthPage />} />
      <Route path="/destinations" element={<Destination />} />
      <Route path="/categories" element={<Category />} />
      <Route path="/profile" element={<Profile />}/>
    </Routes>
  </>
    
  );
}
export default App