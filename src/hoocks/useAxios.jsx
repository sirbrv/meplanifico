export const axiosFetch = async (configObj) => {
  const { axiosInstance, method, url, requestConfig = {} } = configObj;
  try {
    const res = await axiosInstance[method.toLowerCase()](url, {
      ...requestConfig,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};
