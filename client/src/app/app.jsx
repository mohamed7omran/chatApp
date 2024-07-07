import RegisterAndLogin from "./register&login";
import { useContext } from "react";
import { UserContext } from "./page";

const App = () => {
  const { username, id } = useContext(UserContext);
  if (username) {
    return "logged in  " + "username : " + username + " id : " + id;
  }

  return <RegisterAndLogin />;
};

export default App;
