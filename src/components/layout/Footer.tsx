
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#BF3B6C] text-white py-6">
      <div className="container-wrapper">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0">
          <p className="text-gray-200 text-sm text-center">
            &copy; {currentYear} Urbis. Todos os direitos reservados.
          </p>
          <span className="hidden sm:inline-block mx-2 text-gray-300">•</span>
          <Link 
            to="/admin" 
            className="text-gray-200 hover:text-white opacity-50 hover:opacity-80 text-xs transition-opacity"
          >
            CMS
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
