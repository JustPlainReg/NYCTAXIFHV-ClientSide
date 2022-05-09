const NODE_ENV = process.env.NODE_ENV
const PUBLIC_PATH = NODE_ENV === 'development' ? 'http://localhost:3003/' : '/NYCTAXI.NG/'
module.exports = {
  /** The environment to use when building the project */
  env: process.env.NODE_ENV,
  /** The config you want to use */
  config: process.env.CONFIG || 'local',
  /** The full path to the project's root directory */
  basePath: __dirname,
  /** The name of the directory containing the application source code */
  srcDir: 'src',
  /** The file name of the application's entry point */
  main: 'main',
  /** The name of the directory in which to emit compiled assets */
  outDir: 'dist',
  /** The base path for all projects assets (relative to the website root) */
  publicPath: PUBLIC_PATH,
  /** Whether to generate sourcemaps */
  sourcemaps: (process.env.CONFIG=='development' || process.env.CONFIG=='qa') ? true: false,
  /** A hash map of keys that the compiler should treat as external to the project */
  externals: {},
  /** A hash map of variables and their values to expose globally */
  globals: { PUBLIC_PATH_GLOBAL: `'${PUBLIC_PATH}'` },
  /** Whether to enable verbose logging */
  verbose: false,
  /** The list of modules to bundle separately from the core application code */
  vendors: [
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'redux-thunk',
    'react-router'
  ]
}
