"use client";

import { useState } from "react";
import Link from "next/link";
import { Settings, Plus, ShoppingBag, MessageSquare, Bell, Home, Package, Users, FileText, LogOut, ChevronDown, Truck, BarChart2, Calendar } from "lucide-react";

export const runtime = "edge";

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const user = {
    name: "SARAL",
    role: "Admin",
    email: "saral@ecommerce.com",
    lastLogin: "March 19, 2025"
  };

  const handleLogout = () => {
    window.location.href = "/login";
  };
  

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white border-r border-gray-200">
        <div className="flex items-center h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-blue-600">SARAL Shop</h1>
        </div>
        
        <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
          <div className="px-4 mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <span className="text-lg font-medium text-blue-600">{user.name.charAt(0)}</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
            </div>
          </div>
          
          <nav className="px-4 space-y-1">
            <button 
              onClick={() => setActiveSection("dashboard")}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeSection === "dashboard" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
            >
              <Home size={18} className="mr-2" />
              Dashboard
            </button>
            <button 
              onClick={() => setActiveSection("products")}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeSection === "products" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
            >
              <Package size={18} className="mr-2" />
              Products
            </button>
            <button 
              onClick={() => setActiveSection("orders")}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeSection === "orders" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
            >
              <Truck size={18} className="mr-2" />
              Orders
            </button>
            <button 
              onClick={() => setActiveSection("customers")}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeSection === "customers" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
            >
              <Users size={18} className="mr-2" />
              Customers
            </button>
            <button 
              onClick={() => setActiveSection("reports")}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeSection === "reports" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
            >
              <FileText size={18} className="mr-2" />
              Reports
            </button>
            <button 
              onClick={() => setActiveSection("settings")}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeSection === "settings" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
            >
              <Settings size={18} className="mr-2" />
              Settings
            </button>
          </nav>
        </div>
        
        <div className="p-4 border-t">
          <Link href="/dashboard/createshop" className="w-full block text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 ease-in-out">
            Create Shop
          </Link>
          <button 
            onClick={handleLogout}
            className="mt-4 w-full flex items-center justify-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out"
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 z-40 transition-opacity ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileMenuOpen(false)}></div>
        
        <div className={`fixed inset-y-0 left-0 flex flex-col w-64 bg-white z-50 transform transition-transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <h1 className="text-xl font-bold text-blue-600">SARAL Shop</h1>
            <button className="text-gray-500" onClick={() => setMobileMenuOpen(false)}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto pt-5 pb-4">
            <div className="px-4 mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-lg font-medium text-blue-600">{user.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
            </div>
            
            <nav className="px-4 space-y-1">
              {/* Same navigation items as desktop sidebar */}
              <button 
                onClick={() => {setActiveSection("dashboard"); setMobileMenuOpen(false);}}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeSection === "dashboard" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <Home size={18} className="mr-2" />
                Dashboard
              </button>
              {/* Add other navigation items similar to the desktop sidebar */}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:ml-64 flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <button 
              className="md:hidden text-gray-500"
              onClick={() => setMobileMenuOpen(true)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-600 hover:text-blue-600 relative">
                  <MessageSquare size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600 relative">
                  <Bell size={20} />
                </button>
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="font-medium text-blue-600">{user.name.charAt(0)}</span>
                  </div>
                  <span className="hidden md:inline-block text-sm text-gray-700">{user.name}</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow p-4 sm:p-6 lg:p-8 overflow-auto">
          {activeSection === "dashboard" && (
            <>
            </>
          )}

          {/* Settings Section */}
          {activeSection === "settings" && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 sm:p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
              </div>
              
              <div className="p-4 sm:p-6 space-y-6">
                <div>
                  <h3 className="text-md font-medium mb-4">Account Settings</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-gray-50 rounded-lg">
                      <div className="mb-2 sm:mb-0">
                        <p className="font-medium text-gray-800">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive emails about your account activity</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-gray-50 rounded-lg">
                      <div className="mb-2 sm:mb-0">
                        <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-md font-medium mb-4">Shop Settings</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-gray-50 rounded-lg">
                      <div className="mb-2 sm:mb-0">
                        <p className="font-medium text-gray-800">Public Profile</p>
                        <p className="text-sm text-gray-500">Allow customers to view your shop profile</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-gray-50 rounded-lg">
                      <div className="mb-2 sm:mb-0">
                        <p className="font-medium text-gray-800">Automatic Inventory Updates</p>
                        <p className="text-sm text-gray-500">Update inventory automatically when orders are placed</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 text-center">© 2025 SARAL Shop. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}