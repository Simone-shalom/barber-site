## BARBER SITE PROJECT - Making reservations was never that easy
<img width="1260" alt="image" src="https://github.com/Simone-shalom/barber-site/assets/117103936/5dbdc19c-004e-4405-9b3d-c688fb5cced6">



## Introduction
### Modern fullstack reservation app with client/admin roles to create and manage your customers

## Tech Stack: 
 - [Next.js](https://nextjs.org/) – framework
 - [Typescript](https://www.typescriptlang.org/) – language
 - [Tailwind](https://tailwindcss.com/), [shadcn](https://ui.shadcn.com/) – CSS
 - [Upstash](https://upstash.com/) – redis
 - [Mongodb](https://www.mongodb.com/) – database
 - [Prisma](https://www.prisma.io/) - orm
 - [NextAuth.js](https://next-auth.js.org/) – auth
 - [Vercel](https://vercel.com/) – hosting
 - [Zustand](https://zustand-demo.pmnd.rs/) - state manager
 - [Framer-Motion](https://www.framer.com/motion/) - animations
 - [Stripe](https://stripe.com/) - Payments
 - [Jest](https://jestjs.io/) - unit testing *in future


### Landing page
  Responsive design showing preview of application for all customers
<img width="1258" alt="image" src="https://github.com/Simone-shalom/barber-site/assets/117103936/784792e9-714c-4861-9dfa-5f8b02435f31">


### Making reservations
  Client can make reservation only on not taken dates and times, is rateLimited by upstash redis 
<img width="1249" alt="image" src="https://github.com/Simone-shalom/barber-site/assets/117103936/2ca7c0cc-ade0-4414-b14a-544846e4eda7">


### Managing your visits
  User can  cancel incoming reservation or pay for visit(*in future) 
<img width="1253" alt="image" src="https://github.com/Simone-shalom/barber-site/assets/117103936/0bcd0337-ba0f-4071-b9f8-b1184d96c015">


### Admin panel
  Allowes admin to remove incoming reservation, check for free hours for relevant day and see statistics 
<img width="1274" alt="image" src="https://github.com/Simone-shalom/barber-site/assets/117103936/0629067a-673e-46d5-89d0-9d578a21ddcc">


### Managing reservations
  Admin can watch made reservations and delete them in case
<img width="1259" alt="image" src="https://github.com/Simone-shalom/barber-site/assets/117103936/0bd01b8b-87ac-4dff-ae88-8ab96aa0e26b">


### Creating listing
  Admin can create new listings which will be displayed and available for users
<img width="929" alt="Zrzut ekranu 2023-09-07 124444" src="https://github.com/Simone-shalom/barber-site/assets/117103936/2ef11c94-8970-4458-a0f6-5c960c1ef7c0">


### Notifications
  Admin is getting messages about all users actions: making and removing reservations 
<img width="1266" alt="image" src="https://github.com/Simone-shalom/barber-site/assets/117103936/f24895d7-a53f-4e94-a19e-cbe83c395a5c">


### SEO && Performance
  Amazing app performance utilising nextjs features
<img width="553" alt="image" src="https://github.com/Simone-shalom/barber-site/assets/117103936/5635d3ea-1150-4e51-b615-c614f761057d">




## Implementation:
 - Authentication using nextAuth
 - Created API's using REST 
 - Rate limiting using upstash/redis
 - Caching api data using redis
 - Handling client/user functionalities
 - Prisma as ORM for db
 - Responsive design
 - Animations using Framer-Motion
 - Managing global states with zustand
 - Forms using Zod
 - Uploading images with next-cloudinary
 - Seo optimization using nextjs features
 - Payments using stripe payments and webhooks
 - Testing with Jest *in future


## Credentials :
### Admin -  admin@gmail.com / admin1234
### User -  simon@gmail.com / simon1234


## Local Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
