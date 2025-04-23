# Shaper React Embedding Demo

Embed a [Shaper](https://taleshape.com/shaper/) dashboard into an HTML page

See the [Shaper documentation](https://taleshape.com/shaper/docs/embedding/) for more details.

---

See the [index.html](./index.html) for you to include the Shaper embedding script and embed a dashboard.

The HTML page is served by a Node.js server which also provides an endpoint to generate a JWT token.

See [server.js](./server.js) for how to call the Shaper API to generate a JWT token.

Make sure to only always generate the JWT on your server and never expose your API key in the client code.


## Getting Started

### Run Shaper

Make sure you have Docker installed and running. Then, start the Shaper server:

```bash
npm run shaper
```

The demo database is included in the Git repository and it should work automatically.

You can visit the Shaper UI at http://localhost:5454


### Run the Node.js app

Start the server:

```bash
npm start
```

Then open http://localhost:3001 in your browser.

