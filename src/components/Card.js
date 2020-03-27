import React from 'react';
import get from "lodash/get";
import { navigate } from '@reach/router';
import ExternalLink from "../icons/external-link";
import { document } from 'browser-monads';
import Truncate from './ReactTruncate';

const findImage = (str) => {
  const elem = document.createElement('div');
  elem.setAttribute("style", "display: none;");
  document.body.appendChild(elem);
  elem.insertAdjacentHTML('beforeend', str);
  const imageEl = elem.querySelector('img');

  return imageEl ? imageEl.outerHTML : '';
}


function stopBubbles(e) {
  e.stopPropagation();
}

export const Card = ({ post }) => {
  const onClick = () => {
    navigate(`?p=${post.fields.slug}`);
  }

  const url = post.frontmatter.link ? new URL(post.frontmatter.link) : {}
  const imageHtml = findImage(post.html);
  console.log(imageHtml);

  return (
    <div className="w-full sm:w-card-1/2 md:w-card-1/3 lg:w-card-1/3 xl:w-card-1/4 m-2 px-2" onClick={onClick}>
      <div className="group block no-underline h-full overflow-hidden rounded-sm relative shadow-md">
        <div className="select-none cursor-pointer flex flex-col h-full">
          {imageHtml ? (
            <div className="h-48 w-full relative" dangerouslySetInnerHTML={{ __html: imageHtml }} />
          ) : (
            <div className="flex items-center justify-center flex-col h-48 w-full relative bg-gray-100">
              <span className="text-2xl text-pink-500 font-semibold">#AgainstCovid19</span>
              <span className="text-2xl text-pink-500 font-semibold">#{post.frontmatter.name}</span>
            </div>
          )}

          <div className="p-5 flex flex-col justify-between flex-1">
            <div className="flex flex-wrap">
              {(get(post,"frontmatter.tags") || []).map(tag => (
                <span key={tag} className="inline-block bg-pink-200 text-pink-800 text-xs px-2 rounded-full font-semibold tracking-wide mr-2">{tag}</span>
              ))}
            </div>
            <h3 className="text-base leading-normal font-semibold text-gray-900">{post.frontmatter.title}</h3>

            <p className="text-sm leading-snug text-gray-600">
              <Truncate lines={4}>{post.frontmatter.description}</Truncate>
            </p>
            <div className="flex justify-between items-center">
              <div>
                <a onClick={stopBubbles} className="text-sm text-pink-600 hover:text-pink-700 leading-normal font-medium flex items-center" href={post.frontmatter.link} target="_blank">
                  {url.hostname} <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
              <span className="text-sm text-green-500 leading-normal">
                {post.frontmatter.price || ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
