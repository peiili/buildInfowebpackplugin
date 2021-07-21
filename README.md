# build-record-webpack-plugin
### install 
``` shell
npm install build-record-webpack-plugin -D
```

### webpack  使用方式

* Enable plugin in your webpack.base.js file:

``` javascript

const BuildRecordWebpackPlugin = require('build-record-webpack-plugin')   
module.exports = {
    plugins: [
            new BuildRecordWebpackPlugin({
                assets: true, // 开启生成版本文件在构建完成的根目录
                BuildInfo(info) {
                    console.log(info);  // 构建过程中的信息
                }
            }),
        	...
        ]
}
```

* If using vue-cli

``` javascript
const BuildRecordWebpackPlugin = require('build-record-webpack-plugin')  
configureWebpack: config => {
     config.plugins = [ 
         new BuildRecordWebpackPlugin({
            assets: true, // 开启生成版本文件在构建完成的根目录
            BuildInfo(info) {
                console.log(info);  // 构建过程中的信息
            }
        }),
     	...]
 }
```



``` javascript
{ 
      SpecificationVersion: '15315881……',  // git hash
      SpecificationTitle: 'project-name',  // 工程名称
      Timeofbuild: '07071436',             // 打包日期
      argvofbuild: 'build',			       // 打包参数
      CreatedBy: 'Administrator'           // 打包环境
}
```

