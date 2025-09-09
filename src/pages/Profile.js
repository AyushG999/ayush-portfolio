import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { apiRequest } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
  const { user, token, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    apiRequest(`/api/posts?username=${user.username}`)
      .then(data => setPosts(data.posts))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await apiRequest(`/api/posts/${id}`, 'DELETE', null, token);
      setPosts(posts.filter(p => p._id !== id));
    } catch (err) {
      setError(err.message || 'Delete failed');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Posts</h1>
      <button onClick={logout} className="mb-4 bg-gray-200 px-3 py-1 rounded">Logout</button>
      {loading ? <p>Loading...</p> : posts.length === 0 ? <p>No posts found.</p> : (
        <div className="grid gap-4">
          {posts.map(post => (
            <div key={post._id} className="border p-4 rounded">
              <h2 className="font-semibold text-lg">{post.title}</h2>
              <div className="flex gap-2 mt-2">
                <Link to={`/edit/${post._id}`} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</Link>
                <button onClick={() => handleDelete(post._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default Profile;
