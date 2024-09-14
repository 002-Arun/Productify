import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product";
import { useToast } from "@chakra-ui/react";

const CreatePage = () => {
  const [newProduct, setNewproduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const toast = useToast();
  const { createProduct } = useProductStore();
  const addNewProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Product  created.",
        description: "We've created your product for you.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setNewproduct({ name: "", price: "", image: "" });
    }
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8} pt={70}>
        <Heading>Create your product</Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray-600")}
          rounded={"lg"}
          textAlign={"center"}
          p={8}
          shadow={"lg"}
        >
          <VStack spacing={"4"}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewproduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Product Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewproduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder=" Image Url"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewproduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button w={"full"} colorScheme="blue" onClick={addNewProduct}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
