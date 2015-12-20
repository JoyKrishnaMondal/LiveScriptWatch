// Generated by LiveScript 1.4.0
(function(){
  var lsc, _, SetConfig, fs, White, LightGreen, Green, RedLight, Red, Brown, delimit, log, RedHighLight, Config, WithDir;
  lsc = require("livescript");
  _ = require("prelude-ls");
  SetConfig = require("GeneralDev").SetConfig;
  fs = require("fs");
  White = "\x1b[0;37m";
  LightGreen = "\x1b[1;32m";
  Green = "\x1b[0;32m";
  RedLight = "\x1b[0;31m";
  Red = "\x1b[1;31m";
  Brown = "\x1b[0;33m";
  delimit = require("path").sep;
  log = function(string, replace){
    if (!replace) {
      console.log(string);
      return;
    }
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(string);
  };
  RedHighLight = function(x){
    return Red + x + RedLight;
  };
  Config = {
    InitialExt: "ls",
    FinalExtention: "js",
    DirToLook: null,
    DirToSave: null,
    Compile: function(FileName){
      var ReadName, WriteName, FileNameSep, ToCompile, Compiled, Problem, ErrorDisplay;
      ReadName = Config.DirToLook + delimit + FileName + "." + Config.InitialExt;
      WriteName = function(End){
        return Config.DirToSave + delimit + FileName + End;
      };
      FileNameSep = FileName.split(".");
      if (FileNameSep.length > 1 && _.last(FileNameSep) === "json") {
        ToCompile = function(it){
          return it.toString();
        }(
        fs.readFileSync(
        ReadName));
        try {
          Compiled = lsc.compile(ToCompile, {
            json: true
          });
          fs.writeFileSync(WriteName(""), Compiled);
          return console.log(LightGreen + FileName + ".ls" + Green + " --> " + LightGreen + FileName + White);
        } catch (e$) {
          Problem = e$;
          ErrorDisplay = Red + FileName + "." + Config.InitialExt + " --> " + Problem.toString() + White;
          log(ErrorDisplay, false);
        }
      } else {
        ToCompile = function(it){
          return it.toString();
        }(
        fs.readFileSync(
        ReadName));
        try {
          Compiled = lsc.compile(ToCompile);
          fs.writeFileSync(WriteName(".js"), Compiled);
          return console.log(LightGreen + FileName + ".ls" + Green + " --> " + LightGreen + FileName + ".js" + White);
        } catch (e$) {
          Problem = e$;
          ErrorDisplay = Red + FileName + "." + Config.InitialExt + " --> " + Problem.toString() + White;
          return log(ErrorDisplay, false);
        }
      }
    }
  };
  WithDir = function(Init, watch, clean, DirToSave, DirToLook){
    var AutoBuild;
    Init == null && (Init = true);
    watch == null && (watch = true);
    clean == null && (clean = false);
    DirToSave == null && (DirToSave = process.cwd());
    DirToLook == null && (DirToLook = process.cwd());
    Config.DirToSave = DirToSave;
    Config.DirToLook = DirToLook;
    AutoBuild = SetConfig(Config);
    AutoBuild(Init, watch, clean);
  };
  module.exports = WithDir;
}).call(this);
