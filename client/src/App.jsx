import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from 'react-query'
import {Fallback} from './pages/Fallback';
import routes from './routes';
import {Spinner} from '@chakra-ui/react';

export default function App() {


  const router = createBrowserRouter(routes);
  const queryClient = new QueryClient()

  return (

    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={router}
          fallbackElement={<Fallback />}
        />
      </QueryClientProvider>

    </div>

  );
}