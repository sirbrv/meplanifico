import axios from "../api/direct";
import UseAxiosFunction from "../hoocks/useAxios";

const endpoint = "/api/users";

const UserGetUsers = () => {
  const [response, error, loading, axiosFetch] = UseAxiosFunction();
  const getData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: endpoint,
    });
  };
  getData();
  return {
    response,
    error,
    loading
  };
};
export {
  UserGetUsers
}