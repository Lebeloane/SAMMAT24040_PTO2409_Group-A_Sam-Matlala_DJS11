import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Favourites() {

  const [favorites, setFavorites] = useState([]);
  const [sortOrder, setSortOrder] = useState('lastAdded');

  useEffect(() => {
    const storedFavorites = localStorage.getItem('podcastFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFavorite = (podcastId, seasonNumber, episodeNumber) => {
    const updatedFavorites = favorites.filter(
      fav => !(fav.podcastId === podcastId &&
               fav.seasonNumber === seasonNumber &&
               fav.episode.episode === episodeNumber)
    );
    setFavorites(updatedFavorites);
    localStorage.setItem('podcastFavorites', JSON.stringify(updatedFavorites));
  };


  const sortedFavorites = [...favorites].sort((a, b) => {
    switch (sortOrder) {
      case 'az':
        return a.episode.title.localeCompare(b.episode.title);
      case 'za':
        return b.episode.title.localeCompare(a.episode.title);
      case 'recentlyAdded':
        return 1; 
      case 'lastAdded':
      default:
        return -1;
    }
  });

  return (
    <div className="container mx-auto p-4 select-none">
      <h1 className="text-3xl font-bold mb-6">Your
        <span className=''> Favorite
            <div className="h-1 w-50 bg-blue-500 mt-1 rounded-full"></div></span>
        <span className='text-blue-500'> Episodes</span></h1>

      {favorites.length > 0 && (
        <div className="mb-4">
          <label htmlFor="sortOrder" className="mr-2 font-medium">Sort by:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="lastAdded">Last Added</option>
            <option value="recentlyAdded">Recently Added</option>
            <option value="az">A to Z</option>
            <option value="za">Z to A</option>
          </select>
        </div>
      )}

      {favorites.length === 0 ? (
        <div className="text-center p-6 bg-gray-100 rounded-lg">
          <p className="text-xl text-gray-600">You haven't added any favorites yet.</p>
          <Link to="/podcasts" className="inline-block mt-4 bg-gray-800 hover:bg-blue-400 text-white font-medium px-4 py-2 rounded-full">
            Browse Podcasts
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedFavorites.map((fav, index) => (
            <div key={index} className="bg-white border rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold">{fav.podcastTitle}</h2>
                    <div className="text-sm text-gray-600">
                      {fav.seasonTitle} • Episode {fav.episode.episode}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFavorite(fav.podcastId, fav.seasonNumber, fav.episode.episode)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Remove from favorites"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{fav.episode.title}</h3>
                <p className="text-gray-700 mb-4">{fav.episode.description}</p>
                {fav.episode.file && (
                  <audio controls className="w-full">
                    <source src={fav.episode.file} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
                <div className="mt-4">
                  <Link
                    to={`/podcasts/${fav.podcastId}/season/${fav.seasonNumber}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Full Season
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;
