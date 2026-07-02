import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import useScrollReveal from "../utils/useScrollReveal";

import Navbar from "../components/Navbar";
import Hero from "./Hero";
import Popular from "./Popular";
import OfferPage from "./OfferPage";
import NewCollection from "./NewCollection";
import FooterGreets from "./FooterGreets";
import Footer from "../components/Footer";

const Home = () => {
  const popularRef = useRef(null);
  const offerRef = useRef(null);
  const collectionRef = useRef(null);
  const footerGreetRef = useRef(null);

  useScrollReveal(popularRef);
  useScrollReveal(offerRef);
  useScrollReveal(collectionRef);
  useScrollReveal(footerGreetRef);

  return (
    <>

      <Helmet>
        <title>Buy Premium Fashion Wear Online in India | Velnixa</title>

        <meta
          name="description"
          content="Shop premium men, women & kids fashion at Velnixa. Trendy oversized t-shirts, best quality fabric & fast delivery across India."
        />

        <meta name="keywords" content="Velnixa, oversized t-shirts, men fashion, women fashion, kids wear, online clothing store india" />

        <link rel="canonical" href="https://velnixa.vercel.app/" />

        <meta property="og:title" content="Premium Fashion Wear Online | Velnixa" />
        <meta
          property="og:description"
          content="Discover trendy oversized t-shirts & premium fashion at Velnixa."
        />
        <meta property="og:url" content="https://velnixa.vercel.app/" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />
      <Hero />

      <section className="bg-[#F5F1EB]" ref={popularRef}>
        <Popular />
      </section>

      <section className="bg-[#F5F1EB]" ref={offerRef}>
        <OfferPage />
      </section>

      <section className="bg-[#FAF8F5]" ref={collectionRef}>
        <NewCollection />
      </section>

      <section className="bg-[#FAF8F5]" ref={footerGreetRef}>
        <FooterGreets />
      </section>

      <Footer />
    </>
  );
};

export default Home;
