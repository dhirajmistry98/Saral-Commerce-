"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const runtime = "edge";

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("brand");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userAccountType, setUserAccountType] = useState("");
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  useEffect(() => {
    // Make a fetch request to the API route
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/dashboard', {
          method: 'GET', 
          credentials: 'include',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        
        if (!response.ok) {
          throw new Error('Unauthorized');
        }
        
        const data = await response.json();
        if (data.success && data.userData) {
          setUserName(data.userData.username); 
          setUserEmail(data.userData.email);
          setUserId(data.userData.id);
          setUserAccountType(data.userData.accountType);
        }
        
      } catch (err) {
        setError(err.message);
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  // User details
  const user = { 
    id: userId,
    name: userName, 
    role: userAccountType,
    email: userEmail,
    lastLogin: new Date().toLocaleDateString()
  };

  const handleLogout = async () => {
    try {
      setIsLogoutLoading(true);
      const response = await fetch('/api/logout', { 
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        // Clear any client-side state
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        
        // Redirect to login page
        router.push("/login");
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Could not log out. Please try again.");
    } finally {
      setIsLogoutLoading(false);
    }
  };

  const navigateToCreateShop = () => {
    router.push("/dashboard/createshop");
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  // Error or unauthorized state
  if (error || !userName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Session Expired</h1>
          <p className="text-gray-600 mb-6">Your session has expired or you need to sign in to access this page.</p>
          <button
            onClick={() => router.push('/login')}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 font-medium"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with gradient */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">SaralCommerce</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm text-white font-medium">Hi, {userName}</span>
            </div>
            <button 
              onClick={handleLogout}
              disabled={isLogoutLoading}
              className={`px-4 py-2 ${isLogoutLoading ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'} text-white rounded-lg transition duration-150 flex items-center`}
            >
              {isLogoutLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isLogoutLoading ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* User Profile Card */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-6">
              <div className="flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-md">
                  <span className="text-3xl font-bold text-blue-600">{user.name.charAt(0).toUpperCase()}</span>
                </div>
              </div>
              <h3 className="font-bold text-lg text-center text-white mt-4">{user.name}</h3>
              <p className="text-blue-100 text-center text-sm">{user.email}</p>
            </div>
            <div className="p-6">
              <div className="border-b pb-3 mb-3">
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">User ID</span>
                  <span className="font-medium text-gray-800">{user.id || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Role</span>
                  <span className="font-medium text-gray-800">{user.role || 'User'}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500"></span>
                  <span className="font-medium text-gray-800">{user.lastLogin}</span>
                </div>
              </div>
              
              <button
                onClick={navigateToCreateShop}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center transition duration-150"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New Shop
              </button>
            </div>
          </div>
          
          {/* Main Dashboard Area */}
          <div className="md:col-span-3">
            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Total Shops</h3>
                  <span className="bg-blue-100 text-blue-800 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-500 mt-2">Get started by creating your first shop</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Products</h3>
                  <span className="bg-green-100 text-green-800 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-500 mt-2">Add products to your shop inventory</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
                  <span className="bg-purple-100 text-purple-800 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900">$0.00</p>
                <p className="text-sm text-gray-500 mt-2">Track your earnings here</p>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="border-b">
                <nav className="flex">
                  <button
                    className={`px-6 py-4 text-sm font-medium flex-1 text-center transition-colors duration-200 ${
                      activeTab === "brand"
                        ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab("brand")}
                  >
                    <div className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      Brand Management
                    </div>
                  </button>
                  <button
                    className={`px-6 py-4 text-sm font-medium flex-1 text-center transition-colors duration-200 ${
                      activeTab === "retailer"
                        ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab("retailer")}
                  >
                    <div className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Retail Operations
                    </div>
                  </button>
                </nav>
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "brand" ? (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Brand Management</h2>
                    <p className="text-gray-600 mb-6">Manage your brand and products efficiently. Access all brand-related tools and analytics here.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition-colors duration-150 cursor-pointer flex items-center">
                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Brand Calendar</h3>
                          <p className="text-gray-500 text-sm">Schedule and plan your brand activities</p>
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition-colors duration-150 cursor-pointer flex items-center">
                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Analytics</h3>
                          <p className="text-gray-500 text-sm">Track brand performance metrics</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Retail Operations</h2>
                    <p className="text-gray-600 mb-6">Explore and manage all aspects of your retail operations from one central location.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition-colors duration-150 cursor-pointer flex items-center">
                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Inventory Management</h3>
                          <p className="text-gray-500 text-sm">Manage your product inventory</p>
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition-colors duration-150 cursor-pointer flex items-center">
                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Order Management</h3>
                          <p className="text-gray-500 text-sm">Track and manage customer orders</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-gray-500 text-center">© 2025 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}