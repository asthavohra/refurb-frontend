import axios from "axios";

const createOrder = (order) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/order`, order, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": process.env.REACT_APP_API_KEY,
        },
      })
      .then((response) => {
        if (validateCreateOrderResponse(response)) {
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

const getAllOrders = (userId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/user/${userId}/orders`, {
        headers: {
          "X-API-KEY": process.env.REACT_APP_API_KEY,
        },
      })
      .then((response) => {
        if (validateGetOrdersResponse(response)) {
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

const validateCreateOrderResponse = (response) => {
  if (
    response &&
    response.data &&
    response.status === 200 &&
    response.data.userId !== null &&
    response.data.orderId !== null
  ) {
    return true;
  } else return false;
};

const validateGetOrdersResponse = (response) => {
  if (response && response.data && response.status === 200) {
    return true;
  } else return false;
};

export { createOrder, getAllOrders };
