import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import About from "./pages/About"
import Preview from "./pages/Preview";
import Gallery from "./pages/Gallery";
import LandingPage from "./pages/LandingPage";
import LoadingPage from "./pages/LoadingPage";

const routes = [
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <LandingPage />
            },
            {
                path: '/preview',
                element: <Preview />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/loading-textures',
                element: <LoadingPage />,
            },
            {
                path: '/gallery',
                element: <Gallery />
            }
        ]
    }
];


export default routes;