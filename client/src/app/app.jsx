import Register from "./register";
import { useContext } from "react";
import { UserContext } from "./page";

const App = () => {
  const { username, id } = useContext(UserContext);
  if (username) {
    return "logged in";
  }

  return <Register />;
};

export default App;
