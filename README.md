This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Unit tests
To run unit tests:
```bash
npm test
# or
yarn test
```

## Assumptions
- Timed myself for only implementation and writing tests. Does not include the following: time spent researching, setting up/installing packages, dependencies and writing README.
- We were allowed to use a UI library - I used shadcn

## Trade offs
- Copied and pasted example component code snippets from shadcn UI website and kept their tailwind CSS styling - I just edited the logic to save time. I have only briefly played around with tailwind CSS before, as I've only professionally used styled-components but shadcn was not compatible with it so I opted for tailwind CSS.
- Got help from AI for writing pagination logic as shadcn's pagination component made things a lot more complex than just setting up a handler to swap between pages. I got stuck here for a while as the pagination component (https://ui.shadcn.com/docs/components/pagination) is a lot different to what I'm used to working with. AI was used for both the Home page and Home page test beforeEach().

## Design decisions
- Decided to use NextJS instead of React's create-react-app, which is what I'm used to professionally, as it has been deprecated and has vulnerability warnings. I already had some basic knowledge about NextJS so it wasn't too time-consuming to create a one-page app.
- Used the shadcn/ui component library for quick React UI components without need of styling to make it look readable/presentable on my own.
- Created table in the home page so the API call is automatically called
- Tried to make api calls as generic and reusable as possible by adding all possible params even though we are only using species

## What I would do if I had more time
- Learn how to create and add search button as I'm not familiar with the logic behind it and how it works with NextJS
- Change table to have extra rows with possibly character id and a 'view' button just so it's more readable
- Write tests for disabling 'Previous' and 'Next' buttons for pagination in Home page