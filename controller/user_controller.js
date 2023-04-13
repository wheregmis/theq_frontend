import { useState } from "react";
import axios from "axios";
import { loginURL } from "../constraints/urls";
import { Storage } from "expo-storage";

async function setCurrentUser(userData) {
  try {
    await Storage.setItem({
      key: "currentUser",
      value: JSON.stringify(userData),
    });
  } catch (error) {
    console.log(error);
  }
}

async function getCurrentUser() {
  try {
    const value = await Storage.getItem({ key: "currentUser" });
    if (value) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.log(error);
  }
}

function userLoginFunction(email, password) {
  const [currentUserData, setCurrentUserData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post(loginURL, {
        email,
        password,
      });
      if (response.status === 200) {
        console.log(response.data);
        setLoggedIn(true);
        setCurrentUser(response.data);
        setCurrentUserData(response.data);
      }
      // todo: Store the token in the local storage
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const logout = () => {
    setLoggedIn(false);
    // todo: Clear the token from the local storage
  };

  return [loggedIn, currentUserData, error, login, logout];
}

export default userLoginFunction;

export { setCurrentUser, userLoginFunction, getCurrentUser };
