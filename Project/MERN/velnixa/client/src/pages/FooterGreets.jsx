import React from "react";

const FooterGreets = () => {
  return (
    <section className="bg-[#FAF8F5] py-14 md:py-20 px-4 md:px-20">

      <div className="max-w-3xl mx-auto text-center space-y-4">

        {/* HEADING */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1F3D2B]">
          Get Exclusive Offers on Your Email
        </h1>

        {/* SUBTEXT */}
        <p className="text-sm sm:text-base md:text-lg text-[#6B7280]">
          Subscribe to our newsletter and stay updated
        </p>

        {/* INPUT + BUTTON */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6">

          <input
            type="email"
            placeholder="Enter your email address"
            className="
              w-full sm:w-[320px]
              px-5 py-3
              rounded-full
              border border-[#CBD5E1]
              outline-none
              text-sm
              focus:ring-0 focus:border-[#CBD5E1]
              placeholder:text-[#9CA3AF]
              transition
            "
          />

          <button
            className="
              w-full sm:w-auto px-8 py-3 rounded-full bg-[#1F3D2B] text-white font-medium hover:bg-[#2F6B4F]
              transition-all cursor-pointer"
          >
            Subscribe
          </button>

        </div>

      </div>

    </section>
  );
};

export default FooterGreets;
