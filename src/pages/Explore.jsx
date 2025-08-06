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
    <div className="min-h-screen w-full bg-[#0f0f0f] text-white relative overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 tracking-tight">
          🔍 Discover New Moments
        </h1>

        {/* Masonry Grid */}
        <div className="min-h-[80vh]">
          <Masonry
            items={posts}
            animateFrom="bottom"
            stagger={0.08}
            blurToFocus
            scaleOnHover
            hoverScale={0.94}
            colorShiftOnHover
            onImageClick={(imgUrl) => {
              // Custom behavior can go here
              alert(`You clicked: ${imgUrl}`);
            }}
          />
        </div>

        {/* Infinite Scroll Loader */}
        <div ref={loader} className="h-20 w-full flex items-center justify-center mt-10">
          <span className="text-sm text-gray-400 animate-pulse">Loading more...</span>
        </div>
      </div>
    </div>
  );
}

export default Explore;
