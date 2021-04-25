# Paths and Require

You'll notice that in the files from the codebase most of the time we don't use `../` on the `require`s or `import`s but instead we require files from the application as the root of the project as a Node package.

It's important to warn you that **it's not the default behavior of Node's require**, but we change that defining setting it in a `.babelrc.js` and this paths are correct after building. To suuport code completion and improve intellisense we set the files path in the `jsconfig.json` file.
