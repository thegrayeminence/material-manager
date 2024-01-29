import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Preview from "./pages/Preview/Preview";
import Gallery from "./pages/Gallery/Gallery";
import GalleryById from "./pages/Gallery/GalleryById";
import LandingPage from "./pages/LandingPage/LandingPage";
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
                path: '/loading-textures',
                element: <LoadingPage />,
            },
            {
                path: '/gallery',
                element: <Gallery />
            },
            {
                path: '/gallery_id/:id',
                element: <GalleryById />
            },

        ]
    }
];


export default routes;