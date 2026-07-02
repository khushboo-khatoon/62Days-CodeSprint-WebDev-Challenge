import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useScrollReveal = (ref) => {
  useLayoutEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current.children, {
        opacity: 0,
        y: 30,
        duration: 1.6,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          once: false,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [ref]);
};

export default useScrollReveal;
