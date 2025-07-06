import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"


import  Layout from "./Layout/Layout"
import Home from "./Pages/Home"
import Loading from "./Components/Loading"
import PodcastLists from "./Pages/PodcastLists"
import PodcastDetails from "./Components/PodcastDetails"



function App() {

  const [podcasts, setPodcasts] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [podcastDetails, setPodcastDetails] = useState({});

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

  const fetchPodcastDetails = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${URL}id/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch podcast details');
      }
      const data = await response.json();
      setPodcastDetails(data);
    } catch (error) {
      console.error('Error fetching podcast details:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
          <Route path="/podcasts/:id" element={
            <PodcastDetails
              fetchPodcastDetails={fetchPodcastDetails}
              podcastDetails={podcastDetails}
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
