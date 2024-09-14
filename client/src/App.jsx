import { BrowserRouter , Routes ,Route   } from "react-router-dom";
import Navbar from "./components/Navbar";
import {Box} from "@chakra-ui/react"
import Home from "./pages/Home";
import CreatePage from "./pages/CreatePage";

function App() {

  return (
    <Box minH={"100vh"}>
      <BrowserRouter>
      <Navbar />
       <Routes>
         <Route  path="/" element={<Home />} />
         <Route  path="/createpage" element={<CreatePage />} />
       </Routes>
      </BrowserRouter>
    </Box>
      );
}

export default App
