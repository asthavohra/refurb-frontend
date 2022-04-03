import axios from "axios";

const initiatePayment = (total) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/v1/payment`,
        {
          total: total * 100,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.REACT_APP_API_KEY,
          },
        }
      )
      .then((response) => {
        if (validatePaymentResponse(response)) {
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
const validatePaymentResponse = (response) => {
  if (
    response &&
    response.data &&
    response.status === 201 &&
    response.data.clientSecret !== null
  ) {
    return true;
  } else return false;
};

export { initiatePayment };
