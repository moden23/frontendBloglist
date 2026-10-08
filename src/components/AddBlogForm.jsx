export default function AddTokenForm({
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  addBlog,
}) {
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
