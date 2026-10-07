import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import usersService from "./services/users";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import AddTokenForm from "./components/AddTokenForm";
const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(() => {
    const userLoggedJSON = window.localStorage.getItem("bloglistUser");
    if (userLoggedJSON) return JSON.parse(userLoggedJSON);
    return null;
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      console.log(username, password);
      const user = await loginService.login({ username, password });
      console.log(user);
      const blogs = await usersService.getBlogsOfUser(user.id);
      console.log(user);
      console.log(blogs);
      blogService.setToken(user.token);
      window.localStorage.setItem("bloglistUser", JSON.stringify(user));
      setBlogs(blogs);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      setErrorMessage("wrongCredentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("bloglistUser");
    setUser(null);
    console.log("n");
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const blogNew = await blogService.create({ author, url, title });
      setBlogs([...blogs, blogNew]);
      setTitle("");
      setAuthor("");
      setUrl("");
      setSuccessMessage(`a new blog ${title} by ${author} added`);
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
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        ></LoginForm>
      )}
      {user && (
        <>
          <h2>blogs</h2>
          <p>
            {username} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <AddTokenForm
            author={author}
            setAuthor={setAuthor}
            title={title}
            setTitle={setTitle}
            url={url}
            setUrl={setUrl}
            addBlog={addBlog}
          ></AddTokenForm>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
