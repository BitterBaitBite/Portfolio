"use client";
import React, { useState, useEffect } from "react";

// Subcomponente que se encarga de animar el texto letra por letra
export function AnimatedLine({
  text,
  speed = 40,
}: {
  text: string;
  speed?: number;
}) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    // Reset the displayed text when the input text changes
    setDisplayedText("");

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        if (prev.length < text.length) {
          return prev + text.charAt(prev.length);
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
}
