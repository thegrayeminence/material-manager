import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import About from "./pages/About"
import Preview from "./pages/Preview";
import Rename from "./pages/Rename";
import LandingPage from "./pages/LandingPage";

const routes = [
    {
        path:'/',
        element:<Home />,
        errorElement: <ErrorPage />,
        children: [
            {
                path:'/',
                element:<LandingPage />
            },
            {
                path:'/preview',
                element:<Preview />
            },
            {
                path:'/about',
                element:<About />
            },
            {
                path:'/rename',
                element:<Rename />
            }
        ]
    }
];


export default routes;