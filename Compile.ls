lsc = require "livescript"

_ = require "prelude-ls"

{SetConfig} = require "GeneralDev"

fs = require "fs"

White = "\033[0;37m"
LightGreen = "\033[1;32m"
Green = "\033[0;32m"
RedLight = "\033[0;31m"
Red = "\033[1;31m"
Brown = "\033[0;33m"

delimit = (require "path").sep

log = (string,replace) ->
	if not replace
		# Normal Log
		console.log string
		return

	process.stdout.clearLine!
	process.stdout.cursorTo 0
	process.stdout.write string
	return

RedHighLight = (x) -> Red + x + RedLight

Config = 
	InitialExt:"ls"
	FinalExtention:"js"
	DirToLook:null
	DirToSave:null
	Compile:(FileName)->

		ReadName  =        (Config.DirToLook + delimit + FileName + "." + Config.InitialExt)

		WriteName = (End) -> Config.DirToSave + delimit + FileName + End

		FileNameSep = FileName.split "."

		if (FileNameSep.length > 1) and ( (_.last FileNameSep) is "json")
			
			ToCompile = ReadName |> fs.readFileSync |> (.toString!) 

			try

				Compiled = lsc.compile ToCompile,(json:true) 

				fs.writeFileSync (WriteName ""),Compiled

				console.log LightGreen + FileName + ".ls" + Green +  " --> " + LightGreen + FileName + White

			catch Problem

				ErrorDisplay = Red + FileName + "." + Config.InitialExt + " --> " +  Problem.toString! + White
				log ErrorDisplay,false

				return

		else

			ToCompile = ReadName |> fs.readFileSync |> (.toString!) 

			try

				Compiled = lsc.compile ToCompile

				fs.writeFileSync (WriteName ".js"),Compiled 

				console.log LightGreen + FileName + ".ls" + Green +  " --> " + LightGreen + FileName + ".js" + White

			catch Problem 

				ErrorDisplay = Red + FileName + "." + Config.InitialExt + " --> " +  Problem.toString! + White
				log ErrorDisplay,false



WithDir = (Init = true,watch = true,clean = false,DirToSave = process.cwd!,DirToLook = process.cwd!) ->

	Config.DirToSave = DirToSave

	Config.DirToLook = DirToLook

	AutoBuild = SetConfig Config

	AutoBuild Init,watch,clean

	return

module.exports = WithDir
