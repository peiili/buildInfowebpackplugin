var os = require('os');
var env = process.env;
var gitHash = env.npm_package_gitHead;
var SpecificationTitle = env.npm_package_name;
var envName = '';
var buildDateTime = '';
var argv = '';
var options = { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
var buildDateTime = new Date().toLocaleString('zh-CN', options).replace(/[^0-9]/g, '');
var argv = process.argv.slice(2, process.argv.length).join(',');
envName = os.userInfo().username;
var buildInfo = {
    SpecificationVersion: gitHash,
    SpecificationTitle: SpecificationTitle,
    Timeofbuild: buildDateTime,
    argvofbuild: argv,
    CreatedBy: envName
};
function BuildInfoWebpackPlugin(props) {
    props.BuildInfo(buildInfo);
    this.apply = function(compiler) {
        const copyrightText = JSON.stringify(buildInfo);
        let compilerCompatible = function(compilation, callback) {
            // compilation存放了这次打包的所有内容
            // 所有待生成的文件都在它的 assets 属性上
            if (props.assets) {
                compilation.assets[SpecificationTitle + '_version.txt'] = {
                    source: function() {
                        return copyrightText;
                    },
                    size: function() {
                        return copyrightText.length;
                    }
                };
            }
            callback();
        };
        if (compiler.hooks) {
            //  webpack4+ 使用hooks
            compiler.hooks.emit.tapAsync('BuildInfoWebpackPlugin', (compilation, callback) => {
                compilerCompatible(compilation, callback);
            });
        } else {
            compiler.plugin('emit', function(compilation, callback) {
                compilerCompatible(compilation, callback);
            });
        }
    };
}

module.exports = BuildInfoWebpackPlugin;
