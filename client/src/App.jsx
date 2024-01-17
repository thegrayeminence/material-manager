import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider, useQuery} from 'react-query'

import routes from './routes';

export default function App() {


  const router = createBrowserRouter(routes);
  const queryClient = new QueryClient()

  return (

    <div className="App">
      {/* <QueryClientProvider client={queryClient}> */}
      <RouterProvider
        router={router}
      />
      {/* </QueryClientProvider> */}

    </div>

  );
}