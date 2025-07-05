import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Components/Loading';
import { ArrowUpDown, Calendar, Filter } from 'lucide-react';

// A mapping from genre IDs to their human-readable titles.
const genreIdToTitle = {
    1: 'Personal Growth',
    2: 'Investigative Journalism',
    3: 'History',
    4: 'Comedy',
    5: 'Entertainment',
    6: 'Business',
    7: 'Fiction',
    8: 'News',
    9: 'Kids and Family'
};

/**
 * Podcasts Component
 *
 * Displays a list of podcasts, allowing users to sort them by various criteria.
 *
 * @component
 * @param {Object} props
 * @param {Array} props.podcasts - Array of podcast data.
 * @param {boolean} props.isLoading - Loading state.
 * @param {string|null} props.error - Error message if any.
 * @returns {JSX.Element}
 */
const PodcastLists = ({ podcasts, isLoading, error }) => {
    const [sortOption, setSortOption] = useState("alphabetical");
    const [showSortDropdown, setShowSortDropdown] = useState(false);

    // Close dropdown when clicking outside or when scrolled past the dropdown
    // This effect handles the dropdown visibility and scroll behavior
    // It also ensures that the dropdown closes when clicking outside of it or when scrolling past it
    useEffect(() => {
        const handleClickOutside = () => {
            setShowSortDropdown(false);
        };

        const handleScroll = () => {
            if (showSortDropdown) {
              // Get the dropdown element
                const dropdownEl = document.querySelector('.dropdown-menu');
                if (dropdownEl) {
                    // Get the position of the last item in the dropdown
                    const dropdownRect = dropdownEl.getBoundingClientRect();
                    const lastItemBottom = dropdownRect.bottom;

                    // If we've scrolled past the bottom of the dropdown, close it
                    if (window.scrollY > lastItemBottom) {
                        setShowSortDropdown(false);
                    }
                }
            }
        };

        // Attach event listeners only if the dropdown is open
        // This prevents unnecessary event listeners when the dropdown is closed
        if (showSortDropdown) {
            document.addEventListener('click', handleClickOutside);
            window.addEventListener('scroll', handleScroll);
        }

        // Cleanup function to remove event listeners
        // This ensures that we don't leave any event listeners hanging when the component unmounts or when the dropdown is closed
        return () => {
            document.removeEventListener('click', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [showSortDropdown]);

    // Function to sort podcasts based on the selected option
    // This function takes the podcasts array and the selected sort option as arguments
    // It returns a new array of podcasts sorted according to the selected option
    // The sorting options include alphabetical, reverse-alphabetical, recently-updated, least-recently-updated, and genre-based filters
    const sortPodcasts = (podcasts, option) => {
        const sorted = [...podcasts]; // Make a copy to avoid mutating props
        if (option === 'alphabetical') {
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        } else if (option === 'reverse-alphabetical') {
            return sorted.sort((a, b) => b.title.localeCompare(a.title));
        } else if (option === 'recently-updated') {
            return sorted.sort((a, b) => new Date(b.updated) - new Date(a.updated));
        } else if (option === 'least-recently-updated') {
            return sorted.sort((a, b) => new Date(a.updated) - new Date(b.updated));
        } else if (option.startsWith('genre-')) {
            const genreId = {
                'genre-personal-growth': 1,
                'genre-investigative-journalism': 2,
                'genre-history': 3,
                'genre-comedy': 4,
                'genre-entertainment': 5,
                'genre-business': 6,
                'genre-fiction': 7,
                'genre-news': 8,
                'genre-kids-and-family': 9
            }[option];

            return sorted.filter(podcast =>
                (Array.isArray(podcast.genres) && podcast.genres.includes(genreId)) ||
                podcast.genre === genreId
            );
        }
        return sorted;
    };

    // Function to handle sort option changes
    // This function takes the selected value as an argument and updates the sortOption state
    const handleSortChange = (value) => {
        setSortOption(value);
        setShowSortDropdown(false);
    };

    // Function to toggle the visibility of the sort dropdown
    // This function takes the event as an argument and toggles the showSortDropdown state
    const toggleSortDropdown = (e) => {
        e.stopPropagation(); // Prevent click from propagating
        setShowSortDropdown(!showSortDropdown); // Toggle dropdown visibility
    };

    // Function to get the genre name from the sort option
    // This function takes the selected option as an argument and returns the corresponding genre name
    const getGenreNameFromSortOption = (option) => {
        const genreMap = {
            'genre-personal-growth': 'Personal Growth',
            'genre-investigative-journalism': 'Investigative Journalism',
            'genre-history': 'History',
            'genre-comedy': 'Comedy',
            'genre-entertainment': 'Entertainment',
            'genre-business': 'Business',
            'genre-fiction': 'Fiction',
            'genre-news': 'News',
            'genre-kids-and-family': 'Kids and Family'
        };

        return genreMap[option] || '';
    };

    // Show error message if there's an error
    // This function checks if there's an error and returns an error message if true
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <p className="text-red-500 text-lg">Error: {error}</p>
            </div>
        );
    }

    // Show loading state if podcasts are still being fetched
    // This function checks if the loading state is true and returns a loading spinner if true
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <Loading />
            </div>
        );
    }

    // sortedPodcasts is a variable that holds the sorted podcasts based on the selected sort option
    // This function calls the sortPodcasts function with the podcasts array and the selected sort option
    const sortedPodcasts = sortPodcasts(podcasts, sortOption);

    return (
        <div className="bg-white text-black container mx-auto max-w-6xl px-4 py-8 pb-16 select-none">
            <div className="flex flex-row justify-between items-start md:items-center mb-6 gap-3">
                <h1 className="text-3xl md:text-4xl font-bold">
                    <span className="text-black">Pod</span>
                    <span className="text-blue-500">casts</span>
                    <div className="h-1 w-16 bg-blue-500 mt-1 rounded-full"></div>
                </h1>

                {/* Sort Dropdown */}
                <div className="relative z-20">
                    <button
                        onClick={toggleSortDropdown}
                        className="flex items-center gap-2 bg-white text-black px-3 py-1.5 rounded-md border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors duration-300 text-sm"
                    >
                        <Filter size={14} className="text-blue-500" />
                        <span className="font-medium">Sort & Filter</span>
                        <ArrowUpDown size={14} className="text-gray-500" />
                    </button>

                    {/* Backdrop to capture clicks outside the dropdown */}
                    {showSortDropdown && (
                        <>
                            <div
                                className="fixed inset-0 bg-transparent z-40"
                                onClick={() => setShowSortDropdown(false)}
                                aria-hidden="true"
                            ></div>

                            <div
                                className="absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-md overflow-hidden z-50 dropdown-menu"
                                onClick={(e) => e.stopPropagation()}
                            >
                <div className="px-3 py-1.5 border-b border-gray-100 bg-gray-50 text-xs font-medium text-gray-600 flex items-center justify-between">
                                    <span>Sort & Filter options</span>
                                    {sortOption.startsWith('genre') && (
                                        <button
                                            onClick={() => handleSortChange('alphabetical')}
                                            className="text-blue-500 hover:text-blue-600 text-xs font-medium"
                                        >
                                            Clear filter
                                        </button>
                                    )}
                                </div>
                                <div className="py-1">
                                    <div className="px-3 py-1 text-xs text-gray-400 font-medium">Order</div>
                                    {[
                                        { value: 'alphabetical', label: 'Alphabetical (A-Z)' },
                                        { value: 'reverse-alphabetical', label: 'Reverse Alphabetical (Z-A)' },
                                        { value: 'recently-updated', label: 'Recently Updated' },
                                        { value: 'least-recently-updated', label: 'Least Recently Updated' }
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => handleSortChange(option.value)}
                                            className={`w-full text-left px-3 py-1.5 text-xs transition-colors duration-200 ${
                                                sortOption === option.value
                                                    ? 'bg-blue-50 text-blue-500 font-medium'
                                                    : 'hover:bg-gray-50 text-gray-700'
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}

                                    <div className="mt-1 border-t border-gray-100"></div>
                                    <div className="px-3 py-1 text-xs text-gray-400 font-medium">Genres</div>
                                    {[
                                        { value: 'genre-personal-growth', label: 'Personal Growth', icon: '🧠' },
                                        { value: 'genre-investigative-journalism', label: 'Investigative Journalism', icon: '🔍' },
                                        { value: 'genre-history', label: 'History', icon: '📜' },
                                        { value: 'genre-comedy', label: 'Comedy', icon: '😂' },
                                        { value: 'genre-entertainment', label: 'Entertainment', icon: '🎭' },
                                        { value: 'genre-business', label: 'Business', icon: '💼' },
                                        { value: 'genre-fiction', label: 'Fiction', icon: '📚' },
                                        { value: 'genre-news', label: 'News', icon: '📰' },
                                        { value: 'genre-kids-and-family', label: 'Kids and Family', icon: '👨‍👩‍👧‍👦' }
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => handleSortChange(option.value)}
                                            className={`w-full text-left px-3 py-1.5 text-xs transition-colors duration-200 ${
                                                sortOption === option.value
                                                    ? 'bg-blue-50 text-blue-500 font-medium'
                                                    : 'hover:bg-gray-50 text-gray-700'
                                            }`}
                                        >
                                            <span className="mr-1">{option.icon}</span> {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Sort indicator */}
            <div className="flex items-center gap-1 mb-6 text-xs text-gray-500">
                <Calendar size={12} className="text-blue-400" />
                <span>
                    {sortOption.startsWith('genre')
                        ? `Filtered by: ${getGenreNameFromSortOption(sortOption)}`
                        : `Sorted by: ${sortOption === 'alphabetical'
                            ? 'A to Z'
                            : sortOption === 'reverse-alphabetical'
                            ? 'Z to A'
                            : sortOption === 'recently-updated'
                            ? 'Most recent'
                            : 'Oldest first'}`
                    }
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
                {sortedPodcasts.map(podcast => (
                    <Link
                        to={`/podcasts/${podcast.id}`}
                        key={podcast.id}
                        className="group relative rounded-xl shadow-md bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
                    >
                        {/* Hover overlay effect */}
                        <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>

                        <div className="relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                            <img
                                src={podcast.image}
                                alt={podcast.title}
                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* Updated badge */}
                            {podcast.updated && (
                                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full z-10 shadow-md opacity-80">
                                    {new Date(podcast.updated).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                </div>
                            )}
                        </div>

                        <div className="p-4 flex-grow flex flex-col">
                            <h3 className="text-lg font-bold text-black mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                {podcast.title}
                            </h3>

                            {/* Genres */}
                            <div className="flex flex-wrap gap-1 mb-3">
                                {Array.isArray(podcast.genres) && podcast.genres.length > 0 ? (
                                    podcast.genres.slice(0, 3).map((genre, index) => (
                                        <span
                                            key={index}
                                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                                        >
                                            {genreIdToTitle[genre] || genre}
                                        </span>
                                    ))
                                ) : podcast.genre ? (
                                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                        {genreIdToTitle[podcast.genre] || podcast.genre}
                                    </span>
                                ) : null}

                                {/* If there are more genres than shown */}
                                {Array.isArray(podcast.genres) && podcast.genres.length > 3 && (
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                        +{podcast.genres.length - 3} more
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Bottom decorative bar */}
                        <div className="h-1 w-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PodcastLists;
