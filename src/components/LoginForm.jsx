export default function LoginForm({
  setUsername,
  setPassword,
  password,
  username,
  handleLogin,
}) {
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
