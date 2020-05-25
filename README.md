# Sassy
SaaS Platform meant to get started with a SaaS style product straight away. The goal is to take care of most of the boilerplate surrounding a SaaS and make it easier to actually build something awesome.

What this currently takes care of:
1) Basic front-end
2) User Management (Powered by Okta)

## Requirements

1. [Node.js](https://nodejs.org/en/)

## Getting Started

1. Clone
2. Run `npm install`.
3. Sign up for an [Okta developer account](https://developer.okta.com/).
4. Make a copy of `sassy.config.js.example`, rename it to `sassy.config.js` and put real values in there for the secrets. See the file for more details on where to find each value.
5. Drop your app (angular, react, vue, etc) inside the 'app' folder. Make sure the entry-point is configured correctly. 
6. run `npm start`.

See what you've got at `localhost:3000` in your browser

## Moving forward

Look at the Todo.md to see what's being planned.
Can also view `SAAS Framework.xmind` to see a more graphical representation of what's being planned for this project.