# Megane

A point of sales system made with NextJs, Prisma and CockroachDB.

## Features

To be added

#### This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## API Routes

The API uses the following libraries :

```json
		"@prisma/client": "^4.9.0",
		"bcryptjs": "^2.4.3",
		"jsonwebtoken": "^9.0.0",
```

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api](http://localhost:3000/api/*). This endpoint can be edited in `pages/api/*`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## User Previlages

1 : User is a guest

2 : User is registered

3 : User is a store Owner

4 : User is an admin

## To do

1. Credential checking
1. installment api
1. ui overhaul (again)
1. type safety
1. scanner api
