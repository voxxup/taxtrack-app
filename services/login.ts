import { axiosHttp } from "./axiosHttp";

export default async function loginService(username: string, password: string) {
  const response = await axiosHttp.post('/user/login/', {
    username,
    password,
  });
  return response.data;
};