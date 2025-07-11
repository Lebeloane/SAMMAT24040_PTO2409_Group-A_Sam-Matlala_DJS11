import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from './Loading';

/**
 * SeasonDetails Component
 *
 * This component displays the episodes of a specific season for a podcast.
 * It uses the podcast ID and season number from the URL parameters.
 *
 * @param {Object} props - Component props
 * @param {Object} props.podcastDetails - Object containing podcast details
 * @param {boolean} props.isloading - Loading state indicator
 * @param {string|null} props.error - Error message if any
 * @returns {JSX.Element}
 */
function SeasonDetails({ podcastDetails, isloading, error }) {
  // Get the podcast ID and season number from the URL parameters
  const { id, seasonNumber } = useParams();

  // Convert seasonNumber from string to number
  const seasonNum = parseInt(seasonNumber, 10);

  // State for favorites
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on component mount
  // This effect will run when the component mounts.
  // It retrieves the favorites from localStorage and sets them in the state.
  useEffect(() => {
    const storedFavorites = localStorage.getItem('podcastFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Toggle favorite status of an episode
  // This function is called when the user clicks the favorite button for an episode.
    // It checks if the episode is already in favorites and either adds or removes it accordingly.
  const toggleFavorite = (episode) => {
    const favoriteItem = {
      podcastId: id,
      podcastTitle: podcastDetails.title,
      seasonNumber: seasonNum,
      seasonTitle: selectedSeason.title,
      episode: episode
    };

    // Check if this episode is already in favorites
    // This checks if the episode is already in the favorites list.
    // If it is, we remove it; if not, we add it.
    const existingIndex = favorites.findIndex(fav =>
      fav.podcastId === id &&
      fav.seasonNumber === seasonNum &&
      fav.episode.episode === episode.episode
    );

    let updatedFavorites;
    if (existingIndex >= 0) {
      // Remove from favorites
      updatedFavorites = favorites.filter((_, index) => index !== existingIndex);
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, favoriteItem];
    }

    // Update state and localStorage
    setFavorites(updatedFavorites);
    localStorage.setItem('podcastFavorites', JSON.stringify(updatedFavorites));
  };

  // Check if an episode is in favorites
  // This function checks if a specific episode is already marked as favorite.
  // It returns true if the episode is in the favorites list, otherwise false.
  const isEpisodeFavorite = (episode) => {
    return favorites.some(fav =>
      fav.podcastId === id &&
      fav.seasonNumber === seasonNum &&
      fav.episode.episode === episode.episode
    );
  };

  // Show loading state
  if (isloading) {
    return <Loading />;
  }

  // Show error message if there's an error
  if (error) {
    return <div className="text-red-500 text-3xl text-center">Error: {error}</div>;
  }

  // Check if podcast details are available
  if (!podcastDetails || !podcastDetails.title) {
    return <div className="text-xl text-center p-8">No podcast details available</div>;
  }

  // Find the selected season
  const selectedSeason = podcastDetails.seasons?.find(season => season.season === seasonNum);

  // If season not found
  // This checks if the selected season exists in the podcast details.
  if (!selectedSeason) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-xl text-center p-8">Season not found</div>
        <div className="flex justify-center mt-4">
          <Link to={`/podcasts/${id}`}>
            <button className="bg-gray-600 hover:bg-blue-600 p-2 rounded-md text-white font-medium">
              Back to Podcast
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        {/* Back Button */}
        <Link to={`/podcasts/${id}`}>
          <button className="bg-gray-800 hover:bg-blue-600 p-1 rounded-full text-white font-medium">
            Back
          </button>
        </Link>

        {/* Podcast Title */}
        <h2 className="text-xl font-bold">{podcastDetails.title}</h2>
      </div>

      {/* Season Info */}
      <div className="md:flex gap-6 mb-6">
        {/* Season Image */}
        <div className="md:w-1/3 mb-4 md:mb-0">
          {selectedSeason.image ? (
            <img
              src={selectedSeason.image}
              alt={`${selectedSeason.title} cover`}
              className="w-full rounded-lg shadow-lg"
            />
          ) : podcastDetails.image ? (
            <img
              src={podcastDetails.image}
              alt={`${podcastDetails.title} cover`}
              className="w-full rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>

        {/* Season Description */}
        <div className="md:w-2/3">
          <h1 className="text-2xl font-bold mb-2">{selectedSeason.title}</h1>
          <p className="text-gray-700">{selectedSeason.description}</p>
        </div>
      </div>

      {/* Episodes List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Episodes</h3>

        {selectedSeason.episodes && selectedSeason.episodes.length > 0 ? (
          selectedSeason.episodes.map((episode) => (
            <div key={episode.episode} className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold">
                  Episode {episode.episode}: {episode.title}
                </h4>
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(episode)}
                  className="focus:outline-none"
                  aria-label={isEpisodeFavorite(episode) ? "Remove from favorites" : "Add to favorites"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={isEpisodeFavorite(episode) ? "currentColor" : "none"}
                    stroke="currentColor"
                    className={`w-6 h-6 ${isEpisodeFavorite(episode) ? 'text-red-500' : 'text-gray-400'}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-gray-700 mb-3">{episode.description}</p>
              {episode.file && (
                <div className="mt-2">
                  <audio controls className="w-full">
                    <source src={episode.file} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center p-4">No episodes available for this season</div>
        )}
      </div>
    </div>
  );
}

export default SeasonDetails;
