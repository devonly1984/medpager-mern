import { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import signinImage from "../assets/signup.jpg";
const Auth = () => {
  const initialState = {
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    avatarURL: "",
  };
  const cookies = new Cookies();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState(initialState);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setIsSignup((prev) => !prev);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, phoneNumber, avatarURL } = form;

    const URL = "http://localhost:3500/auth";
    const {
      data: { token, userId, hashedPassword },
    } = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, {
      username,
      password,
      fullName: form.fullName,
      phoneNumber,
      avatarURL,
    });
    cookies.set("token", token);
    cookies.set("username", username);
    cookies.set("userId", userId);
    if (isSignup) {
      cookies.set("phoneNumber", phoneNumber);
      cookies.set("avatarURL", avatarURL);
      cookies.set("hashedPassword", hashedPassword);
    }
    window.location.reload();
  };
  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignup ? "Sign up" : "Sign In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <>
                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    required
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                onChange={handleChange}
              />
            </div>
            {isSignup && (
              <>
                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="avatarURL">Avatar URL</label>
                  <input
                    type="text"
                    name="avatarURL"
                    placeholder="Avatar Url"
                    required
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={handleChange}
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword"> ConfirmPassword</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
              <button type="submit">{isSignup ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields_account">
            <p>
              {isSignup ? "Already have an account?" : "Dont have an account?"}
              <span onClick={switchMode}>
                {isSignup ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={signinImage} alt="Sign In" />
      </div>
    </div>
  );
};

export default Auth;
