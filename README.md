This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

## Online demo

### [https://fernandocamargo.com/recorder/](https://fernandocamargo.com/recorder/)

You may have issues regarding certificate. The [MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) API needs to be run into SSL in order to work on Google Chrome.

## Supported Browsers

* Chrome 64.0.3282.186
* Firefox 58.0.2

## Dependencies

* [classnames](https://www.npmjs.com/package/classnames) - Utility for composing class names in a saner way
* [immutability-helper](https://www.npmjs.com/package/immutability-helper) - Utility for changing the state shape in a more declarative way into [reducers](https://github.com/fernandocamargo/recorder/blob/master/src/components/app/reducers.js)
* [recompose](https://www.npmjs.com/package/recompose) - [High-Order Components](https://reactjs.org/docs/higher-order-components.html) FTW!
