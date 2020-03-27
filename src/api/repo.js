import kebabCase from "lodash/kebabCase"
import get from "lodash/get";
import { gh } from "./";

function getName() {
  return '_' + Math.random().toString(36).substr(2, 9);
};

const commitRepo = gh.getRepo("benjackson90", "commit");

export const createPost = async (data) => {
  const content = `---
name: ${data.name}
title: ${data.title}
date: ${new Date()}
link: ${data.link}
price: ${data.price}
tags: ${JSON.stringify(data.tags)}
purpose: "page"
---
${data.content}
  `
  const path = `content/posts/${kebabCase(data.title)}/index.md`;

  try {
    const branchName = `${kebabCase(data.title)}-${getName()}`;
    // create branch
    const { data: branch } = await commitRepo.createBranch("master", branchName);
    // commit files
    const { data: file } = await commitRepo
      .writeFile(branchName, path, content, "Update content", {  commiter: { name: "benjackson90", email: "tungtbt03@gmail.com" } });
    // create pull request
    const { data: pullRequest } = await commitRepo
      .createPullRequest({
        title: `Create Post ${data.title}`,
        body: "Please merge these awesome changes in!",
        base: "master",
        head: `benjackson90:${branchName}`,
    });

    return get(pullRequest, 'html_url');
  } catch (e) {
    console.log(e)
    return false;
  }
  return false;

}
