import { useEffect, useState, useRef } from "react";
import Masonry from "../components/Masonry";
import { generatePosts } from "../data";

function Explore() {
  const [posts, setPosts] = useState(() => generatePosts());
  const loader = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setPosts((prev) => [...prev, ...generatePosts()]);
          }, 1000);
        }
      },
      { threshold: 1 }
    );

    if (loader.current) observer.observe(loader.current);
    return () => loader.current && observer.unobserve(loader.current);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#121212] text-white px-4 py-8 relative">
      <h1 className="text-2xl font-bold mb-6 text-center">Explore</h1>

      {/* Container with padding-bottom to push Masonry height into full flow */}
      <div className="relative min-h-screen pb-40">
        <Masonry
          items={posts}
          animateFrom="bottom"
          stagger={0.08}
          blurToFocus
          scaleOnHover
          hoverScale={0.94}
          colorShiftOnHover
        />
      </div>

      {/* Loader */}
      <div ref={loader} className="h-20 w-full flex items-center justify-center mt-10">
        <span className="text-sm text-gray-400 animate-pulse">Loading more...</span>
      </div>
    </div>
  );
}

export default Explore;
