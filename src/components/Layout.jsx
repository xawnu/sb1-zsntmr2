import React from 'react';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white font-bold">Image Background Removal</Link>
          <div>
            <Link to="/dashboard" className="text-white mr-4">Dashboard</Link>
            <Link to="/subscription" className="text-white mr-4">Subscription</Link>
            <Link to="/image-processing" className="text-white">Image Processing</Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto mt-4">
        {children}
      </main>
    </div>
  );
}

export default Layout;