import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import "./App.css";
import { ChannelListContainer, ChannelContainer, Auth } from "./components";
const apiKey = process.env.REACT_APP_STREAM_API_KEY;
const cookies = new Cookies();
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

const App = () => {
  if (authToken) {
    client.connectUser(
      {
        id: cookies.get("userId"),
        name: cookies.get("username"),
        fullName: cookies.get("fullName"),
        image: cookies.get("avatarURL"),
        hashedPassword: cookies.get("hashedPassword"),
        phoneNumber: cookies.get("phoneNumber"),
      },
      authToken
    );
  }
  if (!authToken) return <Auth />;
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
};

export default App;
