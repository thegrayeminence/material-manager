import { Heading, Spacer, Box, Text, CircularProgress} from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";


const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <Box mt={'10rem'} fontSize={'2xl'} textAlign={'center'} id="error-page">
          
          <Heading>Oops!</Heading>

          <Text>Sorry, an unexpected error has occurred.</Text>
          <Spacer p={'1rem'}/>

          <CircularProgress isIndeterminate size='5rem' color='green.300' />
          <Spacer p={'.5rem'}/>

          <Text>
            <i>{error.statusText || error.message}</i>
          </Text>
          
        </Box>
      );
    }

export default ErrorPage