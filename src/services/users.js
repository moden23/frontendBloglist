import axios from "axios";
const baseUrl = "/api/users";

const getCreatorUsername = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`);
  return response.data.username;
};

export default { getCreatorUsername };
