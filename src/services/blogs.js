import axios from "axios";
const baseUrl = "/api/blogs";
let token = "";
console.log("s");
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const add = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  };
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
export default { getAll, create, add, setToken };
