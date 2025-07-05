import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import  Layout from "./Layout/Layout"
import Home from "./Pages/Home"


function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Layout /> }>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
