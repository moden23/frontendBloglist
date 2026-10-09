import { useState } from "react";
import blogService from "../services/blogs";
const Blog = ({ blog, setBlogs, blogs, username }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [viewDetails, setViewDetails] = useState(false);

  const hideDetails = { display: viewDetails ? "none" : "" };
  const showDetails = { display: viewDetails ? "" : "none" };

  const addLike = async (blog) => {
    try {
      blog.likes += 1;
      const updatedBlog = await blogService.add(blog);
      setBlogs(
        blogs.map((blog) => {
          if (blog.id === updatedBlog.id) return updatedBlog;
          return blog;
        }),
      );
    } catch (exception) {
      console.log(exception);
    }
  };

  const deleteBlog = async (selectedBlog) => {
    const deleteConfrimation = window.confirm(
      `Remove blog ${selectedBlog.title} by ${selectedBlog.author}`,
    );
    if (!deleteConfrimation) return;

    try {
      const response = await blogService.remove(selectedBlog.id);
      if (response == 204) {
        setBlogs(blogs.filter((blog) => blog.id != selectedBlog.id));
      } else throw new Error(`Wrong response code ${response}`);
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <div className="blog">
      <p style={{ ...blogStyle, ...hideDetails }}>
        {blog.title} {blog.author}
        <button onClick={() => setViewDetails(!viewDetails)}>view</button>
      </p>
      <div style={{ ...blogStyle, ...showDetails }}>
        <p>
          {`${blog.title} ${blog.author}`}
          <button onClick={() => setViewDetails(!viewDetails)}>hide</button>
        </p>
        <p className="url">{blog.url}</p>
        <p className="likes">
          likes {blog.likes}
          <button onClick={() => addLike(blog)}>like</button>
        </p>
        <p>{username}</p>
        <button onClick={() => deleteBlog(blog)}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
