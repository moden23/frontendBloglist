import { useState } from "react";
export default function AddTokenForm({ addBlog }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form id="blog-add-form" className="blog-add-form" onSubmit={handleSubmit}>
      <p>create new</p>
      <label htmlFor="title">title</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      ></input>
      <label htmlFor="author">author</label>
      <input
        id="author"
        type="text"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      ></input>
      <label htmlFor="url">url</label>
      <input
        id="url"
        type="text"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      ></input>
    </form>
  );
}
