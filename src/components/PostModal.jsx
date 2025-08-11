// src/components/PostModal.jsx
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://react-social-app-backend-agyw.onrender.com";

export default function PostModal({
  isOpen,
  onClose,
  post,
  onPrev,
  onNext,
  onToggleLike,
  onToggleSave,
  liked = false,
  saved = false,
}) {
  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      const k = e.key.toLowerCase();
      if (k === "escape") onClose?.();
      if (k === "arrowright") onNext?.();
      if (k === "arrowleft") onPrev?.();
      if (k === "l") onToggleLike?.();
      if (k === "s") onToggleSave?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose, onNext, onPrev, onToggleLike, onToggleSave]);

  if (!isOpen || !post) return null;

  const copyLink = async () => {
    try {
      const url = post?.img || window.location.href;
      await navigator.clipboard.writeText(url);
      alert("Link copied ✅");
    } catch {
      alert("Could not copy link");
    }
  };

  // Download via backend proxy to avoid CORS
  const downloadImage = () => {
    const url = `${API_BASE}/api/download?url=${encodeURIComponent(post.img)}`;
    // Open in a new tab; you can also do window.location.href = url;
    window.open(url, "_blank", "noopener");
  };

  return (
    <AnimatePresence>
      {isOpen && post && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Modal Card */}
          <motion.div
            className="relative w-full max-w-5xl bg-[#0d0d0f] text-white rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 16, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={post.img}
                alt="Post"
                className="w-full max-h-[70vh] object-cover select-none"
                loading="lazy"
                draggable={false}
              />

              {/* Prev / Next Controls */}
              <button
                onClick={onPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center"
                aria-label="Previous"
              >
                ←
              </button>
              <button
                onClick={onNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center"
                aria-label="Next"
              >
                →
              </button>

              {/* Close (Top-Right) */}
              <button
                onClick={onClose}
                className="absolute right-3 top-3 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Actions Bar */}
            <div className="p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={onToggleLike}
                  className={`px-3 py-2 rounded-lg border transition ${
                    liked
                      ? "border-pink-500 bg-pink-500/10"
                      : "border-white/10 hover:bg-white/5"
                  }`}
                >
                  {liked ? "♥ Liked" : "♡ Like"}{" "}
                  {typeof post.likes === "number" ? `(${post.likes})` : ""}
                </button>

                <button
                  onClick={onToggleSave}
                  className={`px-3 py-2 rounded-lg border transition ${
                    saved
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-white/10 hover:bg-white/5"
                  }`}
                >
                  {saved ? "✓ Saved" : "＋ Save"}
                </button>

                <button
                  onClick={copyLink}
                  className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition"
                >
                  Share
                </button>

                <button
                  onClick={downloadImage}
                  className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition"
                >
                  Download
                </button>
              </div>

              <div className="text-xs text-white/60">
                Shortcuts: ←/→ navigate · L like · S save · Esc close
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
