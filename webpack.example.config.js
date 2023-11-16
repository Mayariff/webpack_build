const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env) => {
    return  {
        mode: env.mode ?? "development",//в каком режиме сборка (если она не задана, то собираем в dev) https://webpack.js.org/guides/environment-variables/#root
        //entry:  path.resolve(__dirname, 'src', 'index.tsx'), //=='./src/index.tsx',  // путь к точке входа
        entry: {
            hello:  path.resolve(__dirname, 'src', 'index.tsx')
        }, //может быть несколько точек входа, но в 99% она одна
        output: {
            filename: '[name].[contenthash].js', // название меняем, чтобы всегда до нас доходили актуальные файлы , а не из кэша https://webpack.js.org/configuration/output/#template-strings
                path: path.resolve(__dirname, 'build'),
                clean: true //перед новой сборкой удалить старые файлы
        }, //куда и с каким названием бандл будет уходить
        plugins: [
            new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html') // передаем путь к файлу, который мы хотим брать шаблоном html для сборки
        }),
           new webpack.ProgressPlugin( {percentBy: 'entries'}) //чтоб смотреть прогресс сборки (тормозит prod сборку)
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
    }
};