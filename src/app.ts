/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';

/**
 * The main class of this app. All the logic goes here.
 */
export default class MyHelloWorld {
	private kitObject: MRE.Actor;
	private kitObjectIds = ['2029981942069330496','2029981941406630460','2029981941935112767',
							'2029981942463595075','2029981943377953353','2029981943117906503',
							'2029981944166482510','2029981944032264781','2029981942195159617',
							'2029981943772217932','2029981942589424196','2029981941540848189',
							'2029981942723641925','2029981941280801339','2029981941800895038',
							'2029981942849471046','2029981943243735624','2029981943638000203'];
	private assets: MRE.AssetContainer = null;
	private i = 0;

	constructor(private context: MRE.Context) {
		this.context.onStarted(() => this.started(this.i));
		setInterval(this.timerFunction.bind(this), 10000, this);
	}
	
	private started(position: number) {
		// set up somewhere to store loaded assets (meshes, textures, animations, gltfs, etc.)
		this.assets = new MRE.AssetContainer(this.context);

		this.kitObject = MRE.Actor.CreateFromLibrary(this.context,{
			resourceId: 'artifact:' + this.kitObjectIds[position],
				actor: {
					transform:{
						local: {
							position: { x: 0, y: 0, z: 0 },
							scale: {x: 1.5, y: 1, z: 1}
						}
					}
				}
		})

		this.kitObject.appearance.enabled = true;
	}
	timerFunction(that: any){
		that.kitObject.destroy();
		that.i = that.i + 1;
		if (that.i === that.kitObjectIds.length){
			that.i = 0;
		}
		that.started(that.i);
	}
}
