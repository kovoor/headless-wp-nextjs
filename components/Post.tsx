import React from "react";

export const Post = () => {
  return (
    <div className="flex bg-white border rounded-md px-4 py-4 space-x-4 w-full shadow-sm cursor-pointer">
      {/* Post Featured Image */}
      <div className="flex w-32 sm:w-56 md:w-60 lg:w-72 h-28 sm:h-36 md:h-40 lg:h-48">
        <img
          className="object-cover w-full h-full"
          src="https://images.unsplash.com/photo-1642104704074-907c0698cbd9"
        />
      </div>

      {/* Post Title */}
      <div className="group flex flex-col flex-1">
        <h2 className="text-sm font-black sm:text-base md:text-lg lg:text-xl group-hover:underline font-Space-Grotesk">
          What is ERC-721? The Ethereum NFT Token Standard
        </h2>

        {/* Post Excerpt */}
        <div className="flex py-1 max-h-20 sm:max-h-20 md:max-h-20 lg:max-h-20 xl:max-h-20">
          <p className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-base xl:text-base line-clamp-2 sm:line-clamp-3 md:line-clamp-3 cursor-pointer">
            ERC-721 is a token standard for non-fungible tokens on Ethereum. A
            pillar of the ecosystem, it supports billions of dollars worth of
            NFTs. pillar of the ecosystem, it supports billions of dollars worth
            of NFTs. pillar of the ecosystem, it supports billions of dollars
            worth of NFTs. pillar of the ecosystem, it supports billions of
            dollars worth of NFTs pillar of the ecosystem, it supports billions
            of dollars worth of NFTs. pillar of the ecosystem, it supports
            billions of dollars worth of NFTs
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-col justify-end sm:flex-row h-full sm:place-items-end sm:justify-start sm:space-x-6">
          {/* Author + Date */}

          <div className="hidden sm:inline text-xs font-semibold font-Space-Grotesk">
            <span>Guides,</span>
            <span className="pl-1">Ethereum</span>
          </div>

          <div className="flex space-x-2 text-xs h-fit ">
            <span>Jake Kovoor</span>
            <span className="pl-2 border-l">May 26, 2022</span>
          </div>
        </div>
      </div>
    </div>
  );
};
