import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import {buildOptionType} from "./types/types";

export function buildDevServer(options: buildOptionType): DevServerConfiguration {
    return {
        static: './dist',
        port: options.port ?? 3000,
        open: true,
        //для статики не работает, нужен прокси
        historyApiFallback: true,
        hot:true //обновляет код пез перезагрузки страницы
    }
}