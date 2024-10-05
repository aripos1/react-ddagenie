import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './pages/Test';
import MusicPlayer from './pages/music/MusicPlayer';
import MyMusic from './pages/music/MyMusic';
import LoginForm from './pages/user/LoginForm';
import TestList from './pages/TestList';


import MusicAdmin from './pages/admin/MusicAdmin';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/test' element={<Test />} />
          <Route path='/testlist' element={<TestList />} />
          <Route path='/music/musicplayer' element={<MusicPlayer />} />
          <Route path='/user/mymusic' element={<MyMusic />} />


          <Route path='/admin/musicadmin' element={<MusicAdmin />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
