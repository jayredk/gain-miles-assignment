import * as React from "react"

import { ChakraProvider, extendTheme } from "@chakra-ui/react"

import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Text
} from "@chakra-ui/react";


const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#d9d9d9',
      },
    },
  },
});

const genderOptions = [
  {
    key: 'M',
    label: 'Male'
  },
  {
    key: 'F',
    label: 'Female'
  }
];

function App() {
  

  return (
    <ChakraProvider theme={theme}>
      <Container minH="100vh" display="flex" flexDirection="column" justifyContent="center">
        <Box as="form" maxW="686px" p="1.25rem" bgColor="white" borderRadius="4px" color="rgba(85, 85, 85, 1)">
          <Heading as="h1" mb="1.5rem" pb="4px" fontSize="1rem" fontWeight="600" borderBottom="2px solid rgba(255, 208, 0, 1)">User Data</Heading>
          <Box as="section" mb="1.25rem">
            <Heading as="h2" size="xs" mb="1.25rem">Profile Information</Heading>
            <SimpleGrid columns={{ base: 1, md: 2}} spacing={5}>
              <FormControl isRequired>
                <FormLabel mb="0.25rem" fontSize="12px">First name</FormLabel>
                <Input px="0.5rem" placeholder="First name" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel mb="0.25rem" fontSize="12px">Last Name</FormLabel>
                <Input px="0.5rem" placeholder="Last Name" />
              </FormControl>
              <FormControl>
                <FormLabel mb="0.25rem" fontSize="12px">Gender</FormLabel>
                <Select sx={{ padding: "0.5rem" }}>
                  {genderOptions.map((option) => <option key={option.key} value={option.label}>{option.label}</option>)}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel mb="0.25rem" fontSize="12px">Date of Birth</FormLabel>
                <Input px="0.5rem" type="date" />
              </FormControl>
            </SimpleGrid>
          </Box>

          <Box as="section" mb="1.25rem">
            <Heading as="h2" size="xs" mb="0.25rem">Login Information</Heading>
            <Text mb="1.25rem" fontSize="12px">Choose one login method to input  – either email address or phone number</Text>
            <SimpleGrid columns={{ base: 1, md: 2}} spacing={5}>
              <FormControl isRequired>
                <FormLabel mb="0.25rem" fontSize="12px">Email Address</FormLabel>
                <Input px="0.5rem" placeholder="Email Address" />
              </FormControl>
              <FormControl>
                <FormLabel mb="0.25rem" fontSize="12px">Phone Number</FormLabel>
                <Input px="0.5rem" placeholder="Phone Number" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel mb="0.25rem" fontSize="12px">Password</FormLabel>
                <Input px="0.5rem" placeholder="Password" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel mb="0.25rem" fontSize="12px">Confirm Password</FormLabel>
                <Input px="0.5rem" placeholder="Confirm Password" />
              </FormControl>
            </SimpleGrid>
          </Box>

          <Button bgColor="rgba(255, 208, 0, 1)" color="black" _hover={{
            backgroundColor: "rgb(250, 200, 0)"
          }}>Submit</Button>
        </Box>
      </Container>
    </ChakraProvider>
  )
}

export default App
