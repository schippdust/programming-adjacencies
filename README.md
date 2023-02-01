# Programming and Adjacency Interactive Data Tool

This tool is still in early phases of development and is not entirely stable as of yet!

This simple client side web application has been developed as an open source teaching tool for a course about architectural programming taught through the College of Design at the University of Minnesota.  It has also been developed to be robust enough to be used by practicing architects as an interface that can be used to create more structured data than a typical Excel document can support, and manage complex adjacency relationships.

This platform is open source and can be viewed as a starting point for firms interested in further developing this interface and integrating it into their existing processes and approaches.

If you would like to contribute to the development of the open source component of this project, please create an issue and pull request for your contributions.  The rest of this README is conventional boilerplate for a Vue 3 / TypeScript project, and uses NPM to manage its dependencies.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
