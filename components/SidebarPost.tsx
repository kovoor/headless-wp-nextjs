import React from 'react'
import Date from "./Date";

export const SidebarPost = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  tags,
  categories
}: any) => {

  const name = author
    ? author.firstName && author.lastName
      ? `${author.firstName} ${author.lastName}`
      : author.name
    : null

  return (
    <div className='flex-col border bg-white rounded-md px-4 py-4  w-full cursor-pointer'>
      
      {/* Image */}
      <div className="flex w-full h-44">
        <img
          className="object-cover w-full h-full"
          src={coverImage?.sourceUrl}
        />
      </div>

      {/* Post Title */}
      <div className="group flex flex-col flex-1 px-2">
        <h2 className="text-base font-bold mt-4 mb-2 font-Space-Grotesk group-hover:underline">
        {title}
        </h2>

        {/* Post Excerpt */}
        <div className="flex pt-1 max-h-9 sm:max-h-13 md:max-h-12 lg:max-h-16 w-full line-clamp-3 whitespace-normal text-ellipsis overflow-hidden">
          <div className="text-gray-500 text-xs md:text-sm lg:text-md xl:text-md" dangerouslySetInnerHTML={{ __html: excerpt }} />
        </div>

        {/* Tags */}
        <div className="flex flex-col mt-4">
          {/* Author + Date */}
          <div className="flex text-xs font-semibold font-Space-Grotesk">
            <span>{tags.nodes.length > 0 ? categories.nodes[0].name + "," : categories.nodes[0].name}</span>
            {
              tags.nodes.length > 0 ? <span className="pl-1">{tags?.nodes[0]?.name}</span> : <></>
            }
          </div>

          <div className="flex space-x-2 text-xs h-fit mt-2">
            <span>{name}</span>
            <span className="pl-2 border-l"><Date className="pl-2 border-l" dateString={date} /></span>
          </div>
        </div>
      </div>

    </div>
  )
}
