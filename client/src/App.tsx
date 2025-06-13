import "./App.css";
import CreatePost from "./dashboard/CreatePost";
import EditPost from "./dashboard/EditPost";
import Posts from "./dashboard/Posts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import axios from "axios";
import { useEffect, useState } from "react";
import PrivateRoute from "./components/PrivateRoute";
import Loader from "./components/Loader";
import Post from "./dashboard/Post";
import Header from "./components/Header";

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await axios.get("https://cms-uuv8.onrender.com/api/auth/checkAuth");
      if (res.data.user) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) return <Loader />;

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser} />} />

        <Route
          path="/"
          element={
            <PrivateRoute user={user}>
              <Posts />
            </PrivateRoute>
          }
        />
        <Route
          path="/editPost/:id"
          element={
            <PrivateRoute user={user}>
              <EditPost />
            </PrivateRoute>
          }
        />
        <Route
          path="/createPost"
          element={
            <PrivateRoute user={user}>
              <CreatePost />
            </PrivateRoute>
          }
        />

        <Route
          path="/post/:id"
          element={
            <PrivateRoute user={user}>
              <Post />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
