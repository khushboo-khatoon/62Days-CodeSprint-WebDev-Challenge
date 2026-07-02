import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Velnixa Support</title>
        <meta
          name="description"
          content="Contact Velnixa for order support, queries and business enquiries. We are here to help you."
        />
        <link rel="canonical" href="https://velnixa.vercel.app/contact" />
      </Helmet>

      <Navbar />

      <section className="relative bg-linear-to-b from-[#FAF8F5] to-[#F2EFEA] min-h-screen px-4 sm:px-8 md:px-16 py-20">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#1F3D2B]">
            Get in Touch
          </h1>
          <p className="mt-5 text-gray-600 text-base sm:text-lg leading-relaxed">
            Questions, collaborations or feedback — our team is always happy to connect with you.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          <div className="space-y-8">

            <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)] space-y-6">

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-[#E6EEE8] text-[#1F3D2B]">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">
                    support@velnixa.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-[#E6EEE8] text-[#1F3D2B]">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">
                    +91 9XXXXXXXXX
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#E6EEE8] text-[#1F3D2B]">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium text-gray-900 leading-relaxed">
                    Velnixa Fashion Studio <br />
                    India
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_18px_60px_rgba(0,0,0,0.08)] p-8 sm:p-10">

            <form className="space-y-6">

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-transparent
                             focus:border-[#2F6B4F] focus:bg-white outline-0 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-transparent
                             focus:border-[#2F6B4F] focus:bg-white outline-0 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Tell us how we can help you…"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-transparent
                             focus:border-[#2F6B4F] focus:bg-white outline-0 transition resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-[#1F3D2B] cursor-pointer hover:bg-[#162E21]
                           text-white py-3.5 rounded-xl font-medium tracking-wide
                           transition-all duration-300"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
