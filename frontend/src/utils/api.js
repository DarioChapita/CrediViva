import axios from "axios";
import API_URL from "../environment";

const apiRequest = async (method, url, data = null) => {
  const token = sessionStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await axios({
    method,
    url: `${API_URL}${url}`,
    data,
    headers,
  });

  return response.data;
};

export default apiRequest;