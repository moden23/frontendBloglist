import { useState } from "react";
import blogService from "../services/blogs";
const Blog = ({ blog, setBlogs, blogs }) => {
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
      console.log(blog);
      const updatedBlog = await blogService.add(blog);
      console.log(updatedBlog);

      console.log(
        blogs.map((blog) => {
          if (blog.id === updatedBlog.id) return updatedBlog;
          return blog;
        }),
      );
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

  return (
    <div>
      <p style={{ ...blogStyle, ...hideDetails }}>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setViewDetails(!viewDetails)}>view</button>
      </p>
      <div style={{ ...blogStyle, ...showDetails }}>
        <p>
          {blog.title}{" "}
          <button onClick={() => setViewDetails(!viewDetails)}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}{" "}
          <button onClick={() => addLike(blog)}>likes</button>
        </p>
        <p>{blog.author}</p>
      </div>
    </div>
  );
};

export default Blog;
