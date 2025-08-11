import { useEffect, useMemo, useRef, useState } from "react";
import Masonry from "../components/Masonry";
import PostModal from "../components/PostModal";
import { generatePosts } from "../data";

function Explore() {
  const [posts, setPosts] = useState(() =>
    generatePosts().map(p => ({
      ...p,
      likes: Math.floor(Math.random() * 500) + 10,
    }))
  );
  const [onlySaved, setOnlySaved] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);
  const [liked, setLiked] = useState(() => new Set(JSON.parse(localStorage.getItem("liked") || "[]")));
  const [saved, setSaved] = useState(() => new Set(JSON.parse(localStorage.getItem("saved") || "[]")));
  const [appending, setAppending] = useState(false);
  const loader = useRef(null);
  const topRef = useRef(null);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          setAppending(true);
          setTimeout(() => {
            setPosts(prev => [
              ...prev,
              ...generatePosts().map(p => ({
                ...p,
                likes: Math.floor(Math.random() * 500) + 10,
              })),
            ]);
            setAppending(false);
          }, 800);
        }
      },
      { threshold: 1 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => loader.current && observer.unobserve(loader.current);
  }, []);

  // Persist liked/saved
  useEffect(() => {
    localStorage.setItem("liked", JSON.stringify([...liked]));
  }, [liked]);
  useEffect(() => {
    localStorage.setItem("saved", JSON.stringify([...saved]));
  }, [saved]);

  // Filtered list
  const filtered = useMemo(() => {
    if (!onlySaved) return posts;
    return posts.filter(p => saved.has(p.id));
  }, [posts, onlySaved, saved]);

  const openModal = (item) => {
    const idx = filtered.findIndex(p => p.id === item.id);
    setModalIndex(idx >= 0 ? idx : null);
  };
  const closeModal = () => setModalIndex(null);
  const currentPost = modalIndex != null ? filtered[modalIndex] : null;

  const nextPost = () => {
    if (modalIndex == null) return;
    setModalIndex((modalIndex + 1) % filtered.length);
  };
  const prevPost = () => {
    if (modalIndex == null) return;
    setModalIndex((modalIndex - 1 + filtered.length) % filtered.length);
  };

  const toggleLike = () => {
    if (!currentPost) return;
    const id = currentPost.id;
    const isLiked = liked.has(id);
    const newLiked = new Set(liked);
    if (isLiked) newLiked.delete(id); else newLiked.add(id);
    setLiked(newLiked);
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + (isLiked ? -1 : 1) } : p));
  };

  const toggleSave = () => {
    if (!currentPost) return;
    const id = currentPost.id;
    const newSaved = new Set(saved);
    if (newSaved.has(id)) newSaved.delete(id); else newSaved.add(id);
    setSaved(newSaved);
  };

  const shuffle = () => {
    setPosts(prev => {
      const copy = [...prev];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    });
    // Jump to top for a fresh feel
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full bg-[#0b0b0d] text-white relative overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div ref={topRef} />

        {/* Header / Controls */}
        <div className="mb-8 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            🔍 Discover New Moments
          </h1>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOnlySaved(!onlySaved)}
              className={`px-3 py-1.5 rounded-full border ${onlySaved ? "border-emerald-500 bg-emerald-500/10" : "border-white/10 hover:bg-white/5"}`}
              title="Toggle only saved"
            >
              {onlySaved ? "Showing Saved" : "Only Saved"}
            </button>

            <button
              onClick={shuffle}
              className="px-3 py-1.5 rounded-full border border-indigo-500 bg-indigo-500/10 hover:bg-indigo-500/20"
              title="Shuffle feed"
            >
              🔀 Surprise Me
            </button>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="min-h-[70vh]">
          <Masonry
            items={filtered}
            animateFrom="bottom"
            stagger={0.06}
            blurToFocus
            scaleOnHover
            hoverScale={0.96}
            colorShiftOnHover
            onImageClick={openModal}
          />
        </div>

        {/* Skeletons during append */}
        {appending && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-xl bg-white/5 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Infinite Scroll Loader */}
        <div ref={loader} className="h-20 w-full flex items-center justify-center mt-10">
          <span className="text-sm text-gray-400 animate-pulse">Loading more...</span>
        </div>
      </div>

      {/* Back to Top FAB */}
      <button
        onClick={() => topRef.current?.scrollIntoView({ behavior: "smooth" })}
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 grid place-items-center backdrop-blur-md"
        title="Back to top"
      >
        ↑
      </button>

      {/* Modal */}
      <PostModal
        isOpen={modalIndex != null}
        post={currentPost}
        onClose={closeModal}
        onPrev={prevPost}
        onNext={nextPost}
        onToggleLike={toggleLike}
        onToggleSave={toggleSave}
        liked={currentPost ? liked.has(currentPost.id) : false}
        saved={currentPost ? saved.has(currentPost.id) : false}
      />
    </div>
  );
}

export default Explore;
