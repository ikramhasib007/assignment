# assignment

## Two application in this project. Client and Backend
Please downlaod and navigate each app with your terminal or command prompt

## [Backend]
```
yarn && yarn run dev
```
Make sure mongodb service is on your machine. ENV file is included `./config`

## [Client]
Please create a `.env.development.local` on the `client` root.
sample values are
```
DOMAIN=localhost
PROTOCOL=http
PORT=3000
API_PORT=6001

BASE_URL=http://localhost:3000
STATIC_URL=http://localhost:6001
API_URL=http://localhost:6001/graphql
SUBSCRIPTION_URL=ws://localhost:6001/subscriptions
SESSION_TOKEN_SECRET=secret667766

```
Then
```
yarn && yarn run dev
```
