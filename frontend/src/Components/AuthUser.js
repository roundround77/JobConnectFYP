// Import necessary dependencies and modules
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Define the AuthUser functional component
export default function AuthUser() {
  // Function to get the token from local storage
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  // Function to get the user data from local storage
  const getUser = () => {
    const userString = localStorage.getItem("user");
    var userData = JSON.parse(userString);
    return userData;
  };

  // Initialize state for token and user using useState
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  // Get the navigate function from react-router-dom
  const navigate = useNavigate();

  // Function to save the token and user data in local storage and state
  const saveToken = (user, token) => {
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
    navigate("/");
  };

  // Function to clear local storage and navigate to the sign-in page
  const logout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  // Create an instance of axios with a base URL and default headers
  const http = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Return an object with functions and state to be used by components
  return {
    setToken: saveToken,
    http,
    getUser,
    token,
    user,
    getToken,
    logout,
  };
}
