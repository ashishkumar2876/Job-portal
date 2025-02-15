import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#2a1254] text-white py-2 text-center flex justify-between">
      <p className="mt-1 text-sm ml-3">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      <div className="flex justify-center space-x-6 mr-8">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
          <FaFacebook size={23} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
          <FaTwitter size={23} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
          <FaLinkedin size={23} />
        </a>
      </div>
      
    </footer>
  );
}
