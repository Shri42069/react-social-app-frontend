import { Link } from 'react-router-dom';


function Home() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {user?.name || user?.email}</h1>
      {user?.profilePic && (
        <img src={user.profilePic} alt="Profile" className="w-24 h-24 mt-4 rounded-full" />
      )}
      <Link to="/explore" className="text-blue-600 underline mt-4 block">
        Go to Explore Feed
      </Link>
    </div>
    
  );
}

export default Home;
