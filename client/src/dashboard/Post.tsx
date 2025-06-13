import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/post/" + id);
      if (res.data.error) {
        console.log(res.data.error);
      }
      setPost(res.data.post);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(post);

  if (loading) return <Loader />;
  return (
    <>
      <div className="container rounded overflow-hidden shadow-lg bg-white mx-auto m-8">
        {post && (
          <div>
            <img className="w-full h-96 object-cover" src={post.image} />

            <div className="px-6 py-4">
              <h2 className="font-bold text-xl mb-2 text-gray-800">
                {post.title}
              </h2>

              <p className="text-gray-600 text-base mb-4 line-clamp-3">
                {post.description}
              </p>

              <div className="flex items-center">
                <div className="text-sm">
                  <p className="text-gray-500">By {post.author}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Post;
