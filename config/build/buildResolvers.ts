import {buildOptionType} from "./types/types";

export function buildResolvers(options: buildOptionType){
return {
    extensions: ['.tsx', '.ts', '.js'],
    alias:{
        '@': options.paths.src  //какой значок и путь, который на него заменяется
    }
}
}