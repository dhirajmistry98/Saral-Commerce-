'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [pendingStores, setPendingStores] = useState([
    { id: 1, name: 'Store 1', owner: 'John Doe', email: 'john@example.com', status: 'pending' },
    { id: 2, name: 'Store 2', owner: 'Jane Smith', email: 'jane@example.com', status: 'pending' }
  ]);

  const [approvedStores, setApprovedStores] = useState([
    { id: 3, name: 'Store 3', owner: 'Bob Wilson', email: 'bob@example.com', status: 'approved' }
  ]);

  const [userName, setUserName] = useState('Admin');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleApprove = (storeId) => {
    const storeToApprove = pendingStores.find(store => store.id === storeId);
    if (storeToApprove) {
      // Move store from pending to approved
      setPendingStores(prev => prev.filter(store => store.id !== storeId));
      setApprovedStores(prev => [...prev, { ...storeToApprove, status: 'approved' }]);
    }
  };

  const handleDeny = (storeId) => {
    // Remove store from pending list
    setPendingStores(prev => prev.filter(store => store.id !== storeId));
  };

  // Mock logout function - would typically clear auth state
  const handleLogout = () => {
    window.location.href = '/admin';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl">Admin Panel</span>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden md:flex items-center">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative">
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
                  >
                    <span className="mr-2">{userName}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {isMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1 border-t border-blue-700">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-700"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-4 sm:px-0">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700">Total Stores</h3>
              <p className="text-3xl font-bold text-blue-600">{pendingStores.length + approvedStores.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700">Pending Approval</h3>
              <p className="text-3xl font-bold text-yellow-600">{pendingStores.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700">Approved Stores</h3>
              <p className="text-3xl font-bold text-green-600">{approvedStores.length}</p>
            </div>
          </div>

          {/* Pending Approvals Section */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Approvals</h2>
              {pendingStores.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Store Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pendingStores.map(store => (
                        <tr key={store.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{store.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{store.owner}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{store.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleApprove(store.id)}
                              className="bg-green-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleDeny(store.id)}
                              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                              Deny
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">No pending stores to approve</div>
              )}
            </div>
          </div>

          {/* Approved Stores Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Approved Stores</h2>
              {approvedStores.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Store Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {approvedStores.map(store => (
                        <tr key={store.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{store.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{store.owner}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{store.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              Approved
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">No approved stores yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}