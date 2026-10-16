import loginService from "../services/login";
import blogService from "../services/blogs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function LoginForm({ setBlogs, setErrorMessage, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
      setUser(user);
      window.localStorage.setItem("bloglistUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (exception) {
      console.log(exception);
      setErrorMessage("wrongCredentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        username
        <input
          type="text"
          onChange={({ target }) => setUsername(target.value)}
          value={username}
        ></input>
      </label>
      <label>
        password
        <input
          type="password"
          value={password}
          onChange={({ target }) => {
            console.log(target.value);
            setPassword(target.value);
          }}
        ></input>
      </label>
      <button type="submit">login</button>
    </form>
  );
}
