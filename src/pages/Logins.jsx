import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logins() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage('Please enter a valid email address');
      return;
    }

    try {
      setSending(true);
      const res = await axios.post(
        'https://react-social-app-backend-agyw.onrender.com/api/auth/send-otp',
        { email }
      );
      if (res.data.success) {
        localStorage.setItem('otpEmail', email);
        navigate('/verify');
      } else {
        setMessage(res.data.message || 'Something went wrong');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0f0f10] via-[#101018] to-[#0b0b0d] text-white">
      {/* floating gradient blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-fuchsia-500/30 to-cyan-500/30 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />

      {/* center card */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          {/* brand */}
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 shadow-lg shadow-purple-600/20">
              {/* mail icon */}
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M21.75 7.5v9a2.25 2.25 0 0 1-2.25 2.25h-15A2.25 2.25 0 0 1 2.25 16.5v-9A2.25 2.25 0 0 1 4.5 5.25h15A2.25 2.25 0 0 1 21.75 7.5Z" />
                <path d="M3 7.5l8.708 6.18a1.5 1.5 0 0 0 1.784 0L22.2 7.5" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-white/60 tracking-wide">Welcome to</p>
              <h1 className="text-2xl font-semibold tracking-tight">Social App</h1>
            </div>
          </div>

          {/* heading */}
          <h2 className="mb-2 text-xl font-medium">Login with Email</h2>
          <p className="mb-6 text-sm text-white/60">
            Enter your email, and we’ll send you a one-time code to continue.
          </p>

          {/* form */}
          <form onSubmit={sendOtp} className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm text-white/70">Email address</span>
              <div className="relative">
                <input
                  type="email"
                  placeholder="you@gmail.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40 transition focus:border-fuchsia-500/50 focus:ring-2 focus:ring-fuchsia-500/30"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {/* right icon */}
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg
                    className="h-5 w-5 text-white/40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M21.75 7.5v9a2.25 2.25 0 0 1-2.25 2.25h-15A2.25 2.25 0 0 1 2.25 16.5v-9A2.25 2.25 0 0 1 4.5 5.25h15A2.25 2.25 0 0 1 21.75 7.5Z" />
                    <path d="M3 7.5l8.708 6.18a1.5 1.5 0 0 0 1.784 0L22.2 7.5" />
                  </svg>
                </div>
              </div>
            </label>

            {message && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 px-4 py-3 text-center text-base font-semibold shadow-lg shadow-fuchsia-600/20 transition hover:scale-[1.01] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {sending ? (
                  <>
                    <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                      <path className="opacity-90" d="M4 12a8 8 0 0 1 8-8" stroke="white" strokeWidth="4" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    Send OTP
                    <svg
                      className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M5 12h14" />
                      <path d="M13 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </span>
              {/* sheen */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition group-hover:translate-x-0" />
            </button>

            <p className="pt-2 text-center text-xs text-white/50">
              By continuing, you agree to our Terms & Privacy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Logins;
