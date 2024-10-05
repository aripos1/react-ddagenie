import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './pages/Test';
import MusicPlayer from './pages/music/MusicPlayer';
import MyMusic from './pages/music/MyMusic';
<<<<<<< HEAD
import Pay from './pages/user/Pay';
=======
import LoginForm from './pages/user/LoginForm';
import JoinForm from './pages/user/JoinForm';
import JoinComplete from './pages/user/JoinResult';
import UserInfo from './pages/user/UserInfo';
import MusicAdmin from './pages/admin/MusicAdmin.jsx';
import MusicInsert from './pages/admin/MusicInsert.jsx';
import MusicUpdate from './pages/admin/MusicUpdate.jsx';
>>>>>>> f5b8667273c60c630e1d1d9eb19c3eb2663674e2

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/test' element={<Test />} />
          <Route path='/music/musicplayer' element={<MusicPlayer />} />
          <Route path='/user/mymusic' element={<MyMusic />} />
<<<<<<< HEAD
          <Route path='/user/pay' element={<Pay />} />
=======
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<JoinForm />} />
          <Route path='/joinresult' element={<JoinComplete />} />
          <Route path='/user/info' element={<UserInfo />} />
          <Route path='/admin/musicadmin' element={<MusicAdmin />} />
          <Route path='/admin/musicinsert' element={<MusicInsert />} />
          <Route path='/admin/musicupdate' element={<MusicUpdate />} />
>>>>>>> f5b8667273c60c630e1d1d9eb19c3eb2663674e2
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
