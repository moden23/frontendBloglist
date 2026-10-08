import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import usersService from "./services/users";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import Togglable from "./components/Togglable";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(() => {
    const userLoggedJSON = window.localStorage.getItem("bloglistUser");
    if (userLoggedJSON) return JSON.parse(userLoggedJSON);
    return null;
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (user) blogService.setToken(user.token);
  }, [user]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const userLoggedJSON = window.localStorage.getItem("bloglistUser");
      if (userLoggedJSON) {
        const user = JSON.parse(userLoggedJSON);
        const blogs = await usersService.getBlogsOfUser(user.id);
        setBlogs(blogs);
      }
    };
    fetchBlogs();
  }, [user]);

  const handleLogout = () => {
    window.localStorage.removeItem("bloglistUser");
    setUser(null);
    console.log("n");
  };

  return (
    <div>
      {errorMessage && (
        <p style={{ color: "red", borderColor: "red" }}>{errorMessage}</p>
      )}
      {successMessage && (
        <p style={{ color: "green", borderColor: "green" }}>{successMessage}</p>
      )}
      {!user && (
        <LoginForm
          setUser={setUser}
          setBlogs={setBlogs}
          setErrorMessage={setErrorMessage}
        ></LoginForm>
      )}
      {user && (
        <>
          <h2>blogs</h2>
          <p>
            {user.username} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="create new blog">
            <AddBlogForm
              setSuccessMessage={setSuccessMessage}
              blogs={blogs}
              setBlogs={setBlogs}
            />
          </Togglable>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
