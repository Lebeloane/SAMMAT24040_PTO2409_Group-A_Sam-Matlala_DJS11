import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import  Layout from "./Layout/Layout"
import Home from "./Pages/Home"
import Loading from "./Components/Loading"
import PodcastLists from "./Pages/PodcastLists"

import { useState, useEffect } from "react"


function App() {

  const [podcasts, setPodcasts] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const URL = 'https://podcast-api.netlify.app/'

  useEffect(() => {
    const fetchPodcastPreview = async () => {
      try {
        const response = await fetch(`${URL}`);
        if (!response.ok) {
          throw new Error('Failed to fetch podcasts');
        }
        const data = await response.json();
        setPodcasts(data);
      } catch (error) {
        console.error('Error fetching podcasts:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcastPreview();
  },[]);

  if(error){
    return <div className="text-red-500 text-3xl text-center">Error: {error}</div>
  }

  if(isloading && podcasts.length === 0){
    return <Loading />
  }

  return (
    <Router>
      <Routes>
        <Route element={<Layout /> }>
          <Route path="/" element={<Home />} />
          <Route path="/podcasts" element={
            <PodcastLists
              podcasts={podcasts}
              isloading={isloading}
              error={error}
            />}
          />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
