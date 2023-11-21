import {ModuleOptions} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {buildOptionType} from "./types/types";
import ReactRefreshTypeScript from "react-refresh-typescript";

export function buildLoaders(options: buildOptionType): ModuleOptions["rules"] {


    //чтобы гибко настраивать сборку
    const isDev = options.mode === "development"
    const isProd = options.mode === "production"

    //вынесли лоудеры для читаемости
    const cssLouderWithModule = {
        loader: "css-loader",
        options: {//настройка, чтоб стили были читаемыми после сборки
            modules: {
                localIdentName: isDev ? '[path][name]__[locales]' : '[hash:base64:8]'
            },
        },
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev ? "style-loader" : MiniCssExtractPlugin.loader, //вместо  "style-loader"
            // Translates CSS into CommonJS
            cssLouderWithModule,
            // Compiles Sass to CSS
            "sass-loader",
        ],
    }
    const tsLoader = {
        //по React - без ts-loader пришлось бы babel настраивать, чтоб мочь работать с JSX
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{  //если хотим вынести проверку типов в отдельный процессБ иначе оставляем use: 'ts-loader'
            loader: 'ts-loader',
        options: {
            getCustomTransformers: () => ({
                before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
            }),
                transpileOnly: true}}],
    }

    const assetLouder = {
        test: /\.(png|jpg|jpeg|gif)$/i,  //svg удалить
        type: 'asset/resource',
    }
    const svgLouder = {
        test: /\.svg$/i,
        use: [{loader: '@svgr/webpack',
            options: {
            icon: true,
                svgoConfig: { // чтоб иконка принимала цвет из color
                    plugins: [
                        {
                            name: 'convertColors',
                            params: {
                                currentColor: true,
                            }
                        }
                    ]
                }
        }
        }],
    }

    const babelLoader = {
        test:/\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [
                    '@babel/preset-env',
                    "@babel/preset-typescript", //в данном случаем можно без конфига, тк вебпак собирает
                    ["@babel/preset-react", {"runtime": isDev ? "automatic": "classic"}]
                ]
            }
        }
    }

    return [svgLouder,
        assetLouder,
        scssLoader,
        /*tsLoader ,*/ //пока бабель используется можно убрать
        babelLoader]
}