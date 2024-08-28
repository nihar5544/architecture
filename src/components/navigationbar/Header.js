"use client";
import Image from "next/image";
import MobileHeader from "./MobileHeader.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
function Header() {
  const pathname = usePathname();
  const [hideLogo, setHideLogo] = useState(false);
  return (
    <div className="flex items-center justify-center sticky top-0 z-40 backdrop-blur-md border-b-2">
      <div className="container-padding-x lg:block w-[60%] hidden">
        <div className="flex justify-between font-medium text-[18px]">
          <Link href="/" className="flex items-center">
            <Image
              // eslint-disable-next-line no-undef
              src={`/images/Logo.webp`}
              fetchPriority="high"
              width={150}
              height={60}
              alt="mcad-logo"
              className="py-[10px]"
            />
      
          </Link>
          <div className="flex justify-between items-center  py-4 w-[60%]">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
      <div className="lg:hidden block w-full">
          <MobileHeader
            setHideLogo={setHideLogo}
            hideLogo={hideLogo}
            suppressHydrationWarning
          />
        </div>
    </div>
  );
}

export default Header;
