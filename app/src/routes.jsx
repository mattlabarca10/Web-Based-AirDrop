import { createBrowserRouter } from "react-router-dom"

// importing routes
import { Root } from "./routes/root/root";

// using React-Router
// see https://reactrouter.com/en/main for more info

// routes
const routes = [
    {
        path: "/",
        element: <Root />,
    },
    {
        path: "/s",
        element: <h2>hello</h2>,
    },
];


const router = createBrowserRouter(routes);

export { router };