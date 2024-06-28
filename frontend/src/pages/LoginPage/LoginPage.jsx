import { IconUser, IconKey } from "@tabler/icons-react";
import { Message } from "primereact/message";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import useLogin from "../../hooks/useLogin";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { loading, login } = useLogin();
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonClicked(true);

    if (!formData.username || !formData.password) {
      toast.error("Both fields are required");
      return;
    }

    await login(formData.username, formData.password);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-wrap flex-col items-center justify-center min-w-96 mx-auto text-white">
      <h1 className="text-4xl mb-4 border-b-2">Xtrach</h1>
      <div className="w-full rounded-lg shadow-md bg-clip-padding border-2 p-4">
        <h1 className="text-3xl font-semibold text-center mb-4">Log In</h1>
        <form onSubmit={handleSubmit}>
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
              <Message severity="error" text="Username is required" />
            )}
          </div>
          <div className="relative w-full flex flex-col mb-4">
            <IconKey className="absolute left-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="pl-10 pr-4 py-2 w-full rounded-md h-12 text-lg text-white"
              onChange={handleInputChange}
              value={formData.password}
            />
            {buttonClicked && !formData.password && (
              <Message severity="error" text="Password is required" />
            )}
          </div>
          <Link to="/signup" className="text-blue-600 mb-2 block">
            {"Don't have an account?"}
          </Link>
          <button
            type="submit"
            className="py-2 w-full rounded-md text-lg text-white bg-blue-500 hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner"></span> : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
