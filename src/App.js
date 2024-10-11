import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './pages/Test';
import MusicPlayer from './pages/music/MusicPlayer';
import MyMusic from './pages/music/MyMusic';
import Index from './pages/main/Index.jsx';
import MusicList from './pages/main/List.jsx';
import Pay from './pages/user/Pay';

import LoginForm from './pages/user/LoginForm';
import JoinForm from './pages/user/JoinForm';
import JoinComplete from './pages/user/JoinResult';
import UserInfo from './pages/user/UserInfo';
import MusicAdmin from './pages/admin/MusicAdmin.jsx';
import MusicInsert from './pages/admin/MusicInsert.jsx';
import MusicUpdate from './pages/admin/MusicUpdate.jsx';
import Payment from './pages/user/Payment.jsx';
import Utilize from './pages/user/Utilize.jsx';
import JdeleteForm from './pages/user/JdeleteForm.jsx';
import AdminPayment from './pages/admin/AdminPayment.jsx';
import Detail from './pages/main/Detail.jsx';
import ArtistInsert from './pages/admin/ArtistInsert.jsx';
import Introduce from './pages/main/Introduce.jsx';
import Rule from './pages/main/Rule.jsx';




function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/test' element={<Test />} />
          <Route path='/' element={<Index />} />
          <Route path='/musiclist' element={<MusicList />} />
          <Route path='/music/musicplayer' element={<MusicPlayer />} />
          <Route path='/user/mymusic' element={<MyMusic />} />
          <Route path='/user/pay/:no' element={<Pay />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<JoinForm />} />
          <Route path='/joinok' element={<JoinComplete />} />
          <Route path='/user/info' element={<UserInfo />} />
          <Route path='/admin/musicadmin' element={<MusicAdmin />} />
          <Route path='/admin/musicinsert' element={<MusicInsert />} />
          <Route path='/admin/artistinsert' element={<ArtistInsert />} />
          <Route path='/admin/musicupdate/:no' element={<MusicUpdate />} />
          <Route path='/user/payment' element={<Payment />} />
          <Route path='/user/Utilize' element={<Utilize />} />
          <Route path='/user/deleteForm/:userNo' element={<JdeleteForm />} />
          <Route path='/admin/adminPayment' element={<AdminPayment />} />
          <Route path='/main/detail/:no' element={<Detail/>}/>
          <Route path='/main/welcome' element={<Introduce/>}/>
          <Route path='/main/rule' element={<Rule/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
