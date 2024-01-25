import { createBrowserRouter } from "react-router-dom"

// importing routes
import { Root } from "./routes/root/root";
import { Upload } from "./routes/upload/upload";
// using React-Router
// see https://reactrouter.com/en/main for more info

// routes
const routes = [
    {
        path: "/",
        element: <Root />,
    },
    {
        path: "/upload",
        element: <Upload />,
    }
];


const router = createBrowserRouter(routes);

export { router };