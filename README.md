## BARBER SITE PROJECT - Making reservations was never that easy
<img width="945" alt="image" src="https://github.com/Simone-shalom/barber-site/assets/117103936/eeda3372-743a-4f9e-90fb-2ac94d39a086">


##Introduction
Modern reservation app with client/admin roles to create and manage your customers

Tech Stack: 
 - Next.js – framework
 - Typescript – language
 - Tailwind, shadcn – CSS
 - Upstash – redis
 - Mongodb, Prisma – database
 - NextAuth.js – auth
 - Vercel – hosting

##Making reservations
Client can make reservation only on not taken dates and times, is rateLimited by upstash redis 
<img width="935" alt="Zrzut ekranu 2023-09-07 124549" src="https://github.com/Simone-shalom/barber-site/assets/117103936/4e02a7c9-29b2-4311-a06d-42045d692fb9">

##Managing your visits
User can  cancel incoming reservation or pay for visit(*in future) 
<img width="483" alt="Zrzut ekranu 2023-09-07 124607" src="https://github.com/Simone-shalom/barber-site/assets/117103936/b9c1746a-cfce-420d-9d42-6759297150f0">

##Admin panel
Allowes admin to remove incoming reservation, check for free hours for relevant day and see statistics 
<img width="696" alt="Zrzut ekranu 2023-09-07 124353" src="https://github.com/Simone-shalom/barber-site/assets/117103936/25f79220-10b6-4cf2-b9b2-8284157538af">

##Managing reservations
Admin can watch made reservations and delete them in case
<img width="934" alt="Zrzut ekranu 2023-09-07 124505" src="https://github.com/Simone-shalom/barber-site/assets/117103936/a0784545-9516-41db-9896-0eaea77b18c1">

##Creating listing
Admin can create new listings which will be displayed and available for users
<img width="929" alt="Zrzut ekranu 2023-09-07 124444" src="https://github.com/Simone-shalom/barber-site/assets/117103936/2ef11c94-8970-4458-a0f6-5c960c1ef7c0">

##Notifications
Admin is getting messages about all users actions: making and removing reservations 
<img width="664" alt="Zrzut ekranu 2023-09-07 130240" src="https://github.com/Simone-shalom/barber-site/assets/117103936/92010302-78a8-46cf-84f6-9437299461a0">


##Implementation:
-Authentication using nextAuth
-Rate limiting using upstash/redis
-Handling client/user functionalities
-Prisma as ORM for db
-Responsive design 
-Payments(paddle.js)-* in future


##Local Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
