import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Velnixa | Premium Fashion Brand in India</title>
        <meta
          name="description"
          content="Know more about Velnixa – a premium fashion brand offering trendy men, women and kids wear across India."
        />
        <link rel="canonical" href="https://velnixa.vercel.app/about" />
      </Helmet>

      <Navbar />

      <div className="min-h-screen bg-linear-to-b from-green-50 to-white px-4 sm:px-6 md:px-16 lg:px-24 py-16">

        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1F3D2B]">
            About Velnixa
          </h1>
          <p className="mt-4 text-[#4B5B52] text-base sm:text-lg">
            A scalable fashion e-commerce project built step by step
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

          <div className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1F3D2B]">
              What is Velnixa?
            </h2>

            <p className="text-[#4B5B52] leading-relaxed text-sm sm:text-base">
              Velnixa started as a frontend-focused fashion e-commerce project
              built to practice real-world React development and modern UI design.
            </p>

            <p className="text-[#4B5B52] leading-relaxed text-sm sm:text-base">
              As the project evolves, backend functionalities such as
              authentication, database integration, and APIs will be added
              to transform it into a full-stack e-commerce application.
            </p>

            <p className="text-[#4B5B52] leading-relaxed text-sm sm:text-base">
              The long-term vision of Velnixa is to grow into a feature-rich,
              scalable platform similar to large e-commerce websites, focusing
              on performance, usability, and clean architecture.
            </p>
          </div>

          <div className="
            bg-white 
            rounded-2xl 
            shadow-lg 
            p-6 sm:p-8 
            border border-black/5
          ">
            <h3 className="text-lg sm:text-xl font-semibold text-[#2F6B4F] mb-6">
              Project Highlights
            </h3>

            <ul className="space-y-3 sm:space-y-4 text-[#4B5B52] text-sm sm:text-base">
              <li>✔ Modern React-based architecture</li>
              <li>✔ Tailwind CSS for responsive UI</li>
              <li>✔ Mobile-first & fully responsive design</li>
              <li>✔ Scalable code structure</li>
              <li>✔ Future-ready for backend integration</li>
            </ul>

            <div className="mt-6 text-xs sm:text-sm text-gray-500">
              Velnixa is an actively evolving project built for learning and
              experimentation and is not yet intended for commercial use.
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
