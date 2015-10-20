Chat-client
==============

This is a project I completed as a student at Hack Reactor. This project was worked on with a pair. During the project we built a chat client consuming some parse API. The final client app
is built in backbone.

## Structure:

The repository consist of

- backbone app
- test Specs files.

### BoardViewer - backbone

The clinet is backbone app allowing to chose rooms, and fetch/post messages from ant to a parse based API backend.

to run it, simply open `./client/index.html` with your browser

### SpecRunner - mocha

The specrunner contain both the tests for the client

**Some code may be written in ES6 and may require to be transpiled in order to be tested**.

### Requirements

ES6 enabled on chrome `chrome://flags/#enable-javascript-harmony.`
Babeljs.io for transipiling.

### Testing

Tests are made with the [Mocha](https://github.com/mochajs/mocha) testing framework.
Test are located in the ./spec directory. To run the Just open the spec runner file with chrome.

```
SpecRunner.html
```
