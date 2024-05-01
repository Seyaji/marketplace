This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Change to the `/market` directory

```bash
cd /market
```

2. Install dependencies 

```bash
npm install
```

3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy marketplace is to use the [Vercel Platform](https://vercel.com/)

Deploy the repo using vercel, make sure you specify the `/market` directory in the settings as the source. This is the 

Then make a postgres for prisma database using vercels storage
Copy the credentials for your postgres database and put them in an `.env` file.

You should also setup an account with [alchemy](https://www.alchemy.com/) and create an API key for your alchemy app.
The alchemy api key should also be added into the `.env` file locally for devgelopment.

For your production and preview deployments add the alchemy API key in the settings section of your vercel project.

Your env file should look like this but instead of empty strings "" you should have the relevant keys.

the env file should be located in: `/marketplace/market.env`

```env
POSTGRES_URL=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NO_SSL=""
POSTGRES_URL_NON_POOLING=""
POSTGRES_USER=""
POSTGRES_HOST=""
POSTGRES_PASSWORD=""
POSTGRES_DATABASE=""

ALCHEMY_API=""
```

## View database in dev mode

Once everything has been setup correctly you can view and edit the database easily using prismas' development server.

Run it like this :

```bash
npx prisma studio
```

Open [http://localhost:5555](http://localhost:5555) with your browser to interact with the UI for easy backend editing!

