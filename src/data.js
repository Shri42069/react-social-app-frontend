// src/data.js
let count = 0;

export const generatePosts = (num = 20) => {
  const posts = [];
  for (let i = 0; i < num; i++) {
    posts.push({
      id: count++,
      img: `https://picsum.photos/seed/${count}/400/600`,
      height: 300 + Math.floor(Math.random() * 300), // Random height for Masonry
      url: "#",
    });
  }
  return posts;
};
