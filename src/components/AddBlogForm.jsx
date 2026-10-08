import { useState } from "react";
import blogService from "../services/blogs";
export default function AddTokenForm({ setSuccessMessage, setBlogs, blogs }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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
    <form id="blog-add-form" onSubmit={addBlog}>
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
