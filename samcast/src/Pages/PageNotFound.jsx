import { Link } from "react-router-dom"
import { Home, HomeIcon } from "lucide-react"



/**
 * NotFound Component
 *
 * This component renders a "404 Page Not Found" error page.
 * It includes a large"404" display, a text box indicating the page is not found, and a button to navigate back to the homepage.
 *
 * @returns {JSX.Element}
 */

const PageNotFound = () => {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center select-none">
            <h1 className="text-8xl font-bold text-blue-400">404</h1>
            <div className="absolute text-red-400 animate-pulse text-5xl rounded px-2">
                Page Not Found
            </div>
            <button className="mt-5">
                <Link
                    to='/'
                    className="group relative inline-block focus:outline-none focus:ring"
                >
                    <div className="relative mt-2 inline-block px-4 group-active:text-opacity-75 group">
                        <button className="flex font-bold border-1 bg-gray-800 text-white px-2 rounded-full py-2 hover:text-blue-300 items-center gap-2">
                            Home
                        </button>
                    </div>
                </Link>
            </button>
        </div>
    )
}

export default PageNotFound;
