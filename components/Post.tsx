import Link from "next/link";
import React from "react";
import { sanitizeExcerpt } from "../utils/format";
import Date from "./Date";

export const Post = ({
  title,
  id,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  tags,
  categories,
}: any) => {
  const name = author
    ? author.firstName && author.lastName
      ? `${author.firstName} ${author.lastName}`
      : author.name
    : null;
  return (
    <div className="flex bg-white border rounded-md px-4 py-4 space-x-4 w-full shadow-sm cursor-pointer">
      {/* Post Featured Image */}
      <Link href={`/post/${id}/${slug}`} prefetch={false} passHref>
        <a>
          <div className="flex w-32 sm:w-56 md:w-60 lg:w-72 h-28 sm:h-36 md:h-40 lg:h-48">
            <img
              className="object-cover w-full h-full"
              src={
                coverImage.sourceUrl
                  ? coverImage.sourceUrl
                  : coverImage.node.sourceUrl
              }
            />
          </div>
        </a>
      </Link>

      {/* Post Title */}
      <div className="flex flex-col flex-1">
        <Link href={`/post/${id}/${slug}`} prefetch={false} passHref>
          <a>
            <h2 className="text-sm font-black sm:text-base md:text-lg lg:text-xl group-hover:underline font-Space-Grotesk">
              {title}
            </h2>
          </a>
        </Link>

        {/* Post Excerpt */}
        {excerpt && (
          <div className="flex py-1 max-h-20 sm:max-h-20 md:max-h-20 lg:max-h-20 xl:max-h-20">
            <Link href={`/post/${id}/${slug}`} prefetch={false} passHref>
              <a>
                <div
                  className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-base xl:text-base line-clamp-2 sm:line-clamp-3 md:line-clamp-3 cursor-pointer"
                  dangerouslySetInnerHTML={{ __html: sanitizeExcerpt(excerpt) }}
                />
              </a>
            </Link>
          </div>
        )}

        {/* Tags */}
        <div
          className={`flex flex-col justify-end sm:flex-row h-full sm:place-items-end sm:justify-start ${
            tags ? "sm:space-x-6" : "sm:space-x-4"
          }`}
        >
          {/* Author + Date */}

          <div className="hidden sm:inline text-xs font-semibold font-Space-Grotesk">
            <span>
              {tags.nodes.length > 0
                ? categories.nodes[0].name + ","
                : categories.nodes[0].name}
            </span>
            {tags.nodes.length > 0 ? (
              <span className="pl-1">{tags.nodes[0]?.name}</span>
            ) : (
              <></>
            )}
          </div>

          <div className="flex space-x-2 text-xs h-fit ">
            <span>{name}</span>
            <span className="pl-2 border-l">
              <Date className="pl-2 border-l" dateString={date} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
