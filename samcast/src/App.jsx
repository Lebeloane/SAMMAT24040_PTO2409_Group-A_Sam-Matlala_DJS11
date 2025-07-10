import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"


import  Layout from "./Layout/Layout"
import Home from "./Pages/Home"
import Loading from "./Components/Loading"
import PodcastLists from "./Pages/PodcastLists"
import PodcastDetails from "./Components/PodcastDetails"

/**
 * App Component
 *
 * This is the main component of the application. It sets up the routing for the application using React Router.
 * It includes a Navbar, Footer, and different routes for Home, Podcasts, Podcast Details, Favourites, and a 404 Page Not Found.
 *
 * @returns {JSX.Element}
 */
function App() {
  // State for storing podcastPreview data
  const [podcasts, setPodcasts] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for storing podcastDetails data
  const [podcastDetails, setPodcastDetails] = useState({});

  /**
   * Base URL for the podcast Api
   * @constant {string}
   */
  const URL = 'https://podcast-api.netlify.app/'

  // Fetching podcast data from the API
  /**
   * useEffect hook to fetch podcast data from the API when the component mounts.
   * It sets the podcasts state with the fetched data and handles loading and error states.
   */
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

  /**
   * Function to fetch podcast details by ID
   * @param {string} id - The ID of the podcast to fetch details for
   * @returns {Promise<void>}
   */
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

  // when the podcastDetails is empty and isloading is false, it means that there was an error fetching the data
  if(error){
    return <div className="text-red-500 text-3xl text-center">Error: {error}</div>
  }

  // when the podcasts is empty and isloading is true, it means that the data is still being fetched
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
