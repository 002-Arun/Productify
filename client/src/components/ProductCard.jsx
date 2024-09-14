import {
  Box,
  Image,
  Text,
  Stack,
  Button,
  HStack,
  useToast,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useProductStore } from "../store/product";
import { IoMdClose } from "react-icons/io";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const ProductCard = ({ product }) => {
  const [updateProduct, setUpdateProduct] = useState(product);
  const { deleteProduct, updatedProduct } = useProductStore();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleUpdate = async (pid) => {
    await updatedProduct(pid, updateProduct);
    onClose();
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="lg"
      width="100%"
    >
      <Stack align="start" spacing={4}>
        <Image
          src={product.image}
          alt={product.name}
          boxSize="300px"
          objectFit="cover"
        />
        <Text fontWeight="bold" fontSize="lg" textAlign="left" w="100%">
          {product.name}
        </Text>
        <Text fontSize="md" color="gray.500" textAlign="left" w="100%">
          ${product.price}
        </Text>
        <HStack justifyContent="flex-start" w="100%">
          <Button onClick={onOpen} colorScheme="blue">
            <FaRegEdit />
          </Button>
          <Button onClick={() => handleDelete(product._id)} colorScheme="red">
            <MdDelete />
          </Button>
        </HStack>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">Update Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                m={1.5}
                placeholder="Product Name"
                name="name"
                value={updateProduct.name}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, name: e.target.value })
                }
              />
              <Input
                m={1.5}
                placeholder="Product Price"
                name="price"
                value={updateProduct.price}
                type="number"
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, price: e.target.value })
                }
              />
              <Input
                m={1.5}
                placeholder="Image Url"
                name="image"
                value={updateProduct.image}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, image: e.target.value })
                }
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
               <IoMdClose  />
              </Button>
              <Button
                onClick={() => handleUpdate(product._id, updatedProduct)}
                variant="ghost"
              >
                Update
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Stack>
    </Box>
  );
};

export default ProductCard;
