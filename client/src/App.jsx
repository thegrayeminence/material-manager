import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from './routes';

export default function App() {


  const router = createBrowserRouter(routes);

  return (

    <div className="App">

      <RouterProvider
        router={router}
      />
    </div>

  );
}