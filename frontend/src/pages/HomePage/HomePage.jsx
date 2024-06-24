import {
  IconLogout,
  IconMessageCircle,
  IconSearch,
  IconSend2,
} from "@tabler/icons-react";

const HomePage = () => {
  const statusIndicatorStyle = (status) => ({
    position: "absolute",
    bottom: "0",
    right: "0",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    border: "2px solid white",
    backgroundColor: status === "online" ? "green" : "red",
  });

  return (
    <div className="flex h-screen w-5/6">
      {/* Sidebar */}
      <div className="w-1/4 bg-neutral-950 text-white p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Xtrach</h1>
          <div className="relative">
            <img
              src="path/to/profile-image.jpg"
              alt="Profile"
              className="h-8 w-8 rounded-full object-cover"
            />
            <span style={statusIndicatorStyle("online")}></span>
          </div>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search contacts"
            className="pl-4 pr-4 py-2 w-full rounded-md bg-neutral-800 text-white focus:outline-none"
          />
          <IconSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
        </div>
        <div className="flex flex-col space-y-2 overflow-y-auto flex-grow">
          {/* List of contacts */}
          {[
            { name: "John Doe", status: "online" },
            { name: "Jane Smith", status: "offline" },
            { name: "Alice Johnson", status: "online" },
          ].map((contact, index) => (
            <div
              key={index}
              className="flex items-center p-2 bg-neutral-800 rounded-md cursor-pointer hover:bg-neutral-700"
            >
              <div className="relative">
                <img
                  src={`path/to/${contact.name
                    .toLowerCase()
                    .replace(" ", "-")}-profile.jpg`}
                  alt={contact.name}
                  className="h-6 w-6 rounded-full object-cover"
                />
                <span style={statusIndicatorStyle(contact.status)}></span>
              </div>
              <span className="ml-2">{contact.name}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button className="flex items-center p-2 bg-neutral-800 rounded-md cursor-pointer hover:bg-neutral-700">
            <IconLogout className="h-6 w-6 text-neutral-400" />
            <span className="ml-2">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="w-3/4 bg-white text-black p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="relative">
              <img
                src="path/to/john-doe-profile.jpg"
                alt="John Doe"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span style={statusIndicatorStyle("online")}></span>
            </div>
            <h2 className="ml-2 text-xl font-semibold">John Doe</h2>
          </div>
          <IconMessageCircle className="h-8 w-8 text-neutral-400 cursor-pointer" />
        </div>
        <div className="flex flex-col flex-grow overflow-y-auto mb-4">
          {/* Chat messages */}
          <div className="flex flex-col space-y-2">
            <div className="flex justify-start">
              <div className="bg-neutral-200 rounded-md p-2">
                <p>Hello, how are you?</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white rounded-md p-2">
                <p>{"I'm good, thanks! How about you?"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Type a message"
            className="pl-4 pr-20 py-2 w-full rounded-full bg-neutral-200 focus:outline-none"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <IconSend2 className="h-8 w-8 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
