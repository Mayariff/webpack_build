import webpack from 'webpack';
import {buildWebpack} from './config/build/buildWebpack'
import {buildModeType, buildPathsType, buildPlatformType} from "./config/build/types/types";
import path from "path";



type envVariablesType ={
    mode : buildModeType
    port?: number
    analyzer?:boolean
    platform?: buildPlatformType
}

export default (env: envVariablesType) => {

    const paths:buildPathsType ={
        entry:  path.resolve(__dirname, 'src', 'index.tsx'), //точка входа в App
        html: path.resolve(__dirname, 'public', 'index.html'), //путь до html который берем за шаблон
        public: path.resolve(__dirname, 'public'), //путь до иконки фавикон
        output: path.resolve(__dirname, 'build'),  //куда кладем сборку
        src: path.resolve(__dirname, 'src') //путь до src для алиасов в buildResolvers
    }

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        analyzer: env.analyzer,
        platform: env.platform ?? "desktop",
        paths
    })
    /* //чтобы гибко настраивать сборку
    const isDev = env.mode === "development"
    const isProd =  env.mode === "production"*/
   /*const config: webpack.Configuration=   {
        mode: env.mode ?? "development",//в каком режиме сборка (если она не задана, то собираем в dev) https://webpack.js.org/guides/environment-variables/#root
        entry:  path.resolve(__dirname, 'src', 'index.tsx'), //=='./src/index.tsx',  js /jsx / ts // путь к точке входа
        output: { //куда и с каким названием бандл будет уходить
            filename: '[name].[contenthash].js', // название меняем, чтобы всегда до нас доходили актуальные файлы , а не из кэша https://webpack.js.org/configuration/output/#template-strings
            path: path.resolve(__dirname, 'build'),
            clean: true //перед новой сборкой удалить старые файлы
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html') // передаем путь к файлу, который мы хотим брать шаблоном html для сборки
            }),
            isDev && new webpack.ProgressPlugin( {percentBy: 'entries'}), //чтоб смотреть прогресс сборки (тормозит prod сборку)
            isProd && new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css', //куда сохраняем файл
                chunkFilename: 'css/[name].[contenthash:8].css'  //куда сохраняем чанки
            })
        ].filter(Boolean), //фильтруем, чтоб не попали плагины, кот мы отключили для конкретного режима,
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                      isDev?  "style-loader" : MiniCssExtractPlugin.loader, //вместо  "style-loader"
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
                {
                    //по React - без ts пришлось бы babel настраивать, чтоб мочь работать с JSX
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
       devtool: isDev ? 'inline-source-map': undefined,
       devServer:  isDev ? {
           static: './dist',
           port: env.port ?? 3000,
           open: true
       }: undefined,
    }*/
    return  config
};