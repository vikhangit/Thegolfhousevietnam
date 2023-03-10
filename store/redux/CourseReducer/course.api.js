import ContentAxios from "../../../clientAxios/contentAxios";
const getCourseAPI = async () => {
  try {
    const resApi = await ContentAxios.get(
      `/course?limit=500&page=1&access_token=7d7fea98483f31af4ac3cdd9db2e4a93`
    );
    if (resApi)
      return {
        success: true,
        data: resApi,
      };
    return {
      success: false,
      data: null,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      data: null,
    };
  }
};
const getUsersRegister = async () => {
  try {
    const resApi = await ContentAxios.get(
      `/course_register?limit=500&page=1&access_token=7d7fea98483f31af4ac3cdd9db2e4a93`
    );
    if (resApi)
      return {
        success: true,
        data: resApi,
      };
    return {
      success: false,
      data: null,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      data: null,
    };
  }
};
const postUsersRegister = async (data) => {
  try {
    const resApi = await ContentAxios.post(
      `/course_register?access_token=7d7fea98483f31af4ac3cdd9db2e4a93`,
      data
    );
    if (resApi)
      return {
        success: true,
        data: resApi,
      };
    return {
      success: false,
      data: null,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      data: null,
    };
  }
};
const CourseAPI = {
  getCourseAPI,
  postUsersRegister,
  getUsersRegister,
};
export default CourseAPI;
