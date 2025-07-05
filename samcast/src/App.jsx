import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import  Layout from "./Layout/Layout"


function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Layout /> }>
          <Route path="/" element={<h1>hello</h1>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
