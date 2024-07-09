import RegisterAndLogin from "./register&login";
import { useContext } from "react";
import { UserContext } from "./page";
import Chat from "./chat";

const App = () => {
  const { username, id } = useContext(UserContext);
  if (username) {
    return <Chat />;
  }

  return <RegisterAndLogin />;
};

export default App;
