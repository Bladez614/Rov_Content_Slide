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
	private kitObjectIds = ['2018534096317186743','2018555068038512912','2018554823057605609'];
	private assets: MRE.AssetContainer = null;
	private i = 0;

	constructor(private context: MRE.Context) {
		this.context.onStarted(() => this.started(this.i));
	}
	
	private started(position: number) {
		// set up somewhere to store loaded assets (meshes, textures, animations, gltfs, etc.)
		this.assets = new MRE.AssetContainer(this.context);

		if(this.kitObject != null){
			this.kitObject.destroy();
		}

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
		
		
		this.i = this.i + 1;
		if (this.i === this.kitObjectIds.length){
			this.i = 0;
		}
		setTimeout(this.started.bind(this), 10000, this.i);
	}
}
