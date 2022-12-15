## Setting up wrangler

- Installing Wrangler CLI

```
npm install -g wrangler
```

- Logging in to wrangler

```
wrangler login
```

- Initialising a wrangler repository

```
wrangler init .
```

## Installing external packages

- itty-router

```
npm install itty-router
```

## Setting up KV

- KV for development environment

```
wrangler kv:namespace create LINKS --preview
```

Here `LINKS` is the name of my KV.

- KV for production environment

```
wrangler kv:namespace create LINKS
```

Cloudflare workers require us to have a preview KV for development and a separate KV for deployment to ensure we are not modifying production data while testing.

## Running the application

- Development mode (Using cloud):
  - Local but uses the workers in cloud.
  - The invocations of workers count towards the daily limit.
  - The KV used here is the test KV generated using the preview command. This means the KV data persists for development.

```
npm start
```

- Development mode (Locally):
  - Invocation of workers doesn't count towards the daily limit.
  - Everything is local even the test KV. This means that everytime you restart the worker all the data in the KV is lost since it is stored locally and then deleted after every restart.

```
npm start
```

Now once the application starts press `l` key in the terminal.

- Publishing the application

```
npm run publish
```
