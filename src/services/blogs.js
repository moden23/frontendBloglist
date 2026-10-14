import axios from "axios";
const baseUrl = "/api/blogs";
let token = "";
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const add = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(updatedBlog);
  const respone = await axios.put(
    `${baseUrl}/${updatedBlog.id}`,
    updatedBlog,
    config,
  );
  return respone.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const respone = await axios.post(baseUrl, newBlog, config);
  return respone.data;
};

const remove = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response.status;
};
export default { getAll, create, add, setToken, remove };
