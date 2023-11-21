webpack:
все настройки webpack в dev зависимости
1. npm i -D webpack webpack-cli webpack-dev-server  - ставим вебпак, cli и сервер
2. создаем webpack.config.js ( в дире webpack.example.config.js) он в корне

3. Добавляем плагины:
- npm install --save-dev html-webpack-plugin  (устанавливаем плагин, чтоб в скрипты  и css автоматом подтягивались нужные файлы https://webpack.js.org/plugins/html-webpack-plugin/#root)
- можно добавить ProgressPlugin  (https://webpack.js.org/plugins/progress-plugin/#root), чтоб смотреть % сборки
- MiniCssExtractPlugin (чтоб css  отдельный бандл собиралось) npm install --save-dev mini-css-extract-plugin
- webpack-bundle-analyzer (чтобы анализировать размеры файлов сборки , для прода )  
npm install --save-dev webpack-bundle-analyzer и типы к нему npm install --save @types/webpack-bundle-analyzer
-  DefinePlugin (встроенный) -подменяет глобал переменные, которые исп в коде!!! (нпр platform) на те значения, которые исп-м на этапе сборки
- fork-ts-checker-webpack-plugin - выносит проверку TS в отдельный процесс (сборка замедляться не будет ,но и типы в реалтайме проверяться будут)
  npm install --save-dev fork-ts-checker-webpack-plugin 
- Refresh Webpack Plugin - ставим, чтоб не было перезагрузки страниц при изменении в коде ( когда дев сервер)
  https://www.npmjs.com/package/@pmmmwh/react-refresh-webpack-plugin
  npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh
  npm install -D react-refresh-typescript
- CopyWebpackPlugin -Копирует отдельные файлы или целые каталоги, которые уже существуют, в каталог сборки.
  https://webpack.js.org/plugins/copy-webpack-plugin/#root
  npm install copy-webpack-plugin --save-dev


4. Добавляем лоудеры (нужны, тк webpack по умолчанию работает только с js файлами):
   лоудеры обрабатывают файлы с неизвестными для себя форматами и на выходе конвертирует во что ему надо. ПОРЯДОК ВАЖЕН и идет с конца массива
- ts-loader : npm install ts-loader --save-dev  (npm i -D ts-loader@9.5.0 typescript@5.2.2) - https://github.com/TypeStrong/ts-loader
  (и ts если не установлен) 
Если ts ранее не было, то создаем tsconfig.json https://webpack.js.org/guides/typescript/
- css-loader: 
npm install --save-dev style-loader
npm install --save-dev css-loader (https://webpack.js.org/loaders/css-loader/)
- scss-loader: npm install sass-loader sass webpack --save-dev
- Для ассетов (картинки, шрифты) нужны лоудеры, https://webpack.js.org/guides/asset-management/#loading-images  (скачивать не надо)
Но будут проблемы с TS: для этого добавим в Globals.d.ts новые модули с расширениями. 
- Svg можно так же обработать, но лучше по другому сделать, чтоб работать как с иконками: https://react-svgr.com/docs/webpack/
  npm install --save-dev @svgr/webpack


5. Добавляем Dev server , чтобы не надо было делать билд на каждое изменение - https://webpack.js.org/guides/development/#using-webpack-dev-server:
- npm install --save-dev webpack-dev-server  
- добавляем тип import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
- если с роутером работает, то в настройки добавляем флаг historyApiFallback: true

 - source maps (Чтобы упростить отслеживание ошибок и предупреждений ) https://webpack.js.org/guides/development/#using-source-maps


6. можем сам  webpack настраивать на ts - https://webpack.js.org/configuration/configuration-languages/ :
 - webpack.config.js --> webpack.config.ts
- npm install --save-dev  ts-node @types/node @types/webpack  (npm i -D  @types/node@20.8.3 @types/webpack@5.28.3 ts-node@10.9.1)
- npm install --save-dev @types/webpack-dev-server (npm i -D @types/webpack-dev-server@4.7.2)
- далее все как по ссылке в п5 (добавляем настройки в tsconfig, в webpack config меняем import, добавляем export default)

7. ДЕКОМПОЗИЦИЯ : разносим поля объекта configure на функции в папке config(просто смотрим по коду, там все ясно) 
8. чтоб читались module.css  - https://stackoverflow.com/questions/41336858/how-to-import-css-modules-with-typescript-react-and-webpack
создаем Globals.d.ts файл в src  + настроить лоудер, чтоб стили читались https://webpack.js.org/loaders/css-loader/#root

9. Алиасы для импортов настраиваются в buildResolvers + в tsconfig  добавляем "baseUrl":".", "paths":{ "@/*":["./src/*"]}

10.  Обычно типы проверяются во время сборки и это ее замедляет.  Можно вынести ее в отдельный процесс:
-для этого в ts-louder опцию transpileOnly: true  - убираем проверку типов из сборки
и ставим плагин fork-ts-checker-webpack-plugin

----
11. BABEL (без него компилит ts loader )- его ставят, тк кастомизация лучшеБ много плагинов
    npm install --save-dev babel-loader @babel/core (https://babeljs.io/setup#installation)
добавляем лоудер. Для tsб react и другие настройки в пресетах:
npm install --save-dev @babel/preset-typescript
npm install --save-dev @babel/preset-react  (https://babeljs.io/docs/babel-preset-react)
можно создать     babel.config.json, если бабель не только в веб пак исп-ся и уже там пресеты настраивать нпр в Jest

скрипты:
"scripts": {
"build:dev": "webpack --env mode=development", - билдим в режиме разработки
"build:prod": "webpack --env mode=production", - билдим в режиме продакшена
"start": "webpack serve --open --env mode=development"  - запускаем webpack сервер
"build:analyzer": "webpack --env mode=production analyzer=true" -запускаем анализа в прод режиме для анализа размеров файлов
"build:mobile": "webpack --env mode=production platform=mobile",  - билдим в режиме продакшена для мобильных устройств
"build:desktop": "webpack --env mode=production platform=desktop" - билдим в режиме продакшена для компов
"build:typecheck": "tsc"- проверка типов, если она вынесена в отдельный процесс
},



не по теме:
- Emmet авто создание разметки html : ! + Tab
- если указываем переменные при запуске команды, то так 'webpack serve --open -- --env port=5000'
- чтоб не писать import React from "react"  в tsconfig.json  "compilerOptions" добавляем "jsx": "react-jsx"
 