//типизация путей, для гибкой конфигурации и переиспользования
export type buildPathsType = {
    entry: string //путь до точки входа
    html: string  // путь до html
    output: string // путь, куда идет сборка
    src: string //путь до src для алиасов в buildResolvers
    public: string //путь до фавикона
}
export type buildModeType = "development" | "production"
export type buildPlatformType = "desktop"| "mobile"
//типизация options (переменные)
export type buildOptionType = {
    port: number
    paths: buildPathsType
    mode:buildModeType
    analyzer?: boolean //хотим мы видеть аналайзер или нет
    platform: buildPlatformType //c какого мы устройства
}