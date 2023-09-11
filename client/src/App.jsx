import { Route, Routes, Navigate } from "react-router-dom";
import Chat from "./pages/chat";
import Login from "./pages/login";
import Register from "./pages/register";
import NavBar from "./components/navbar";



function App() {


  return (
    <>
    <NavBar/>
      <Routes>
        <Route path="/" element={< Chat />} />
        <Route path="/login" element={< Login />} />
        <Route path="/register" element={< Register />} />
        {/* <Route path="/register" element={< NavBar />} /> */}
        <Route path="*" element={< Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
