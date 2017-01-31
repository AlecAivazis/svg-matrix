var path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        library: 'webpackNumbers',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /.jsx?/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                loader: "babel-loader"
            }
        ]
    }
}
