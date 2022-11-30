const axios = require("axios").default;

export default async function featch(query, { variables } = {}) {
  try {
    const res = await axios({
      url: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
      method: "post",
      data: {
        query,
        variables,
      },
    });
    const { data } = res.data;
    return data;
  } catch (error) {
    throw new Error("Failed to fetch API");
  }
}
