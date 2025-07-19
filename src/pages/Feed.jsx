import { useEffect, useState } from 'react';
import axios from 'axios';

function Feed() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [posts, setPosts] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:5000/api/posts/feed');
    setPosts(res.data.posts);
  };

  const handleImageUpload = async () => {
    if (!image) return;
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'your_unsigned_preset');
    data.append('cloud_name', 'your_cloud_name');

    setUploading(true);
    const res = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
      method: 'POST',
      body: data,
    });
    const result = await res.json();
    setImageUrl(result.secure_url);
    setUploading(false);
  };

  const handlePost = async (e) => {
    e.preventDefault();

    if (image && !imageUrl) {
      await handleImageUpload(); // wait for image upload first
    }

    const res = await axios.post('http://localhost:5000/api/posts/create', {
      email: user.email,
      name: user.name,
      content,
      image: imageUrl,
    });

    setContent('');
    setImage(null);
    setImageUrl('');
    fetchPosts(); // refresh feed
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handlePost} className="bg-white p-4 shadow rounded mb-6">
        <textarea
          placeholder="What's on your mind?"
          className="w-full border p-2 rounded mb-3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mb-3" />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Post'}
        </button>
      </form>

      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 shadow rounded mb-4">
          <p className="font-bold">{post.name}</p>
          <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
          <p className="mt-2">{post.content}</p>
          {post.image && <img src={post.image} alt="post" className="mt-2 rounded" />}
        </div>
      ))}
    </div>
  );
}

export default Feed;
