import React from "react";

export const RelatedPost = () => {
  return (
    <div className="flex flex-col w-96 h-96 justify-center sm:w-64 sm:h-96 md:max-w-xs lg:w-96 border bg-white rounded-md px-4 py-4 cursor-pointer">
      {/* Image */}
      <div className="flex w-full h-full ">
        <img
          className="object-cover w-full h-full"
          src="https://images.unsplash.com/photo-1642104704074-907c0698cbd9"
        />
      </div>

      {/* Post Title */}
      <div className="group flex flex-col flex-1 px-2">
        <h2 className="text-base font-bold mt-4 mb-2 font-Space-Grotesk group-hover:underline">
          What is ERC-721? The Ethereum NFT Token Standard
        </h2>

        {/* Post Excerpt */}
        <div className="flex pt-1 max-h-9 sm:max-h-13 md:max-h-12 lg:max-h-16 w-full line-clamp-3 whitespace-normal text-ellipsis overflow-hidden">
          <p className="text-gray-500 text-xs md:text-sm lg:text-md xl:text-md">
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
        <div className="flex flex-col mt-4">
          {/* Author + Date */}
          <div className="flex text-xs font-semibold font-Space-Grotesk">
            <span>Guides,</span>
            <span className="pl-1">Ethereum</span>
          </div>

          <div className="flex space-x-2 text-xs h-fit mt-1">
            <span>Jake Kovoor</span>
            <span className="pl-2 border-l">May 26, 2022</span>
          </div>
        </div>
      </div>
    </div>
  );
};
