import { axios } from ".";

export const temp = async () => {
  try {
    const res = await axios.post("/");
    if (res.status === 200) return res.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};
