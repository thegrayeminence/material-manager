import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from 'react-query'

import routes from './routes';

export default function App() {


  const router = createBrowserRouter(routes);
  const queryClient = new QueryClient()

  return (

    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={router}
          fallbackElement={<div>Loading...</div>}
        />
      </QueryClientProvider>

    </div>

  );
}