## Star Online Realtime Web Application Boilerplate

Star is a boilerplate for an online realtime web application written in Javascript. The UI is available with different languages support. It's a clone of project [lila](https://github.com/ornicar/lila).

It relies on [Express](https://expressjs.com/), [Websockets](https://github.com/HenningM/express-ws), and [MongoDB](https://mongodb.org/). The web client is written in [snabbdom](https://github.com/snabbdom/snabbdom), and [Sass](https://sass-lang.com/).

## Installation

### Prerequisites

    Before beginning, please make sure you have the following tools installed

#### Tools and dependency managers

* git
* [node](https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions)
* [yarn](https://yarnpkg.com/lang/en/docs/install/)
* gulp-cli (yarn global add gulp-cli)

### Installation Steps

1. Fork the star project `git clone --recursive https://github.com/eguneys/star`
2. Compile the client side modules `./ui/build`
3. Run `yarn run devstart`
4. Navigate to `http://localhost:3000/` with a browser

### Faster builds
To speed up `./ui/build`, install GNU parallel.

## How to work on

### User Interface

The UI modules are in `ui/`. To work on `ui/round`, Enable auto-recomile:
```
cd ui/round
gulp
```

### Translations
1. New translation keys are added in `translation/source/site.xml` and `translation/dest/`
2. Then regenerate translation keys with `node bin/trans-dump.js`
