import { NativeScriptConfig } from '@nativescript/core';

export default {
	id: 'org.nativescript.testSafePass',
	appPath: 'src',
	appResourcesPath: 'App_Resources',
	android: {
		v8Flags: '--expose_gc',
		markingMode: 'none'
	},
	ios:{
		SPMPackages:[
			{
				name:"SafePasswordiOSLib",
				libs:["SafePasswordiOSLib"],
				repositoryURL:"https://github.com/wuilmerj24/SafePasswordRustLibiOS.git",
				version:"1.0.6"
			}
		]
	}
} as NativeScriptConfig;