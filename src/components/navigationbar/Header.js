"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
function Header() {
  const pathname = usePathname();
  return (
    <div className="flex items-center justify-center sticky top-0 z-[999] bg-[#F6F3FF] border-b-2">
      <div className="container-padding-x lg:block flex w-[60%] hidden">
        <div className="flex justify-between font-medium text-[18px] py-4">
          <Link href="/" className="flex items-center">
            {/* <Image
              // eslint-disable-next-line no-undef
              // src={`${process.env.imageBasePath}/images/logo.webp`}
              width={160}
              height={60}
              alt="coindelta-logo"
              className="pt-[20px]"
            /> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
<path d="M0 34.0003H13.4588V24.499C13.4588 22.4853 15.0898 20.8543 17.1035 20.8543C19.1172 20.8543 20.7482 22.4853 20.7482 24.499V34.0003H33.9975V0C15.2211 0 0 15.2211 0 34.0003Z" fill="#CDA274"/>
</svg><span>logo</span>
          </Link>
          <div className="flex justify-between items-center w-[60%]">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/project">Projects</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
