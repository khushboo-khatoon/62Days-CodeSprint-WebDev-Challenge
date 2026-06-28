import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const Offices = () => {
  return (
    <>
      <Helmet>
        <title>Our Offices | Velnixa</title>
        <meta
          name="description"
          content="Find Velnixa office locations and business contact details."
        />
        <link rel="canonical" href="https://velnixa.vercel.app/offices" />
      </Helmet>

      <Navbar />

      <div className="min-h-[80vh] bg-linear-to-b from-green-50 to-white px-4 sm:px-6 md:px-16 lg:px-24 py-16">

        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1F3D2B]">
            Offices & Workspaces
          </h1>
          <p className="mt-4 text-[#4B5B52] text-base sm:text-lg">
            How and where Velnixa is being built
          </p>
        </div>

        <div className="mt-14 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

          <div
            className="
              bg-white 
              rounded-2xl 
              shadow-lg 
              border border-black/5 
              p-6 sm:p-8 
              transition-all 
            "
          >
            <h3 className="text-lg sm:text-xl font-semibold text-[#2F6B4F] mb-4">
              Remote Development Office
            </h3>
            <p className="text-[#4B5B52] text-sm sm:text-base leading-relaxed">
              Velnixa is currently developed and maintained as a remote-based
              project. All development, design, and planning are carried out
              through a flexible remote workflow.
            </p>
          </div>

          <div
            className="
              bg-white 
              rounded-2xl 
              shadow-lg 
              border border-black/5 
              p-6 sm:p-8 
              transition-all 
            "
          >
            <h3 className="text-lg sm:text-xl font-semibold text-[#2F6B4F] mb-4">
              Planned Physical Offices
            </h3>
            <p className="text-[#4B5B52] text-sm sm:text-base leading-relaxed">
              As the platform evolves into a full-stack and production-ready
              e-commerce application, physical office locations and dedicated
              workspaces may be introduced to support future growth.
            </p>
          </div>

        </div>

        <div className="mt-16 text-center text-gray-500 text-xs sm:text-sm max-w-2xl mx-auto">
          Velnixa is an evolving project focused on learning, scalability,
          and real-world implementation of modern web technologies.
        </div>

      </div>

      <Footer />
    </>
  );
};

export default Offices;
