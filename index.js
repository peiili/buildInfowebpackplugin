var { execSync } = require('child_process');
var os = require('os');
var { moment }= require('./unit')
var env = process.env;
var gitHash = execSync('git rev-parse HEAD',{encoding: 'utf-8'}).replace(/[\s\r\n]+$/, '');
var SpecificationTitle = env.npm_package_name;
var envName = '';
var buildDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
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
