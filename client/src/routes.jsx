import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Preview from "./pages/Preview/Preview";
import Gallery from "./pages/Gallery/Gallery";
import GalleryById from "./pages/Gallery/components/GalleryById";
import GalleryDetailsView from "./pages/Gallery/GalleryDetailsView";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoadingPage from "./pages/LoadingPage";
import Test from "./pages/Test";

const routes = [
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
        children: [
            {
                // path: '/',
                index: true,
                element: <LandingPage />
            },
            {
                path: '/preview',
                element: <Preview />
            },
            {
                path: '/loading/:id',
                element: <LoadingPage />,
            },
            {
                path: '/gallery',
                element: <Gallery />
            },
            {
                path: '/gallery/:name',
                element: <GalleryDetailsView />
            },
            {
                path: '/gallery_id/:id',
                element: <GalleryById />
            },
            {
                path: '/test',
                element: <Test />
            },

        ]
    }
];


export default routes;