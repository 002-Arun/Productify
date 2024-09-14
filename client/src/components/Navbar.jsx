import React from "react";
import {
  Flex,
  Container,
  Text,
  HStack,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaRegPlusSquare, FaMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={1600} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }} // Fix the typo here
      >
        <Text
        bgGradient="linear(to-l, #89F7FE, #66A6FF)" 
          bgClip="text"
          fontSize={{ base: "22px", sm: "28px" }} // Ensure px or proper size unit
          fontWeight="extrabold"
        >
          <Link to={"/"}>Product store 🛒</Link>
        </Text>

        <HStack spacing="10px">
          <Link to={"/createpage"}>
            <Button w="40px" h="40px" bg="gray.500" size={7}>
              <FaRegPlusSquare />
            </Button>
          </Link>
          <Button
            w="40px"
            h="40px"
            bg="gray.500"
            onClick={toggleColorMode}
            size={7}
          >
            {colorMode === "light" ? (
              <FaMoon color="black" />
            ) : (
              <IoMdSunny color="yellow" />
            )}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
