const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    //const CSSExtract = new MiniCssExtractPlugin('styles.css');

    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        mode: 'development',
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            ['@babel/preset-react',
                            {"modules": false}]
                        ],
                        plugins: [
                            '@babel/plugin-transform-modules-commonjs',
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-object-rest-spread'
                        ]
                    }
                }
            }, {
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'styles.css'
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-cheap-module-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true
        }
    };
};



