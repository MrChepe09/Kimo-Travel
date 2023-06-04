import Image from "next/image";
import React, { useEffect, useState } from "react";

const twc = {
  bannerContainer: "w-full relative banner-height overflow-x-hidden",
  headingContainer:
    "absolute w-full h-full top-0 flex flex-col justify-center items-center overflow-x-hidden lg:mt-10 xl:mt-0",
  heading:
    "text-64px lg:text-140px leading-64px lg:leading-132px font-bold text-center text-welcome plex-mono px-[30px]",
  description:
    "text-base leading-5 font-bold text-center text-welcome plex-mono block mt-4 px-4 lg:px-[188px] ",
  img: "object-cover w-full h-full bg-[#D9D9D9]",
};

export type BannerProps = {
  image?: string;
  heading?: string;
  description?: string;
};

export enum BANNER {
  HEADING = "Welcome to Hawaii",
  ALT = "homepage-icon",
  MOBILE_IMAGE_PATH = "/mobileHead.png",
  IMAGE_PATH="/Head.png",
}

export const Banner = ({ image, heading, description }: BannerProps) => {
  const [screenSize, setScreenSize] = useState(1020);

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(window.innerWidth);
    }
    window.addEventListener('resize', updateDimension);

    return(() => {
      window.removeEventListener('resize', updateDimension);
    })
  }, [screenSize])
  return (
    <div className={twc.bannerContainer}>
      <div className="h-full">
        <Image
          className={twc.img}
          src={image ? image : (screenSize <= 720 ? BANNER.MOBILE_IMAGE_PATH : BANNER.IMAGE_PATH)}
          alt={BANNER.ALT}
          width={100}
          height={100}
          unoptimized={true}
        />
      </div>
    </div>
  );
};
