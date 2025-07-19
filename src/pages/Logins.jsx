import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logins() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/send-otp', { email });
      if (res.data.success) {
        localStorage.setItem('otpEmail', email);
        navigate('/verify'); // redirect to OTP page
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={sendOtp}>
        <h2 className="text-lg font-semibold mb-4">Login via Gmail</h2>
        <input
          type="email"
          placeholder="Enter your Gmail"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Send OTP
        </button>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </form>
    </div>
  );
}

export default Logins;
