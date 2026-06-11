import axios from "axios";

type methods = "GET" | "POST" | "PUT" | "DELETE";

export const fetchData = async (
  method: methods,
  id?: string,
  body?: { id?: string; code: string; codeLang?: string; fileName?: string }
) => {
  const base_url = process.env.NEXT_PUBLIC_BASE_URL;

  let data = [];
  let error = "";

  try {
    if (method === "POST" && id) {

      const res = await axios.request({
        method: method,
        url: `${base_url}/api/data?id=${id}`,
        data: body,
      });
      if (res.status === 200) {
        data = res.data.data;
      }
    } 
    else if (method === "POST" || method === "PUT") {
      const res = await axios.request({
        method: method,
        url: `${base_url}/api/data`,
        data: body,
      });
      if (res.status === 200) {
        data = res.data.data;
      } else {
        error = "Something went wrong please Try again...";
      }
    } else {
      const res = await axios.request({
        method: method,
        url: `${base_url}/api/data?id=${id}`,
      });
      if (res.status === 200) {
        data = res.data.data;
      } else {
        error = "Something went wrong please Try again...";
      }
    }
  } catch (err: any) {
    error = err;
  }
  return { data, error };
};
