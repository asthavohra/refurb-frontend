import axios from "axios";

const getProducts = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/products`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": process.env.REACT_APP_API_KEY,
        },
      })
      .then((response) => {
        if (validateResponse(response)) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject("error is", error);
      });
  });
};

const searchProductsByTitle = (searchTerm) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/products/search?name=${searchTerm}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.REACT_APP_API_KEY,
          },
        }
      )
      .then((response) => {
        if (validateResponse(response)) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject("error is", error);
      });
  });
};

const validateResponse = (response) => {
  if (response && response.data && response.status === 200) {
    return true;
  } else return false;
};

export { getProducts, searchProductsByTitle };
