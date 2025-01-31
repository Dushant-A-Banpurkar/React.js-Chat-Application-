import { IconUser, IconKey } from "@tabler/icons-react";
import { Message } from "primereact/message";
import { Link } from "react-router-dom";
import { useState } from "react";
import useSignUp from "../../hooks/useSignUp.js";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignUp(); // Destructure loading and signup
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonClicked(true);

    console.log("Form submitted with data:", formData);
    signup(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-wrap flex-col items-center justify-center min-w-96 mx-auto text-white">
      <h1 className="text-4xl mb-4 border-b-2">Xtrach</h1>
      <div className="w-full rounded-lg shadow-md bg-clip-padding border-2 p-4">
        <h1 className="text-3xl font-semibold text-center mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="relative w-full flex flex-col mb-4">
            <div className="relative w-full flex items-center">
              <IconUser className="absolute left-3 text-gray-400" />
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                className="pl-10 pr-4 py-2 w-full rounded-md h-12 text-lg text-white"
                onChange={handleInputChange}
                value={formData.fullname}
              />
            </div>
            {buttonClicked && !formData.fullname && (
              <Message
                severity="error"
                className="text-red-600"
                text="Full Name is required"
              />
            )}
          </div>
          <div className="relative w-full flex flex-col mb-4">
            <div className="relative w-full flex items-center">
              <IconUser className="absolute left-3 text-gray-400" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="pl-10 pr-4 py-2 w-full rounded-md h-12 text-lg text-white"
                onChange={handleInputChange}
                value={formData.username}
              />
            </div>
            {buttonClicked && !formData.username && (
              <Message
                severity="error"
                className="text-red-600"
                text="Username is required"
              />
            )}
          </div>
          <div className="relative w-full flex flex-col mb-4">
            <div className="relative w-full flex items-center">
              <IconKey className="absolute left-3 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="pl-10 pr-4 py-2 w-full rounded-md h-12 text-lg text-white"
                onChange={handleInputChange}
                value={formData.password}
              />
            </div>
            {buttonClicked && !formData.password && (
              <Message
                severity="error"
                className="text-red-600"
                text="Password is required"
              />
            )}
          </div>
          <div className="relative w-full flex flex-col mb-4">
            <div className="relative w-full flex items-center">
              <IconKey className="absolute left-3 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="pl-10 pr-4 py-2 w-full rounded-md h-12 text-lg text-white"
                onChange={handleInputChange}
                value={formData.confirmPassword}
              />
            </div>
            {buttonClicked &&
              formData.password !== formData.confirmPassword && (
                <Message
                  severity="error"
                  className="text-red-600"
                  text="Passwords do not match"
                />
              )}
          </div>
          <div className="relative w-full flex items-center mb-4">
            <p className="text-lg">Gender: </p>
            <select
              name="gender"
              className="text-lg ml-2"
              onChange={handleInputChange}
              value={formData.gender}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <Link to="/login" className="text-blue-600 mb-2 block">
            Already have an account?
          </Link>
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-blue-600 text-white text-lg"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          {loading && <p className="text-green-500 mt-2">Loading...</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
