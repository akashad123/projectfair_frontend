import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Project from './pages/Project';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import Authentication from './components/Authentication';
import { useContext } from 'react';
import { isAuthTokenContext } from './context/ContextShare';

function App() {

  const {isAuthToken, setIsAuthToken} = useContext(isAuthTokenContext)

  return (
    <div>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Authentication/>}/>
        <Route path='/register' element={<Authentication register/>}/>
        <Route path='/dashboard' element={isAuthToken?<Dashboard dashboard/>:<Home/>}/>
        <Route path='/project' element={<Project/>}/>
      </Routes>

      <Footer/>

    </div>
  );
}

export default App;
