import webpack from "webpack";
import {buildDevServer} from "./buildDevServer";
import {buildLoaders} from "./buildLoaders";
import {buildPlugins} from "./buildPlugins";
import {buildResolvers} from "./buildResolvers";
import {buildOptionType} from "./types/types";

export function buildWebpack(options: buildOptionType): webpack.Configuration {

    const {mode, paths} = options
    //чтобы гибко настраивать сборку
    const isDev = mode === "development"
    const isProd = mode === "production"

    return {
        mode: mode ?? "development",//в каком режиме сборка (если она не задана, то собираем в dev) https://webpack.js.org/guides/environment-variables/#root
        entry: paths.entry, // путь к точке входа
        // path.resolve(__dirname, 'src', 'index.tsx') =='./src/index.tsx',  js /jsx / ts
        output: { //куда и с каким названием бандл будет уходить
            filename: '[name].[contenthash].js', // название меняем, чтобы всегда до нас доходили актуальные файлы , а не из кэша https://webpack.js.org/configuration/output/#template-strings
            path: paths.output, //path.resolve(__dirname, 'build')
            clean: true //перед новой сборкой удалить старые файлы
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'eval-nosources-cheap-source-map' : 'source-map',  //https://webpack.js.org/configuration/devtool/ виды сурс мапов для дева ребилд важен быстрый, для прода первая сборка
        devServer: isDev ? buildDevServer(options) : undefined,
    }
}