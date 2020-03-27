import GitHub from "github-api";
// basic auth
export const gh = new GitHub({
   username: 'benjackson90',
   password: process.env.GATSBY_GITHUB_PASSWORD,
   token: process.env.GATSBY_GITHUB_TOKEN,
});
