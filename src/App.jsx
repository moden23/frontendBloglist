import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
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
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      }
    };
    fetchBlogs();
  }, [user]);

  const handleLogout = () => {
    window.localStorage.removeItem("bloglistUser");
    setUser(null);
  };

  const addBlog = async (blogObject) => {
    try {
      const blogNew = await blogService.create(blogObject);
      setBlogs([...blogs, blogNew]);

      setSuccessMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
      );
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      console.log(exception);
    }
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
            <AddBlogForm addBlog={addBlog} />
          </Togglable>
          {blogs
            .map((blog) => (
              <Blog
                username={user?.username}
                key={blog.id}
                blogs={blogs}
                setBlogs={setBlogs}
                blog={blog}
                setSuccessMessage={setSuccessMessage}
              />
            ))
            .toSorted((blogfirst, blogsecond) => {
              return blogsecond.props.blog.likes - blogfirst.props.blog.likes;
            })}
        </>
      )}
    </div>
  );
};

export default App;
