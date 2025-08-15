// src/components/HamburgerMenu.jsx
import { useState } from 'react';
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserIcon, 
  Cog6ToothIcon, 
  EnvelopeIcon, 
  ArrowRightEndOnRectangleIcon 
} from '@heroicons/react/24/outline';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Define navigation links and their icons
  const navLinks = [
    { name: "My Profile", href: "/profile", icon: <UserIcon className="h-5 w-5" /> },
    { name: "Services", href: "/services", icon: <Cog6ToothIcon className="h-5 w-5" /> },
    { name: "Contact Us", href: "/contact", icon: <EnvelopeIcon className="h-5 w-5" /> },
    { name: "Log Out", href: "/logout", icon: <ArrowRightEndOnRectangleIcon className="h-5 w-5" /> },
  ];

  return (
    <>
      {/* Semi-transparent overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-500 bg-opacity-25 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Hamburger/Close Icon */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed top-3 left-3 z-50 p-2 text-gray-700 hover:text-gray-900 md:hidden transition-colors duration-200"
      >
        {isOpen ? (
          <XMarkIcon className="h-7 w-7" />
        ) : (
          <Bars3Icon className="h-7 w-7" />
        )}
      </button>

      {/* Slide-in menu */}
      <div 
        className={`
          fixed top-0 left-0 z-50
          h-screen w-56 bg-white shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:hidden
        `}
      >
        <div className="p-4 pt-12">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="flex items-center space-x-3 p-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;