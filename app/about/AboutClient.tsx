"use client"
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';

const AboutClient = () => {


    const position: LatLngExpression = [51.505, -0.09]; // Example coordinates (latitude, longitude)
    return (
        <div className="bg-white dark:bg-gray-900 py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
              About Us
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 text-center max-w-3xl mx-auto">
              Welcome to Rent-A-Car, where your journey begins with comfort, style, and convenience. 
              We have been providing top-quality rental vehicles for over a decade, ensuring our customers have 
              the best driving experience. Our mission is to make car rental easy, affordable, and accessible for everyone.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 text-center max-w-3xl mx-auto">
              With a wide range of vehicles to choose from, including compact cars, SUVs, and luxury vehicles, 
              we cater to all your travel needs. Whether you&apos;re going on a business trip, a weekend getaway, 
              or a family vacation, we have the perfect vehicle for you.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 text-center max-w-3xl mx-auto">
              At Rent-A-Car, customer satisfaction is our top priority. We believe in providing excellent service with a smile, 
              ensuring your rental experience is seamless from start to finish. Our team of dedicated professionals is here to assist you 
              with any questions or concerns you may have.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-3xl mx-auto mb-10">
              Thank you for choosing Rent-A-Car. We look forward to serving you and making your travel experience unforgettable.
            </p>
    
            {/* Harita Bölümü */}
            <div className="max-w-4xl mx-auto mt-10">
              <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">Our Location</h2>
              <div className="w-full h-96">
                <MapContainer
                  center={position}
                  zoom={13}
                  scrollWheelZoom={false}
                  className="h-full rounded-lg"
                  attributionControl={true}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position}>
                    <Popup>
                      Rent-A-Car Office <br /> Visit us!
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      );
}

export default AboutClient