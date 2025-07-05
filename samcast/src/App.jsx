import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import  Navbar  from "./Components/Navbar"
import  Footer  from "./Components/Footer"

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
