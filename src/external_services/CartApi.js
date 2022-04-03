import axios from "axios";

const addItemToCart = (item) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/cart/add`, item, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": process.env.REACT_APP_API_KEY,
        },
      })
      .then((response) => {
        if (validateAddToCartResponse(response)) {
          resolve(response.data);
        } else {
          reject("validation failed");
        }
      })
      .catch((error) => {
        reject("error is", error);
      });
  });
};

const removeItemFromCart = (userId, itemId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/v1/cart/item`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": process.env.REACT_APP_API_KEY,
        },
        data: {
          userId: userId,
          itemId: itemId,
        },
      })
      .then((response) => {
        if (validateRemoveFromCartResponse(response)) {
          resolve(response.data);
        } else {
          reject("validation failed");
        }
      })
      .catch((error) => {
        reject("error is", error);
      });
  });
};
const validateRemoveFromCartResponse = (response) => {
  if (response && response.data && response.status === 200) {
    return true;
  } else return false;
};
const validateAddToCartResponse = (response) => {
  if (response && response.data && response.status === 200) {
    return true;
  } else return false;
};
export { addItemToCart, removeItemFromCart };
