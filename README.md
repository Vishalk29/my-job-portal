# React + Vite

This template provides a minimal setup to get React working in Vite - npm create vite@latest

# Installing shardCn which is build on top of tailwind css

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
then other step present in thi link - https://ui.shadcn.com/docs/installation/vite
```

# Installing the shadcn component

```
npx shadcn@latest add accordion carousel card drawer input label radio-group select textarea button
```

# Setting up SupaBase database

```
1 . login into supabase application with git credential -https://supabase.com/
2 . click on oragnization
3 . provide the details name org , personal , o$ / month
4 . Now click on connect
5 . select App Framework
6 . click on react - vite
7 . it will give the data add that into .env file
8 . create the .env file , supabase.js file ,
```

# Cleark authetication setup

```
1 . Go to the link https://clerk.com/
2 . sign in with github
3 . then run this command in code - npm install @clerk/clerk-react
4 . add something in env file
5 . to config the cleark we need to do some changes in the main.jsx / main.tsx (cleark provider need to add)
6 . now signin,signout code
7 . to change the theme we need to install one more npm package npm install @clerk/themes
8 . add this inside the main.jsx/tsx inside clearkprovider as apperance/basetheme
```

# Connecting supabase to cleark below link which provide the step

```
1 . https://supabase.com/partners/integrations/clerk
2 . run the command npm i @supabase/supabase-js
```

# installed the one package for autoplay carusole

```
npm i embla-carousel-autoplay and used in carosoule
```

# Using react-spinners

```
for loading
```

# Adding the table in supabase

```
ADDING THE TABLE
go to supabase > table editor > click on create table > adding the name
we can cascade that allow to delete and add
ADDING/ STORING
go to supabase > storage > create for resume and company logo
ADDING ENUMRATED TYPE
go to supabase >database > create the enum by clicking on Database Enumerated Types > adding the enum
ADDING POLICY TO TABLE
go supbase authentication > create policy > enable all read access > and do nessarry modification

```

# Saved unsaved job

```
I need to update the policy for saved_job table need to update userid + job_id from job table saved_job ={id =1} added
Insert only allowed authenticated user
Delete Only delete (requesting_user_id() = user_id) and it will update in supabase
```

# installing npm i @uiw/react-md-editor

```
What we are looking for inside that we using this show the requirement in dots
///////////////////
Update the policies for jobs recruiter_id authenticated( (requesting_user_id() = recruiter_id))
```

# Applying job section

```
first applying the policy (enable insert for autheticated users only )for and installing react-hook-form with zod and resolvers
npm i react-hook-form zod @hookform/resolvers
```
