import { IconKey, IconUser } from "@tabler/icons-react";

// import { Message } from 'primereact/message';

const LoginPage = () => {
  return (
    <div className="flex flex-wrap flex-col items-center justify-center min-w-96 mx-auto text-white">
      <h1 className="text-4xl mb-4 border-b-2">Xtrach</h1>
      <div className="w-full rounded-lg shadow-md bg-clip-padding border-2 p-4">
        <h1 className="text-3xl font-semibold text-center mb-4">Login</h1>
        <div className="relative w-full flex items-center mb-4">
          <IconUser className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Username"
            className="pl-10 pr-4 py-2 w-full rounded-md h-12 text-lg text-white"
          />
          {/* <Message severity="error" text="Username is required" /> */}
        </div>
        <div className="relative w-full flex items-center mb-4">
          <IconKey className="absolute left-3 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            className="pl-10 pr-4 py-2 w-full rounded-md h-12 text-lg text-white"
          />
          {/* <Message severity="error" text="Password is required" /> */}
        </div>
        <a href="" className="text-blue-600">
          {"Don't have a accont?"}
        </a>
        <button className="w-full py-2 mt-2 rounded-md bg-blue-600 text-white text-lg">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
