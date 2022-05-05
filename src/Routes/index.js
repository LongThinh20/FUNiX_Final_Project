import { useSelector } from "react-redux";
import Home from "../Screens/User/Home";

const USERS = useSelector((state) => state.users.users);

const routeHome = [
  {
    exact: true,
    path: "/",
    Component: () => <Home />
  },
  {
    exact: true,
    path: "/",
    Component: () => <Home />
  }
];

export { routeHome };
