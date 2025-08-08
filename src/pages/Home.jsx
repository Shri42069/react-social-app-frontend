import FutureBG from "../components/FutureBG";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const nameOrEmail = user?.name || user?.email || "Explorer";
  const firstName = nameOrEmail.split(" ")[0];

  return (
    <div className="relative min-h-screen text-white flex items-center justify-center px-6 overflow-hidden">
      {/* Futuristic background */}
      <FutureBG />

      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-xl"
      >
        <h1 className="text-3xl font-semibold">Welcome back,</h1>
        <h2 className="mt-1 text-xl font-light">{firstName} 🚀</h2>

        <Link
          to="/explore"
          className="inline-block mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-lg font-semibold hover:scale-105 transition-transform"
        >
          Enter Explore
        </Link>
      </motion.div>
    </div>
  );
}

export default Home;
