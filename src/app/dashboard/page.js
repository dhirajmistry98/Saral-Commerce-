"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const runtime = "edge";

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("brand");
  
  // Example user details - in a real app, you'd fetch this from an API or context
  const user = { 
    name: "SARAL", 
    role: "Admin",
    email: "saral@ecommerce.com",
    lastLogin: "March 19, 2025"
  };

  const handleLogout = () => {
    // In a real app, you would clear auth state/cookies here
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user.name}</span>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-150"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="bg-blue-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">User Profile</h2>
            </div>
            <div className="p-6">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-4xl text-blue-600">{user.name.charAt(0)}</span>
                  </div>
                </div>
                <div className="mb-3">
                  <h3 className="font-bold text-lg text-center">{user.name}</h3>
                  <p className="text-gray-500 text-center">{user.email}</p>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500">Role</span>
                    <span className="font-medium">{user.role}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500">Last Login</span>
                    <span className="font-medium">{user.lastLogin}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Dashboard Area */}
          <div className="md:col-span-2">
            {/* Tabs */}
            <div className="mb-6 border-b">
              <nav className="flex space-x-8">
                <button
                  className={`px-1 py-4 text-sm font-medium ${
                    activeTab === "brand"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("brand")}
                >
                  Brand Management
                </button>
                <button
                  className={`px-1 py-4 text-sm font-medium ${
                    activeTab === "retailer"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("retailer")}
                >
                  Retail Operations
                </button>
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="bg-white shadow rounded-lg p-6">
              {activeTab === "brand" ? (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Brand Management</h2>
                  <p className="text-gray-600 mb-4">Manage your brand and products efficiently. Access all brand-related tools and analytics here.</p>

                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Retail Operations</h2>
                  <p className="text-gray-600 mb-4">Explore and manage all aspects of your retail operations from one central location.</p>
    
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm text-gray-500 text-center">© 2025 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}