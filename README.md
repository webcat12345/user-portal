# User Portal Website

[![codecov](https://codecov.io/gh/webcat12345/user-portal/branch/master/graph/badge.svg?token=XYSEDWWUUO)](https://codecov.io/gh/webcat12345/user-portal)

## Description

This project was created by [Angular](https://github.com/angular/angular) and deployed as a Github Page.

## Prerequisite

* This project will run on `node.js` environment.
* This is the frontend service, so to run this, you may need to run backend api on your local and change the [environment.ts](./src/environments/environment.ts) to refer the correct api url.
* By default, api url for the local environment is http://localhost:3000, you can check the [environment.ts](./src/environments/environment.ts).
* Or you can use the hosted api - https://user-portal-api-v1.herokuapp.com, you can check the [environment.prod.ts](./src/environments/environment.prod.ts).

## Technical specifications

* We are using [Tailwindcss](https://tailwindcss.com/) for the UI components, you can find out the default team from [tailwind.config.js](./tailwind.config.js)
* To improve the performance, we are trying to handle Change Detection Strategy carefully.

## About project configure

* Hosted on Github, and CI/CD configured using [Github Actions](https://github.com/features/actions) and [Github Pages](https://pages.github.com/)
* Github action will check code quality, such as lint, unit test for each git push actions
* When you push your code to the `master` branch, the [action](./.github/workflows/deploy.yml) will deploy your changes to the hosting.
* Each of your pushes will be automatically tested by the [action](./.github/workflows/code-quality-check.yml).
* Code coverage supported.

## Running on local environment

```bash
$ npm install
$ npm run start
# Or if you have @angular/cli installed globally on your computer
$ ng serve
```

## Running test manually

```bash
# unit tests
$ npm run test

# lint check
$ npm run lint
```
