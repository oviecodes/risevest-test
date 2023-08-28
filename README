### RISEVEST BACKEND TEST

This repo contains my solution to the risevest backend developer test.

#### Getting started

To get started, please have a working installation of redis and postgres either running directly on your machine or docker.
Provide the evironment variables as stated in the `.env.example` file, and pass it either through the `commandline` or through `Dockerfile`. This is important because this API makes use of environment variable.

With the environment variables provided build the image using the `docker build` command and then run the container using `docker run`

Implemented routes include

**user routes**

- register - (POST **_"/user/register"_**)
- login - (POST **_"/user/login"_**)
- uploads - (GET **_"user/uploads"_**)

**admin routes**

- register - (POST **_"/admin/register"_**)
- login - (POST **_"/admin/login_**")
- flag - (POST **_"/admin/flag"_**)

**\*uploads**

- retrieve file - (GET **_"/upload/:slug"_**)
- upload file - (POST **_"/upload"_**)
- create folder - (POST **_"/upload/folder"_**)
- get all user's folder - (POST **_"/upload/folder/all"_**)
- get all files in a folder - (POST **_"/upload/folder/single/:id"_**)

Revokable session management is implement through the use of JWT
Redis is used for caching files, to prevent making a request to aws at all times. Files are fetched on first request and stored in the redis cache for quick retrieval on subsequent requests.
