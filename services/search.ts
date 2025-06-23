import { axiosHttpWithAuth } from "./axiosHttp";

export const searchClient = async (query: string) => {
  const response = await axiosHttpWithAuth.get(`/client/search/${query}`);
  return response.data;
};