"use strict";
exports.__esModule = true;
var child_process_1 = require("child_process");
var fs = require('fs');
var argv = require("yargs")
    .scriptName("asp_visualizer")
    .usage("Usage: node $0 -d dlv -i asp_file -t template_file -o output_directory")
    .option("d", {
    alias: "dlv_path",
    describe: "The path of the dlv solver",
    demandOption: "The dlv excutable is required.",
    type: "string"
})
    .option("i", {
    alias: "asp_file",
    describe: "ASP file to solve",
    demandOption: "The input file is required.",
    type: "string"
})
    .option("o", {
    alias: "output",
    describe: "path to the output directory",
    demandOption: "the output directory is required",
    type: "string"
})
    .option("t", {
    alias: "template_file",
    describe: "path to the template file",
    type: "string",
    demandOption: "The template file is required"
})
    .option("n", {
    alias: "as_number",
    describe: "Number of AS you want to display, insert 0 for all",
    type: "number",
    "default": 1
})
    .describe("help", "Show help.").argv;
var visualizer_object = {
    'graph': "node ./asd-graph-renderer/build/script.js fromstr --template ".concat(argv.template_file, " --output ./").concat(argv.output),
    'tree': "node ./asd-graph-renderer/build/script.js fromstr --template ".concat(argv.template_file, " --output ./").concat(argv.output),
    'table': "",
    'matrix': ""
};
var rawdata = fs.readFileSync("".concat(argv.template_file));
var tmp = JSON.parse(rawdata);
var dlv_execution = "node ./NodeJs-DLV-Wrapper/dlv_wrapper.js -i ".concat(argv.asp_file, " -d ").concat(argv.dlv_path, " -n ").concat(argv.as_number);
var dlv_result = "" + (0, child_process_1.execSync)(dlv_execution);
var res = (0, child_process_1.execSync)("".concat(visualizer_object[tmp['template']]), { input: "".concat(dlv_result, "\n\r") });
console.log("" + res);
