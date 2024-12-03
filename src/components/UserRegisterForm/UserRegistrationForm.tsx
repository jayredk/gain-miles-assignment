import { useState } from 'react'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Text
} from "@chakra-ui/react";

import { useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormData, userSchema } from "./schema";

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

interface FormFieldProps {
  name: string;
  label: string;
  placeholder: string;
  isRequired?: boolean;
  register: UseFormRegister<any>;
  error?: any;
}

function FormField({
  name,
  label,
  placeholder,
  register,
  error,
  isRequired = false
}: FormFieldProps) {
  return (
    <FormControl isRequired={isRequired} isInvalid={!!error}>
      <FormLabel mb="0.25rem" fontSize="12px">{label}</FormLabel>
      <Input px="0.5rem" placeholder={placeholder} {...register(name)} />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}


export default function UserRegisterForm() {
  const [submitResult, setSubmitResult] = useState<UserFormData | null>(null);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      gender: "M",
    },
  });

  const getCurrentDate = () => {
    const today = new Date();

    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };


  const onSubmit = (data: UserFormData) => setSubmitResult(data);
  
  return (
    <Box
      as="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      maxW="686px"
      my="3rem"
      p="1.25rem"
      bgColor="white"
      borderRadius="4px"
      color="rgba(85, 85, 85, 1)"
    >
      {submitResult && (
        <Alert
          status="success"
          mb={6}
          rounded="md"
        >
          <AlertIcon />
          <Box>
            <AlertTitle>Form submitted successfully!</AlertTitle>
            <AlertDescription>
              <Box as="pre" mt={2} fontSize="sm" whiteSpace="pre-wrap">
                {JSON.stringify(submitResult, null, 2)}
              </Box>
            </AlertDescription>
          </Box>
        </Alert>
      )}

      <Heading as="h1" mb="1.5rem" pb="4px" fontSize="1rem" fontWeight="600" borderBottom="2px solid rgba(255, 208, 0, 1)">User Data</Heading>
      <Box as="section" mb="1.25rem">
        <Heading as="h2" size="xs" mb="1.25rem">Profile Information</Heading>
        <SimpleGrid columns={{ base: 1, md: 2}} spacing={5}>
          <FormField name="firstName" label="First name" register={register} isRequired={true} error={errors.firstName} placeholder="First Name" />
          <FormField name="lastName" label="Last name"  register={register} isRequired={true} error={errors.lastName} placeholder="Last Name" />

          <FormControl isInvalid={!!errors.gender}>
            <FormLabel mb="0.25rem" fontSize="12px">Gender</FormLabel>
            <Select sx={{ padding: "0.5rem" }} {...register("gender")}>
              {genderOptions.map((option) => <option key={option.key} value={option.key}>{option.label}</option>)}
            </Select>
            <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.dateOfBirth}>
            <FormLabel mb="0.25rem" fontSize="12px">Date of Birth</FormLabel>
            <Input
              px="0.5rem"
              type="date"
              max={getCurrentDate()}
              {...register("dateOfBirth")}
            />
            <FormErrorMessage>{errors.dateOfBirth?.message}</FormErrorMessage>
          </FormControl>
        </SimpleGrid>
      </Box>

      <Box as="section" mb="1.25rem">
        <Heading as="h2" size="xs" mb="0.25rem">Login Information</Heading>
        <Text mb="1.25rem" fontSize="12px">Choose one login method to input  – either email address or phone number</Text>
        <SimpleGrid columns={{ base: 1, md: 2}} spacing={5}>
          <FormField name="email" label="Email Address"  register={register} isRequired={false} error={errors.email} placeholder="Email Address" />
          <FormField name="phone" label="Phone Number" register={register} isRequired={false} error={errors.phone} placeholder="Phone Number" />
          <FormField name="password" label="Password"  register={register} isRequired={true} error={errors.password} placeholder="Password" />
          <FormField name="confirmPassword" label={"Confirm Password"} register={register} isRequired={true} error={errors.confirmPassword} placeholder="Confirm Password" />
        </SimpleGrid>
      </Box>

      <Button type="submit" w={{ base: "100%", lg: "auto"}} bgColor="rgba(255, 208, 0, 1)" color="black" _hover={{
        backgroundColor: "rgb(250, 200, 0)"
      }}>Submit</Button>
    </Box>
  )
}
