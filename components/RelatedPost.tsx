import Link from "next/link";
import React from "react";
import { sanitizeExcerpt } from "../utils/format";
import Date from "./Date";

export const RelatedPost = ({
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
    ? author.node.firstName && author.node.lastName
      ? `${author.node.firstName} ${author.node.lastName}`
      : author.node.name
    : null;

  // console.log(categories.edges[0].node.name)
  // console.log(tags)
  return (
    <div className="flex flex-col w-96 h-96 justify-center sm:w-64 sm:h-96 md:max-w-xs lg:w-96 border bg-white rounded-md px-4 py-4 cursor-pointer">
      {/* Image */}
      <div className="flex w-full h-48 md:h-40">
        <Link href={`/post/${id}/${slug}`} prefetch={false}>
          <a>
            <img
              className="object-cover w-full h-full"
              src={coverImage?.node.sourceUrl}
            />
          </a>
        </Link>
      </div>

      {/* Post Title */}
      <div className="group peer flex flex-col flex-1 px-2">
        <Link href={`/post/${id}/${slug}`} prefetch={false}>
          <a>
            <h2 className="text-base font-bold mt-4 mb-2 font-Space-Grotesk group-hover:underline">
              {title}
            </h2>
          </a>
        </Link>

        {/* Post Excerpt */}

        {excerpt && (
          <Link href={`/post/${id}/${slug}`} prefetch={false} passHref>
            <a>
              <div className="flex pt-1 max-h-9 sm:max-h-13 md:max-h-12 lg:max-h-16 w-full line-clamp-3 whitespace-normal text-ellipsis overflow-hidden">
                <div
                  className="text-gray-500 text-xs md:text-sm lg:text-md xl:text-md"
                  dangerouslySetInnerHTML={{ __html: sanitizeExcerpt(excerpt) }}
                />
              </div>
            </a>
          </Link>
        )}

        {/* Tags */}
        <div className="flex flex-col mt-auto">
          {/* Author + Date */}
          <div className="flex text-xs font-semibold font-Space-Grotesk">
            {categories && (
              <Link href={`/category/${categories.edges[0].node.name.toLowerCase()}`} 
              prefetch={false}
              passHref><a><span>
              {tags
                ? categories.edges[0].node.name + ","
                : categories.edges[0].node.name}
            </span></a></Link>
              
            )}

            {tags ? (
              <Link
                href={`/tag/${tags?.edges[0].node.name}`}
                prefetch={false}
                passHref
              >
                <a>
                  <span className="pl-1">{tags?.edges[0].node.name}</span>
                </a>
              </Link>
            ) : (
              ""
            )}
          </div>

          <div className="flex space-x-2 text-xs h-fit mt-1">
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
