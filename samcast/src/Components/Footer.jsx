import { Link } from 'react-router-dom';
import { Linkedin, Github, Mail } from 'lucide-react';

/**
 * Footer Component
 *
 * This component renders the footer of the website.
 * It contains sections for information about the website, quick navigation links, and ways to connect with me.
 *
 * @returns {JSX.Element} - The JSX element representing the footer.
 */
const Footer = () => {

  return (
    <footer className="w-full bg-gray-100 border-t border-gray-200 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* About Section */}
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h3 className="text-xl font-bold text-black">About Sam<span className='text-blue-500'>Cast</span></h3>
            <p className="text-gray-600 max-w-md">
              Perfect for curious minds and busy lives. Discover and enjoy amazing podcast content anytime, anywhere.
            </p>
          </div>


          {/* Connect with Me Section */}
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h3 className="text-xl font-bold text-black">Connect</h3>
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <a
                href="https://github.com/Lebeloane"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-blue-400 transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="mailto:sam.matlala05@gmail.com"
                className="text-gray-800 hover:text-blue-400 transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/sam-matlala-67099a28b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-blue-400 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
