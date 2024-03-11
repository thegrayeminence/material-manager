import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
// import Preview from "./pages/Preview/Preview";
// import Gallery from "./pages/Gallery/Gallery";
// import GalleryById from "./pages/Gallery/components/GalleryById";
// import GalleryDetailsView from "./pages/Gallery/GalleryDetailsView";
import LandingPage from "./pages/LandingPage/LandingPage";
// import LoadingPage from "./pages/LoadingPage";

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
                // element: <Preview />
                lazy: () => import("./pages/Preview/Preview"),
            },
            {
                path: '/loading/:id',
                // element: <LoadingPage />,
                lazy: () => import("./pages/LoadingPage"),
            },
            {
                path: '/gallery',
                // element: <Gallery />
                lazy: () => import("./pages/Gallery/Gallery"),
            },
            {
                path: '/gallery/:name',
                // element: <GalleryDetailsView />
                lazy: () => import("./pages/Gallery/GalleryDetailsView"),
            },
            {
                path: '/gallery_id/:id',
                // element: <GalleryById />
                lazy: () => import("./pages/Gallery/components/GalleryById"),
            }

        ]
    }
];


export default routes;