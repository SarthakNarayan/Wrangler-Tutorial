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

Cloudflare workers requires us to have a preview KV for development and a separate KV for deployment to ensure we are not modifying production data while development.

If we go the KV section of cloudflare workers we can see 2 different KV's with the format `<project-name>-<KV-Namespace>` and `<project-name>-<KV-Namespace>_preview`. In my case its `wranger-tutorial-LINKS` and `wrangler-tutorial-LINKS_preview`.

The project name comes from the `name` section in `wrangler.toml` file.

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

## Resources

- https://developers.cloudflare.com/workers/examples/
- https://www.youtube.com/watch?v=WFlDSL7Nrzw
- https://developers.cloudflare.com/workers/wrangler/
- https://github.com/kwhitley/itty-router
- https://developers.cloudflare.com/workers/runtime-apis/kv/
