import { render, screen } from "@testing-library/react";
import Blog from "../src/components/Blog";
import Togglable from "../src/components/Togglable";
import AddBlogForm from "../src/components/AddBlogForm";
import userEvent from "@testing-library/user-event";
import { test, expect, vi } from "vitest";
import blogService from "../src/services/blogs";

test("display author and title but not url and likes", async () => {
  const blog = {
    author: "thomas",
    title: "titleExample",
    url: "some url",
  };

  const { container } = render(<Blog blog={blog} />);

  const blogElement = container.querySelector(".blog");
  const urlElement = container.querySelector(".url");
  const likesElement = container.querySelector(".likes");

  expect(blogElement).toHaveTextContent("titleExample thomas");
  expect(urlElement).not.toBeVisible();
  expect(likesElement).not.toBeVisible();
});

test("check url and likes are shown when button view is clicked", async () => {
  const blog = {
    author: "thomas",
    title: "titleExample",
    url: "some url",
    likes: 1,
  };

  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const urlElement = screen.getByText("some url", { exact: false });
  const likesElement = screen.getByText("1", { exact: false });

  expect(urlElement).toBeDefined();
  expect(likesElement).toBeDefined();
});

test("check if double click call two times the add like", async () => {
  const blog = {
    author: "thomas",
    title: "titleExample",
    url: "some url",
    likes: 1,
  };

  const mockUpdate = vi
    .spyOn(blogService, "add")
    .mockResolvedValue({ ...blog, likes: blog.likes + 1 });

  const setBlogs = vi.fn();
  const user = userEvent.setup();

  render(<Blog blog={blog} setBlogs={setBlogs} />);

  const button = screen.getByText("like");
  await user.click(button);
  await user.click(button);

  expect(mockUpdate).toHaveBeenCalledTimes(2);
});

test("right details when blog is created", async () => {
  const blog = {
    author: "thomas",
    title: "titleExample",
    url: "some url",
    likes: 1,
  };

  const addBlog = vi.fn();
  const user = userEvent.setup();

  const { container } = render(
    <Togglable buttonLabel="create new blog">
      <AddBlogForm addBlog={addBlog} />
    </Togglable>,
  );

  const buttonEnableCreation = container.querySelector(".create-new-blog");
  await user.click(buttonEnableCreation);

  const button = container.querySelector(".create");

  const inputTitle = screen.getByLabelText("title");
  const inputAuthor = screen.getByLabelText("author");
  const inputUrl = screen.getByLabelText("url");

  await user.type(inputTitle, blog.title);
  await user.type(inputAuthor, blog.author);
  await user.type(inputUrl, blog.url);
  await user.click(button);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe(blog.title);
  expect(addBlog.mock.calls[0][0].author).toBe(blog.author);
  expect(addBlog.mock.calls[0][0].url).toBe(blog.url);
});
