import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://cms-uuv8.onrender.com/api/posts");
      if (res.data.error) {
        console.log(res.data.error);
      }
      setPosts(res.data.posts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    try {
      setLoading(true);
      const res = await axios.delete(`https://cms-uuv8.onrender.com/api/post/${id}`);
      if (res.data.error) {
        console.log(res.data.error);
      }
      fetchPosts();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("https://cms-uuv8.onrender.com/api/auth/logout", {
        withCredentials: true,
      });

      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-md">
      <div className="container mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">All Articles</h2>
          <div className="flex gap-3">
            <Link
              to="/createPost"
              className="px-4 py-2 text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors"
            >
              Create Post
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {posts?.map((post) => (
            <div
              key={post._id}
              className="border-b pb-4 last:border-b-0 last:pb-0"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-32 h-24 object-cover rounded"
                  />
                </div>
                <div>
                  <Link to={`/post/${post._id}`} className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <h1 className="text-lg font-semibold text-gray-800">
                        {post.title}
                      </h1>
                      <p className="text-sm text-gray-500">By {post.author}</p>
                    </div>
                    <p className="text-gray-600 mt-2 mb-3 line-clamp-2">
                      {post.description}
                    </p>
                  </Link>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => deletePost(post._id)}
                      className="px-3 py-1 text-sm text-yellow-600 bg-yellow-50 rounded hover:bg-yellow-100 transition-colors"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/editPost/${post._id}`}
                      className="px-3 py-1 text-sm text-teal-600 bg-teal-50 rounded hover:bg-teal-100 transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
