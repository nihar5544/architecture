"use client";
import React, { useState } from "react";
import Image from "next/image";
const ImageZoom = ({ imageUrl }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="relative">
      <Image
        src={imageUrl}
        alt="Image"
        width={500}
        height={300}
        className="cursor-pointer rounded-[80px]"
        onClick={toggleZoom}
      />
      {isZoomed && (
        <div
          className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center"
          onClick={toggleZoom}
        >
          <div className="absolute inset-0 bg-black opacity-75 "></div>
          <Image
            src={imageUrl}
            width={800}
            height={600}
            alt="Zoomed Image"
            className="max-h-screen max-w-screen z-50"
          />
        </div>
      )}
    </div>
  );
};

export default ImageZoom;
