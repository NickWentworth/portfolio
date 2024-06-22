# Portfolio

This is the source code for my portfolio and blog website, built with Next.js, React, and Tailwind CSS. Blog posts are statically compiled at build time using `next-mdx-remote` from markdown files.

## Usage

My portfolio is available online [here](https://nickwentworth.me)! It can also be hosted locally:

### Hosting Locally

1. Install [Node.js](https://nodejs.org/en), clone this repository, and change directory to the root of this project.

2. Install npm dependencies:

```bash
npm install
```

3. Run the Next.js server in either development mode with hot-reloading or production mode with statically built blog posts:

```bash
# development
npm run dev

# production
npm run build
npm run start
```

4. An output message should be shown with a local address (http://localhost:3000 by default). Visit in any browser to check out the website!
