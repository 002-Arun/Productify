import { Container, Text, SimpleGrid, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW={"container.xl"} p={12}>
      <VStack>
        <Text
          bgGradient="linear(to-l, #89F7FE, #66A6FF)" 
          bgClip="text"
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight="extrabold"
          display={"flex"}
          justifyContent={"center"}
          mb={100}
        >
          Create product 🚀
        </Text>

        {products.length === 0 ? (
          <Text
            bgClip={"text"}
            fontSize={{ base: "15px", sm: "20px" }}
            textAlign={"center"}
            color={"gray"}
          >
            Product not found 😢
            <Link to={"/createpage"}>
              <Text
                as={"span"}
                color={"blue.600"}
                _hover={{ textDecoration: "underline" }}
              >
                Create Product
              </Text>
            </Link>
          </Text>
        ) : (
          <SimpleGrid
            columns={{ base: "1", sm: "2", lg: "3" }}
            spacing="40px"
            maxW={"full"}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default Home;
