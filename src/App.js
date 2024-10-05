import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './pages/Test';
import MusicPlayer from './pages/music/MusicPlayer';
import MyMusic from './pages/music/MyMusic';

import Pay from './pages/user/Pay';

import LoginForm from './pages/user/LoginForm';
import JoinForm from './pages/user/JoinForm';
import JoinComplete from './pages/user/JoinResult';
import UserInfo from './pages/user/UserInfo';
import MusicAdmin from './pages/admin/MusicAdmin.jsx';
import MusicInsert from './pages/admin/MusicInsert.jsx';
import MusicUpdate from './pages/admin/MusicUpdate.jsx';
import Payment from './pages/user/Payment.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/test' element={<Test />} />
          <Route path='/music/musicplayer' element={<MusicPlayer />} />
          <Route path='/user/mymusic' element={<MyMusic />} />

          <Route path='/user/pay' element={<Pay />} />

          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<JoinForm />} />
          <Route path='/joinresult' element={<JoinComplete />} />
          <Route path='/user/info' element={<UserInfo />} />
          <Route path='/admin/musicadmin' element={<MusicAdmin />} />
          <Route path='/admin/musicinsert' element={<MusicInsert />} />
          <Route path='/admin/musicupdate' element={<MusicUpdate />} />
          <Route path='/user/payment' element={<Payment />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
