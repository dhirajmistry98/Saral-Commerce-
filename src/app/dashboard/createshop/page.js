"use client";

import { useState } from "react";
import Link from "next/link";

export default function CreateShopPage() {
  const [formData, setFormData] = useState({
    shopName: "",
    shopDescription: "",
    category: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    website: "",
    openingHours: "",
    acceptsOnlineOrders: false,
    deliveryOptions: [],
  });

  const [shopLogo, setShopLogo] = useState(null);
  const [shopBanner, setShopBanner] = useState(null);
  const [businessDocuments, setBusinessDocuments] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "acceptsOnlineOrders") {
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
        }));
      } else if (name.startsWith("delivery-")) {
        const option = name.replace("delivery-", "");
        setFormData((prev) => {
          const currentOptions = [...prev.deliveryOptions];
          if (checked && !currentOptions.includes(option)) {
            return { ...prev, deliveryOptions: [...currentOptions, option] };
          } else {
            return {
              ...prev,
              deliveryOptions: currentOptions.filter((item) => item !== option),
            };
          }
        });
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Shop Creation Data:", {
      ...formData,
      shopLogo,
      shopBanner,
      businessDocuments,
    });
    alert("Shop created successfully!");
  };

  const inputStyle =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Create Your Shop</h1>
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} className="space-y-10 bg-white p-8 rounded-lg shadow">
          {/* Section: Basic Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="shopName"
                value={formData.shopName}
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="Shop Name"
                required
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={inputStyle}
                required
              >
                <option value="">Select Category</option>
                <option value="clothing">Clothing</option>
                <option value="electronics">Electronics</option>
                <option value="home">Home</option>
              </select>
              <textarea
                name="shopDescription"
                value={formData.shopDescription}
                onChange={handleInputChange}
                className={`${inputStyle} col-span-full`}
                rows={3}
                placeholder="Shop Description"
                required
              />
            </div>
          </div>

          {/* Section: Contact */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="Email"
                required
              />
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="Phone"
                required
              />
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="Website (optional)"
              />
            </div>
          </div>

          {/* Section: Address */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Location</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="Street Address"
                required
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="City"
                required
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="State"
                required
              />
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="ZIP Code"
                required
              />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="Country"
                required
              />
            </div>
          </div>

          {/* Section: Operations */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Operating Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="openingHours"
                value={formData.openingHours}
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="Opening Hours (e.g. 9AM - 9PM)"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="acceptsOnlineOrders"
                  checked={formData.acceptsOnlineOrders}
                  onChange={handleInputChange}
                />
                <label htmlFor="acceptsOnlineOrders">Accepts Online Orders</label>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium">Delivery Options:</p>
              <div className="flex gap-4 mt-2">
                {["pickup", "localDelivery", "nationalShipping"].map((option) => (
                  <label key={option} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      name={`delivery-${option}`}
                      checked={formData.deliveryOptions.includes(option)}
                      onChange={handleInputChange}
                    />
                    {option.replace(/([A-Z])/g, " $1")}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section: Uploads */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Uploads</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setShopLogo)}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setShopBanner)}
              />
              <input
                type="file"
                onChange={(e) => handleFileChange(e, setBusinessDocuments)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Create Shop
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
