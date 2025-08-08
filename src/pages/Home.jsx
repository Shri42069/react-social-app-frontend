import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hyperspeed from '../components/Hyperspeed'; // adjust path

function Home() {
  const user = JSON.parse(localStorage.getItem('user'));
  const nameOrEmail = user?.name || user?.email || "User";
  const firstName = nameOrEmail.split(' ')[0];

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex items-center justify-center px-6 overflow-hidden">
      {/* Hyperspeed background */}
      <Hyperspeed
        className="pointer-events-none absolute inset-0 -z-10"
        // If your component accepts props, tweak them here:
        // speed={1.0}
        // density={0.9}
        // color="#a855f7"
      />

      {/* content card */}
      <div className="bg-gray-800/80 rounded-2xl shadow-2xl p-10 max-w-2xl w-full text-center backdrop-blur-md border border-white/10">
        <div className="flex flex-col items-center justify-center">

          {user?.profilePic ? (
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              src={user.profilePic}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg mb-4"
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-28 h-28 rounded-full bg-gray-700 flex items-center justify-center mb-4 text-2xl font-bold"
            >
              {nameOrEmail.charAt(0)}
            </motion.div>
          )}

          <motion.h1
            className="text-3xl font-semibold mb-2"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Welcome back,
          </motion.h1>

          <motion.h2
            className="text-xl font-light mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {firstName} 👋
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link
              to="/explore"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-200"
            >
              🚀 Explore Feed
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;
