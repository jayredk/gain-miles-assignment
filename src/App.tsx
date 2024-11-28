import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import UserRegisterForm from "./components/UserRegisterForm/UserRegistrationForm";

import { Container } from "@chakra-ui/react";


const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#d9d9d9',
      },
    },
  },
});


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container minH="100vh" display="flex" flexDirection="column" justifyContent="center">
        <UserRegisterForm />
      </Container>
    </ChakraProvider>
  )
}

export default App
