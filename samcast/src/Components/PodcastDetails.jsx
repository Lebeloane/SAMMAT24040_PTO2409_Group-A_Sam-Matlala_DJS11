import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from './Loading';


function PodcastDetails({ fetchPodcastDetails, podcastDetails, error }) {

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchPodcastDetails(id);
    }
  }, [id, fetchPodcastDetails]);



  if (error) {
    return <div className="text-red-500 text-3xl text-center">Error: {error}</div>;
  }


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
