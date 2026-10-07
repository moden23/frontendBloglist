import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  try {
    const respone = await axios.post(baseUrl, credentials);
    return respone.data;
  } catch (exception) {
    console.log(exception);
  }
};

export default { login };
