import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const Help = () => {
  return (
    <>
      <Helmet>
        <title>Help & Support | Velnixa</title>
        <meta
          name="description"
          content="Get help with orders, delivery, returns and payments at Velnixa support center."
        />
        <link rel="canonical" href="https://velnixa.vercel.app/help" />
      </Helmet>

      <Navbar />

      <div className="min-h-screen bg-linear-to-b from-green-50 to-white px-4 sm:px-6 md:px-16 lg:px-24 py-16">

        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1F3D2B]">
            Help & Support
          </h1>
          <p className="mt-4 text-[#4B5B52] text-base sm:text-lg">
            Find answers to common questions about using Velnixa
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">

          {[
            {
              title: "How to Use Velnixa",
              text: "Browse products by category, view product details, and add items to your cart. The website is designed to be simple and easy to navigate across all devices."
            },
            {
              title: "Orders & Checkout",
              text: "Order placement and secure checkout features will be added as the project evolves into a full-stack application. Currently, this section demonstrates the frontend flow."
            },
            {
              title: "Account & Authentication",
              text: "User authentication, order history, and profile management features are planned for future updates when backend functionality is integrated."
            },
            {
              title: "Support & Feedback",
              text: "If you face any issues or have suggestions, feel free to share feedback. This project is continuously improving based on learning and experimentation."
            }
          ].map((item, i) => (
            <div
              key={i}
              className="
                bg-white 
                rounded-2xl 
                shadow-lg 
                p-6 sm:p-8 
                border border-black/5 
                transition-all 
              "
            >
              <h3 className="text-lg sm:text-xl font-semibold text-[#2F6B4F] mb-4">
                {item.title}
              </h3>
              <p className="text-[#4B5B52] text-sm sm:text-base leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}

        </div>

        <div className="mt-16 text-center text-gray-500 text-xs sm:text-sm max-w-2xl mx-auto">
          Velnixa is a learning-focused project. Support features will expand as
          the platform grows into a full-scale e-commerce application.
        </div>

      </div>

      <Footer />
    </>
  );
};

export default Help;
