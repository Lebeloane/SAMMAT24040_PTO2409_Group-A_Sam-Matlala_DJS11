import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from './Loading';

/**
 * PodcastDetails Component
 *
 * This component displays detailed information about a specific podcast.
 * It uses the ID from the URL parameters to fetch the podcast details.
 *
 * @param {Object} props - Component props
 * @param {Function} props.fetchPodcastDetails - Function to fetch podcast details by ID
 * @param {Object} props.podcastDetails - Object containing podcast details
 * @param {boolean} props.isloading - Loading state indicator
 * @param {string|null} props.error - Error message if any
 * @returns {JSX.Element}
 */
function PodcastDetails({ fetchPodcastDetails, podcastDetails, error }) {
  // Get the podcast ID from the URL parameters
  const { id } = useParams();

  // Fetch podcast details when the component mounts or the ID changes
  // This effect will run when the component mounts and whenever the id changes.
  useEffect(() => {
    if (id) {
      fetchPodcastDetails(id);
    }
  }, [id, fetchPodcastDetails]);


  // Show error message if there's an error
  if (error) {
    return <div className="text-red-500 text-3xl text-center">Error: {error}</div>;
  }

  // Show a message if no podcast details are available
  if (!podcastDetails || !podcastDetails.title) {
    return <Loading />;
  }


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end">
        {/* Back Button */}
        <Link to="/podcasts">
          <button className="bg-gray-800 hover:bg-blue-600 p-1 rounded-full text-white font-medium">
            Back
          </button>
        </Link>
      </div>

      {/* Podcast Image */}
      <div className="my-4">
        {podcastDetails.image && (
          <img
            src={podcastDetails.image}
            alt={podcastDetails.title}
            className="w-full max-h-64 object-cover rounded"
          />
        )}
      </div>

      {/* Podcast Title and Description */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{podcastDetails.title}</h1>
        <p className="mt-2 leading-7">{podcastDetails.description}</p>
      </div>

      {/* Season Selection */}
      <div className="flex mb-4 flex-wrap gap-5">
        {podcastDetails.seasons && podcastDetails.seasons.map((season) => (
          <Link key={season.season} to={`/podcasts/${id}/season/${season.season}`}>
            <button className="mr-2 p-2 rounded bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white">
              {season.title}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PodcastDetails;
