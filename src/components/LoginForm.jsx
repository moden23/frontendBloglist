import loginService from "../services/login";
import usersService from "../services/users";
import blogService from "../services/blogs";
import { useState } from "react";
export default function LoginForm({ setBlogs, setErrorMessage, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      const blogs = await usersService.getBlogsOfUser(user.id);

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

  return (
    <form onSubmit={handleLogin}>
      <label>
        userusername
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
