import axios from "axios";
import { UserContextProvider } from "./userContext";
import Routes from "./routes";
import Register from "./register";

export default function App() {
  // !new
  axios.defaults.baseURL = "http://localhost:8000";
  axios.defaults.withCredentials = true;

  return (
    // <UserContextProvider>
    //   <Routes />
    // </UserContextProvider>
    <Register></Register>
  );
}
