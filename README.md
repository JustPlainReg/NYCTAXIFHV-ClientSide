# 
# Encompass Product and Pricing - Enabling Next Generation of connectivity
#
## Quick Start 

From within the apps directory run the following:
    npm start or yarn start

## Learning React

Follow the tutorial:
https://facebook.github.io/react/tutorial/tutorial.html

## Learning Redux

Watch the videos and try the samples:
https://github.com/reactjs/redux

# Next Gen - Encompass Product and Pricing(EPPS)

The Dynamic Mortgage Application will give the user an opprutunity to order Product and Pricing Service. It will allow the users to select and lock a specific rate.
* 
## Table of Contents
1. [Requirements](#requirements)
1. [Installation](#getting-started)
1. [Running the Project](#running-the-project)
1. [ESLint Setup](#eslint-setup)
1. [Project Structure](#project-structure)
1. [Live Development](#local-development)
    * [Hot Reloading](#hot-reloading)
    * [Redux DevTools](#redux-devtools)
1. [Routing](#routing)
1. [Testing](#testing)
    * [dirty-chai](#dirty-chai)
1. [Building for Production](#building-for-production)
1. [Deployment](#deployment)

## Requirements
* node `^5.0.0`
* yarn `^0.23.0` or npm `^3.0.0`

## Installation

After confirming that your environment meets the above [requirements](#requirements), you can create a new project based on `react-redux-starter-kit` by doing the following:

```bash
$ git clone http://githubdev.dco.elmae/Elliemae/EPPS.NGen.Web.ClientSide.git <epps-ng>
$ cd <epps-ng>
```

When that's done, install the project dependencies. It is recommended that you use [Yarn](https://yarnpkg.com/) for deterministic dependency management, but `npm install` will suffice.

```bash
$ yarn  # Install project dependencies (or `npm install`)
```

## Running the Project

After completing the [installation](#installation) step, you're ready to start the project!

```bash
$ yarn start  # Start the development server (or `npm start`)
```

While developing, you will probably rely mostly on `yarn start`; however, there are additional scripts at your disposal:

|`yarn <script>`    |Description|
|-------------------|-----------|
|`start`            |Serves your app at `localhost:3000`|
|`build`            |Builds the application to ./dist|
|`test`             |Runs unit tests with Karma. See [testing](#testing)|
|`test:watch`       |Runs `test` in watch mode to re-run tests when changed|
|`lint`             |[Lints](http://stackoverflow.com/questions/8503559/what-is-linting) the project for potential errors|
|`lint:fix`         |Lints the project and [fixes all correctable errors](http://eslint.org/docs/user-guide/command-line-interface.html#fix)|

## Developer Parameters

* clearSavedState: Clear any stored redux state so you can start fresh. http://localhost:3000/?siteid=5895829589&lar=admin&clearSavedState=true
* workflowLocal: Load default theme/workflow from the repository. http://localhost:3000/?siteid=5895829589&lar=admin&clearSavedState=true&workflowLocal=form

## ESLint Setup
### VScode
* Install ESLint plugin REF:: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
* Restart VScode
* If plugin does not active and not showing any error after restart, enable  ESLint plugin in VScode with project settings
  * Open .vscode/setting.json file
  * Add property "eslint.enable": true
  * 

### WebStorm

#### Install ESlint

Use npm to install ESLint globally along with eslint plugins.

_npm install -g eslint eslint-config-standard eslint-plugin-promise eslint-plugin-standard_

#### Choose the right plugin for Webstorm

WebStorm ships with an ESLint plugin built in. I suggest you use it. I have tried to use a 3rd party plugin and ran into several issues I have not been able to resolve.

In OS X, the plugin is located in:

WebStorm > Preferences > Languages and Frameworks > JavaScript > Code Quality Tools > ESLint

#### Eslint Plugin Configuration

Go ahead and enable the plugin by clicking the checkbox

PATH TO NODE INTERPRETER - Fill in the node path. On OS X, the standard path is /usr/local/bin/node, if you are using NVM, it will be something like ~/.nvm/versions/node/v5.10.1/bin/node

PATH TO ESLINT - Fill in the path to ESlint by setting the path to the eslint node package folder installed globally. Do not set the path to the /bin subdirectory.

.ESLINTRC - Use the defaults for the remaining options. let Webstorm search for the .eslintrc file. Additional rules directory remains empty. Extra eslint options remains empty as well

#### Eslint Configuration

A default .eslintrc configuration file is already added in the project.

#### Fixing eslint errors in webstorm

If everything above works ok, you should start observing eslint related errors in webstorm at top right corner of your editor.

#### Configure Webstorm for project style

Webstorm also provides default code inspection, which can be very annoying since it marks stuff in red. Follow these steps to make it look better.

Turn off your IDE
Figure out where your configuration lives (IDE Settings section)
Navigate to your-config-dir/codestyles. If this directory doesn't exist, create it in the WebStorm config settings directory.
Create a Standard.xml file:

<code_scheme name="Standard">
  <JSCodeStyleSettings>
    <option name="USE_SEMICOLON_AFTER_STATEMENT" value="true" />
    <option name="USE_DOUBLE_QUOTES" value="false" />
    <option name="SPACES_WITHIN_OBJECT_LITERAL_BRACES" value="true" />
  </JSCodeStyleSettings>
  <XML>
    <option name="XML_LEGACY_SETTINGS_IMPORTED" value="true" />
  </XML>
  <codeStyleSettings language="JavaScript">
    <option name="KEEP_BLANK_LINES_IN_CODE" value="1" />
    <option name="SPACE_WITHIN_BRACKETS" value="true" />
    <option name="SPACE_BEFORE_METHOD_PARENTHESES" value="true" />
    <option name="KEEP_SIMPLE_BLOCKS_IN_ONE_LINE" value="true" />
    <option name="KEEP_SIMPLE_METHODS_IN_ONE_LINE" value="true" />
    <indentOptions>
      <option name="INDENT_SIZE" value="2" />
      <option name="CONTINUATION_INDENT_SIZE" value="2" />
      <option name="TAB_SIZE" value="2" />
    </indentOptions>
  </codeStyleSettings>
</code_scheme>

Fire up the IDE and open a Settings/Preferences screen (choose between project and default settings accordingly to your preference)
Under Editor > Code Style > JavaScript change Scheme to Standard

## Project Structure

The project structure presented below is functionality grouped primarily by feature rather than file type. If you wish to read more about this pattern, please check out this [awesome writeup](https://github.com/davezuko/react-redux-starter-kit/wiki/Fractal-Project-Structure) by [Justin Greenberg](https://github.com/justingreenberg).

```
.
├───build
│   ├───lib
│   └───scripts
├───public
├───server
├───src
│   ├───common
│   │   ├───actions
│   │   ├───constants
│   │   ├───helpers
│   │   ├───middleware
│   │   ├───reducers
│   │   ├───services
│   │   ├───styles
│   │   └───utils
│   ├───components
│   │   ├───assets
│   │   ├───core
│   │   ├───fields
│   │   ├───services
│   │   └───shared
│   ├───containers
│   ├───layouts
│   │   └───PageLayout
│   ├───routes
│   │   └───Manager
│   │       ├───components
│   │       └───containers
│   ├───store
│   └───styles
└───tests
    ├───layouts
    ├───routes
    │   ├───Counter
    │   │   ├───components
    │   │   └───modules
    │   └───Home
    │       └───components
    └───store
```

## Live Development

### Hot Reloading

Hot reloading is enabled by default when the application is running in development mode (`yarn start`). This feature is implemented with webpack's [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement.html) capabilities, where code updates can be injected to the application while it's running, no full reload required. Here's how it works:

* For **JavaScript** modules, a code change will trigger the application to re-render from the top of the tree. **Global state is preserved (i.e. redux), but any local component state is reset**. This differs from React Hot Loader, but we've found that performing a full re-render helps avoid subtle bugs caused by RHL patching.

* For **Sass**, any change will update the styles in realtime, no additional configuration or reload needed.

### Redux DevTools

**We recommend using the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).**
Using the chrome extension allows your monitors to run on a separate thread and affords better performance and functionality. It comes with several of the most popular monitors, is easy to configure, filters actions, and doesn't require installing any packages in your project.

However, it's easy to bundle these developer tools locally should you choose to do so. First, grab the packages from npm:

```bash
yarn add --dev redux-devtools redux-devtools-log-monitor redux-devtools-dock-monitor
```

Then follow the [manual integration walkthrough](https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md).

## Routing
We use `react-router` [route definitions](https://github.com/ReactTraining/react-router/blob/v3/docs/API.md#plainroute) (`<route>/index.js`) to define units of logic within our application. See the [project structure](#project-structure) section for more information.

## Testing
To add a unit test, create a `.spec.js` file anywhere inside of `./tests`. Karma and webpack will automatically find these files, and Mocha and Chai will be available within your test without the need to import them. Here are a few important plugins and packages available to you during testing:

### dirty-chai

Some of the assertions available from [chai](chaijs.com) use [magical getters](http://chaijs.com/api/bdd/#method_true). These are problematic for a few reasons:

1) If you mistype a property name (e.g. `expect(false).to.be.tru`) then the expression evaluates to undefined, the magical getter on the `true` is never run, and so your test silently passes.
2) By default, linters don't understand them and therefore mark them as unused expressions, which can be annoying.

[Dirty Chai](https://github.com/prodatakey/dirty-chai) fixes this by converting these getters into callable functions. This way, if mistype an assertion, our attempt to invoke it will throw due to the property being undefined.

```js
// This silently passes because the getter on `true` is never invoked!
it('should be true', () => {
  expect(false).to.be.tru // evalutes to undefined :(
})

// Much better! Our assertion is invalid, so it throws rather than implicitly passing.
it('should be true', () => {
  expect(false).to.be.tru() // `tru` is not defined!
})
```

## Building for Production

## Deployment

Out of the box, this starter kit is deployable by serving the `./dist` folder generated by `yarn build`. This project does not concern itself with the details of server-side rendering or API structure, since that demands a more opinionated structure that makes it difficult to extend the starter kit. The simplest deployment strategy is a [static deployment](#static-deployments).

### Static Deployments

Serve the application with a web server such as nginx by pointing it at your `./dist` folder. Make sure to direct incoming route requests to the root `./dist/index.html` file so that the client application will be loaded; react-router will take care of the rest. If you are unsure of how to do this, you might find [this documentation](https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md#configuring-your-server) helpful. The Express server that comes with the starter kit is able to be extended to serve as an API and more, but is not required for a static deployment.

