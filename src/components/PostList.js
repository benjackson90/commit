import React from 'react';
import { Card } from "../components/Card"
import { PostModal } from "../components/PostModal";

export const PostList = ({ pathname, posts, post, slug }) => {

  return (
    <>
      <PostModal pathname={pathname} slug={slug} post={post} />
      <div className="flex flex-wrap -mx-2">
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return <Card post={node} key={title} />
        })}
      </div>
    </>
  )
}
