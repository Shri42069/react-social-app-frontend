import { Routes, Route } from 'react-router-dom';
import VerifyOtp from './pages/VerifyOtp';
import Logins from './pages/Logins'
import Home from './pages/Home'
import Feed from './pages/Feed';
import Explore from './pages/Explore';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Logins />} />
      <Route path="/verify" element={<VerifyOtp />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/explore" element={<Explore />} />
    </Routes>
  );
}

export default App;
