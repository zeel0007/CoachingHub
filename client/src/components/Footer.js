import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-primary-900 text-primary-100 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={process.env.PUBLIC_URL + '/channels4_profile.jpg'} alt="Logo" className="w-8 h-8 rounded-full object-cover" />
              <span className="font-display font-bold text-2xl text-white tracking-tight">
                RK <span className="text-accent">AgriCoaching</span>
              </span>
            </Link>
            <p className="text-primary-200 mb-6 max-w-sm">
              Your comprehensive platform for Gujarat Gram Sevak and GPSSB exam preparation. Quality notes, quizzes, and updates in one place.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 bg-primary-800 inline-block px-3 py-1 rounded">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/notes" className="hover:text-white transition-colors">Study Notes</Link></li>
              <li><Link to="/quiz" className="hover:text-white transition-colors">Mock Quizzes</Link></li>
              <li><Link to="/pyqs" className="hover:text-white transition-colors">Previous Papers</Link></li>
              <li><Link to="/jobs" className="hover:text-white transition-colors">Job Updates</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 bg-primary-800 inline-block px-3 py-1 rounded">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>Email: support@gramsevakprep.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Gandhinagar, Gujarat</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} RK AgriCoaching. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="cursor-pointer hover:text-white">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
