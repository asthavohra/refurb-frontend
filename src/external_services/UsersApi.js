import axios from "axios";

const createUser = (user) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/v1/user`,
        {
          uid: user.uid,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.API_KEY,
          },
        }
      )
      .then((response) => {
        if (validateCreateUserResponse(response)) {
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
const getCurrentUserCartItems = (userId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/v1/user/${userId}/cart`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.API_KEY,
          },
        }
      )
      .then((response) => {
        if (validateCartResponse(response)) {
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
const validateCreateUserResponse = (response) => {
  if (
    response &&
    response.data &&
    response.status === 201 &&
    response.data.userId !== null
  ) {
    return true;
  } else return false;
};

const validateCartResponse = (response) => {
  if (response && response.data && response.status === 200) {
    return true;
  } else return false;
};

export { createUser, getCurrentUserCartItems };
