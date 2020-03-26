import React from 'react';
import { navigate } from '@reach/router';

const findImage = (str) => {
  const elem = document.createElement('div');
  elem.style.display = 'none';
  document.body.appendChild(elem);
  elem.innerHTML = str;
  const imageEl = elem.querySelector('img');

  return imageEl ? imageEl.outerHTML : '';
}

export const Card = ({ post }) => {
  const onClick = () => {
    navigate(`?p=${post.fields.slug}`);
  }

  const url = new URL(post.frontmatter.link || "")
  const imageHtml = findImage(post.html);

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 m-4 px-2" onClick={onClick}>
      <div className="group block no-underline h-full overflow-hidden rounded-sm relative shadow-md">
        <div className="select-none cursor-pointer flex flex-col h-full">
          {imageHtml ? (
            <div className="h-48 w-full relative" dangerouslySetInnerHTML={{ __html: imageHtml }} />
          ) : (
            <div className="h-48 w-full relative bg-gray-100">
              {/* <img className="transition-all duration-200 group-hover:scale-110 h-48 w-full object-cover" src="https://images.unsplash.com/photo-1585144570630-65b30922ff03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" /> */}
            </div>
          )}

          <div className="p-5 flex flex-col justify-between flex-1">
            <div className="flex flex-wrap">
              {post.frontmatter.tags.map(tag => (
                <span key={tag} className="inline-block bg-pink-200 text-pink-800 text-xs px-2 rounded-full font-semibold tracking-wide mr-2">{tag}</span>
              ))}
            </div>
            <h3 className="text-base leading-normal font-semibold text-gray-900">{post.frontmatter.title}</h3>
            <p className="text-sm leading-snug text-gray-600">{post.excerpt}</p>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-pink-600 leading-normal font-medium">{url.hostname}</span>
              </div>
              <span className="text-sm text-green-500 leading-normal">
                Free
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
