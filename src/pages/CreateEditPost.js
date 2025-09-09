import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../utils/api';

function CreateEditPost() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [title, setTitle] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [useAI, setUseAI] = useState(false);

  useEffect(() => {
    if (isEdit) {
      apiRequest(`/api/posts/${id}`)
        .then(post => {
          setTitle(post.title);
          setImageURL(post.imageURL || '');
          setContent(post.content);
        })
        .catch(() => navigate('/'));
    }
  }, [id, isEdit, navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (title.length < 5 || title.length > 120) {
      setError('Title must be 5-120 characters.');
      setLoading(false);
      return;
    }
    if (!useAI && content.length < 50) {
      setError('Content must be at least 50 characters.');
      setLoading(false);
      return;
    }
    try {
      if (isEdit) {
        await apiRequest(`/api/posts/${id}`, 'PUT', { title, imageURL, content }, token);
      } else {
        await apiRequest('/api/posts', 'POST', { title, imageURL, content, useAI }, token);
      }
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Error saving post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Edit' : 'Create'} Post</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2"
          required
        />
        <input
          type="url"
          placeholder="Image URL (optional)"
          value={imageURL}
          onChange={e => setImageURL(e.target.value)}
          className="border p-2"
        />
        {!isEdit && (
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="useAI"
              checked={useAI}
              onChange={e => setUseAI(e.target.checked)}
              className="h-4 w-4"
            />
            <label htmlFor="useAI">Use AI to generate content</label>
          </div>
        )}
        {!useAI && (
          <textarea
            placeholder="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="border p-2 h-40"
            required={!useAI}
          />
        )}
        {error && <p className="text-red-500">{error}</p>}
        <button 
          type="submit" 
          className={`${loading ? 'bg-gray-500' : 'bg-blue-500'} text-white px-4 py-2 rounded flex items-center justify-center`}
          disabled={loading}
        >
          {loading ? (
            <span>Generating...</span>
          ) : (
            <span>{isEdit ? 'Update' : 'Create'} Post</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default CreateEditPost;
