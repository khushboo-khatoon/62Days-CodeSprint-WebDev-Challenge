import React from "react";
import offerGirl from "../assets/offerGirl.webp";
import { Link } from "react-router-dom";

const OfferPage = () => {
  return (
    <section className="bg-[#F5F1EB] px-4 sm:px-8 md:px-16 lg:px-25 py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12">

        <div className="text-center md:text-left max-w-xl">

          <span className="inline-block bg-[#1F3D2B] text-white px-4 py-1 rounded-full text-xs tracking-widest font-semibold">
            EXCLUSIVE OFFER
          </span>

          <p className="mt-5 text-[#6B7C72] text-base md:text-lg">
            Get up to
          </p>

          <h2 className="text-[#1F3D2B] text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            50% OFF
          </h2>

          <p className="mt-3 text-[#6B7C72] text-base md:text-lg">
            On select styles
          </p>

          <Link to="/womens" className="
            mt-5 inline-block
            bg-[#2F6B4F]
            hover:bg-[#24563F]
            text-white cursor-pointer
            px-8 py-3
            rounded-full
            shadow-md
            transition-all duration-300
            hover:translate-y-0.5
          ">Grab the Deal</Link>
        </div>

        <div className="flex relative bg-white rounded-2xl shadow-lg justify-center md:justify-end w-auto md:w-auto">
          <img
            src={offerGirl}
            alt="Exclusive Offer"
            className="
              w-65
              sm:w-75
              md:w-90
              lg:w-100
              object-contain
              drop-shadow-lg
            "
          />
        </div>

      </div>
    </section>
  );
};

export default OfferPage;
