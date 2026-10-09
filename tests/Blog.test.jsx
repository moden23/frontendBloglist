import { render, screen } from "@testing-library/react";
import Blog from "../src/components/Blog";
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
