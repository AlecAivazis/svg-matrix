module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        library: 'webpackNumbers',
        libraryTarget: 'umd',
    }
}
