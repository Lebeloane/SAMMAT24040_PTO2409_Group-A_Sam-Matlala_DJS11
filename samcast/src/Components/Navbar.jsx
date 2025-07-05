import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Fingerprint, Heart, PlayCircle, Menu, X } from "lucide-react";


const NAV_ITEMS = [
  { icon: Fingerprint, label: 'Home', path: '/' },
  { icon: PlayCircle, label: 'Podcasts', path: '/podcasts' },
  { icon: Heart, label: 'Favourites', path: '/favourites' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    document.body.style.overflow = isMenuOpen ? 'unset' : 'hidden';
  };

  
  const NavigationItem = ({ Icon, label, path, isMobile = false }) => (
    <NavLink
      to={path}
      onClick={isMobile ? toggleMenu : undefined}
      className={({ isActive }) =>
        `flex items-center gap-2 transition-colors duration-300 ${
          isActive ? 'text-blue-500 font-semibold' : 'text-gray-800'
        } hover:text-blue-400 ${isMobile ? 'text-2xl p-4' : 'text-lg'}`
      }
    >
      <Icon className={`${isMobile ? 'h-8 w-8' : 'h-6 w-6'}`} />
      {(isMobile || !isMobile && label === 'Home') && <span>{label}</span>}
    </NavLink>
  );

  return (
    <nav className="sticky top-0 w-full bg-white shadow-lg z-50 select-none border-b border-gray-200">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <NavLink
            to="/"
            className="items-center justify-center text-2xl font-bold text-black hover:text-blue-500 transition-colors duration-300"
          >
            <h1 className="text-3xl md:text-4xl font-bold">
                    <span className="text-black">Sam</span>
                    <span className="text-blue-500">cast</span>
                    <div className="h-1 w-16 bg-blue-500 mt-1 rounded-full"></div>
                </h1>

          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(({ icon, label, path }) => (
              <NavigationItem
                key={label}
                path={path}
                Icon={icon}
              />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-800"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden" onClick={toggleMenu}>
          {/* Mobile Navigation Menu */}
          <div
            className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl z-50 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col p-4">
              <div className="flex justify-end mb-4">
                <button
                  onClick={toggleMenu}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-800"
                  aria-label="Close Menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-col gap-4 border-t border-gray-200 pt-4">
                {NAV_ITEMS.map(({ icon, label, path }) => (
                  <NavigationItem
                    key={label}
                    label={label}
                    path={path}
                    Icon={icon}
                    isMobile={true}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
