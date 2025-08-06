import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const email = localStorage.getItem('otpEmail'); // email saved earlier

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('https://react-social-app-backend-agyw.onrender.com/api/auth/verify-otp', {
        email,
        otp,
      });

      if (res.data.success) {
        localStorage.setItem('user', JSON.stringify(res.data.user)); // simulate login
        navigate('/home'); // you'll create this page next
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Invalid OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleVerify}>
        <h2 className="text-lg font-semibold mb-4">Enter OTP</h2>
        <input
          type="text"
          placeholder="6-digit OTP"
          className="w-full p-2 border rounded mb-3"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Verify OTP
        </button>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </form>
    </div>
  );
}

export default VerifyOtp;
