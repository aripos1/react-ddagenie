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
<<<<<<< HEAD


          <Route path='/admin/musicadmin' element={<MusicAdmin />} />

=======
          <Route path='/login' element={<LoginForm />} />
>>>>>>> c745de463f40f5603be7df70e046d72c501ba852
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
