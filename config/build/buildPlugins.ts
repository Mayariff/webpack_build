import MiniCssExtractPlugin, {Configuration} from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack, {DefinePlugin} from "webpack";
import {buildOptionType} from "./types/types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";


export function buildPlugins(options: buildOptionType): Configuration["plugins"] {

    //чтобы гибко настраивать сборку
    const isDev = options.mode === "development"
    const isProd = options.mode === "production"

    //массив с плагинами
    const plugins: Configuration["plugins"] = [
        new HtmlWebpackPlugin({
            template: options.paths.html, //=== path.resolve(__dirname, 'public', 'index.html')
            // передаем путь к файлу, который мы хотим брать шаблоном html для сборки
            favicon: path.resolve(options.paths.public, 'favicon.ico') // путь к фавикону
        }),
        new DefinePlugin({
                __PLATFORM__: JSON.stringify(options.platform) //называем определенным образом, чтобы всем было понятно откуда эта переменная
                //все значения в стрингифай делаем
            }
        ),
    ]
    if (isDev) {
        plugins.push(
            new webpack.ProgressPlugin({percentBy: 'entries'}))
        //плагин, чтоб смотреть прогресс сборки (тормозит prod сборку))
        plugins.push(new ForkTsCheckerWebpackPlugin()) // выносит проверку типов в отдельный процесс
        plugins.push(new ReactRefreshWebpackPlugin()) //чтоб не перезагружалась страница при изменениях
    }

    if (isProd) {
        plugins.push(
            //плагин, чтоб css файлы собирались в отдельный файл
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css', //куда сохраняем файл
                chunkFilename: 'css/[name].[contenthash:8].css'  //куда сохраняем чанки
            })
        )
        plugins.push(new CopyPlugin({
            //для копирования файлов в сборку (нпр переводы)
            patterns: [
                {from: path.resolve(options.paths.public, 'locales'), to: path.resolve(options.paths.output, 'locales')}
            ],
            options: {
                concurrency: 100,
            },
        }),)
    }
    if (options.analyzer) {
        plugins.push(new BundleAnalyzerPlugin())
    }

    return plugins
    //.filter(Boolean) // фильтруем, чтоб не попали плагины, кот мы отключили для конкретного режима из за блоков if фильтрацию убрали
}