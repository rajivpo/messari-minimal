## Getting Started

Clone the repo, cd into it, and ensure that you're using node `12.20.0` (recommend using nvm to manage node versions on your local machine)

```
touch .env.local
echo MESSARI_API_KEY=YOUR_API_KEY > .env.local
yarn install
yarn dev
```

Feel free to navigate to assets from the home page (top 100 assets by market cap) or any other asset by going to /asset/$assetOfInterest

## Future work
- Implement server-side rendering
- Write functional UI tests
- Implement an in-memory store (e.g. redux)
- Extend functionality of app to better mirror API (e.g. enable more choices for price charts)
- Improve UX with animations
- Search
- Screener
- Portfolio tracking (connect to wallet)

