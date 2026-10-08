export default function AddTokenForm({
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  addBlog,
  setBlogFormVisible,
  blogFormVisible,
}) {
  const formBlogVisibility = () => {
    const hideForm = { display: blogFormVisible ? "none" : "" };
    const showForm = { display: blogFormVisible ? "" : "none" };
    return [hideForm, showForm];
  };

  const [hideForm, showForm] = formBlogVisibility();

  return (
    <>
      <button style={hideForm} onClick={() => setBlogFormVisible(true)}>
        create new blog
      </button>
      <form style={showForm} onSubmit={addBlog}>
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
        <button type="submit" onClick={() => setBlogFormVisible(false)}>
          create
        </button>
        <button type="button" onClick={() => setBlogFormVisible(false)}>
          cancel
        </button>
      </form>
    </>
  );
}
