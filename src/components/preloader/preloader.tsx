"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Preloader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Optionally, hide the preloader after the animation
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            duration: 0.5,
            opacity: 0,
            display: "none", // or 'visibility: hidden'
          });
        }
      },
    });

    // Preloader animation using GSAP
    tl.to(overlayRef.current, {
      duration: 1.5,
      xPercent: 100,
      ease: "power2.inOut",
      delay: 0.5,
    });

    tl.fromTo(
      text1Ref.current,
      { xPercent: -100, opacity: 0 },
      { duration: 1, xPercent: 0, opacity: 1, ease: "power3.out" },
      "-=0.7"
    );
    tl.fromTo(
      text2Ref.current,
      { xPercent: -100, opacity: 0 },
      { duration: 1, xPercent: 0, opacity: 1, ease: "power3.out" },
      "-=0.8"
    );
    tl.fromTo(
      text3Ref.current,
      { xPercent: -100, opacity: 0 },
      { duration: 1, xPercent: 0, opacity: 1, ease: "power3.out" },
      "-=0.8"
    );

    return () => {
      tl.kill(); // Cleanup GSAP timeline
    };
  }, []);

  return (
    <div className="pre-landing" ref={containerRef}>
      <div className="container">
        <div className="text-wrapper">
          <div className="text" ref={text1Ref}>
            Dream.
          </div>
        </div>
        <div className="text-wrapper">
          <div className="text" ref={text2Ref}>
            Dedicate.
          </div>
        </div>
        <div className="text-wrapper">
          <div className="text" ref={text3Ref}>
            Develop.
          </div>
        </div>
        <div className="overlay" ref={overlayRef}></div>
      </div>
    </div>
  );
};

export default Preloader;
