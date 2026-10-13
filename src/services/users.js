import axios from "axios";
const baseUrl = "/api/users";

const getBlogsOfUser = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`);
  return response.data.blogs;
};
const getCreatorUsername = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`);
  return response.data.username;
};

export default { getCreatorUsername };
