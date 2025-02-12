import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import Footer from "./components/Footer";

function App() {
 
  return (
<>
    <Routes>
      <Route path="/" element={<HomePage/>}> </Route>
      <Route path="/login" element={<LoginPage/>}> </Route>
      <Route path="/signup" element={<SignUpPage/>}> </Route>
    </Routes>
   <Footer />
</>
  );

}

export default App;
