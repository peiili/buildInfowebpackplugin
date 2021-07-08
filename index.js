var { execSync } = require('child_process');
var os = require('os');
var env = process.env;

var gitHash = execSync('git log -1 --format=%H', { encoding: 'utf-8' });
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

function BuildRecordWebpackPlugin(props) {
    props.BuildInfo(buildInfo);
    this.apply = function(compiler) {
        const copyrightText = JSON.stringify(buildInfo);
        let compilerCompatible = function(compilation, callback) {
            if (props.assets) {
                compilation.assets[SpecificationTitle + '_version.json'] = {
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
            compiler.hooks.emit.tapAsync('BuildRecordWebpackPlugin', (compilation, callback) => {
                compilerCompatible(compilation, callback);
            });
        } else {
            compiler.plugin('emit', function(compilation, callback) {
                compilerCompatible(compilation, callback);
            });
        }
    };
}

module.exports = BuildRecordWebpackPlugin;
