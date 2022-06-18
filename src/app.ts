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
	private kitObjectIds = ['2025654579672122077','2025654399577096850','2025654508368954055',
							'2025654532091937484','2025654484251706050','2025654472457323199',
							'2025654460394504889','2025654520163336905','2025654411639915160',
							'2025654496440353477','2025654580326433502','2025654436411474605',
							'2025654580854915807','2025654556603450070','2025654568532050649',
							'2025654424742920874','2025654448071639728','2025654544549020371'];
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
