// set animation presets for device/animate combo
Generator.getAnimationPresets = function( options, switcher )
{
	var presets = [ 0 ];

	if ( options.keyers == 1 ) // single-keyer device (Mini, Pro)
	{
		presets.push( 
			{	name: switcher + " - Simple keyer example",
				boxes: [
					0,
					{	i     : 1, 
						label : "key1", 
						type  : "keyers",
						src   : 0,
						enabled: true, 
						from  : { x: -8.00, y: 0.00, scale: 0.50, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						to    : { x: 8.00, y: 0.00, scale: 0.50, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							scale : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					}
				]
			} );
		presets.push( 
			{	name: switcher + " - PIP fly in left curtain",
				boxes: [
					0,
					{	i     : 1, 
						label : "key1", 
						type  : "keyers",
						src   : 0,
						enabled: true, 
						from  : { x: -16.62, y: -10.04, scale: 0.08, cropL: 7.00, cropT: 0.00, cropR: 7.00, cropB: 0.00 }, 
						to    : { x: 6.22, y: 0.00, scale: 0.55, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 0.00, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 15.00, cropT: 20.00, cropR: 15.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.22, y: 1.17 }, p2: { x: 0.77, y: 0.99 } }, 
							y     : { p1: { x: 0.69, y: 1.74 }, p2: { x: 0.63, y: 1.00 } }, 
							scale : { p1: { x: 0.83, y: 1.57 }, p2: { x: 0.64, y: 1.02 } }, 
							cropL : { p1: { x: 0.76, y: 0.00 }, p2: { x: 0.24, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.65, y: 0.00 }, p2: { x: 0.35, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					}
				]
			} );
		presets.push( 
			{	name: switcher + " - PIP fly out left",
				boxes: [
					0,
					{	i     : 1, 
						label : "key1", 
						type  : "keyers",
						src   : 0,
						enabled: true, 
						from  : { x: 6.22, y: 0.00, scale: 0.55, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						to    : { x: -16.31, y: 9.98, scale: 0.08, cropL: 7.00, cropT: 0.00, cropR: 7.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 0.00, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 15.00, cropT: 20.00, cropR: 15.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.23, y: 0.01 }, p2: { x: 0.78, y: -0.17 } }, 
							y     : { p1: { x: 0.28, y: 0.02 }, p2: { x: 0.18, y: -0.49 } }, 
							scale : { p1: { x: 0.36, y: -0.02 }, p2: { x: 0.17, y: -0.57 } }, 
							cropL : { p1: { x: 0.76, y: 0.00 }, p2: { x: 0.24, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.65, y: 0.00 }, p2: { x: 0.35, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					}
				]
			} );
		presets.push( 
			{	name: switcher + " - PIP overhoot in right",
				boxes: [
					0,
					{	i     : 1, 
						label : "key1", 
						type  : "keyers",
						src   : 0,
						enabled: true, 
						from  : { x: 25.27, y: 0.00, scale: 0.57, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						to    : { x: 6.88, y: 0.00, scale: 0.57, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.34, y: 1.56 }, p2: { x: 0.64, y: 1.00 } }, 
							y     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							scale : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					}
				]
			} );
		presets.push( 
			{	name: switcher + " - PIP bounce back out right",
				boxes: [
					0,
					{	i     : 1, 
						label : "key1", 
						type  : "keyers",
						src   : 0,
						enabled: true, 
						from  : { x: 6.88, y: 0.00, scale: 0.57, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						to    : { x: 25.27, y: 0.00, scale: 0.57, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 15.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.36, y: 0.00 }, p2: { x: 0.75, y: -0.63 } }, 
							y     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							scale : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					}
				]
			} );
		presets.push( 
			{	name: switcher + " - Bouncy wipe",
				boxes: [
					0,
					{	i     : 1, 
						label : "key1", 
						type  : "keyers",
						src   : 0,
						enabled: true, 
						from  : { x: 0.00, y: 0.00, scale: 1.00, cropL: 32.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						to    : { x: 0.00, y: 0.00, scale: 1.00, cropL: 0.00, cropT: 0.00, cropR: 32.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 15.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 15.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.34, y: 1.56 }, p2: { x: 0.64, y: 1.00 } }, 
							y     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							scale : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropL : { p1: { x: 0.50, y: 1.00 }, p2: { x: 0.89, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.31, y: 0.52 }, p2: { x: 0.53, y: -0.69 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					}
				]
			} );
		presets.push( 
			{	name: switcher + " - Fly in center",
				boxes: [
					0,
					{	i     : 1, 
						label : "key1", 
						type  : "keyers",
						src   : 0,
						enabled: true, 
						from  : { x: 0.00, y: 10.26, scale: 0.09, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						to    : { x: 0.00, y: 0.00, scale: 1.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 5.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 10.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.36, y: 0.55 }, p2: { x: 0.60, y: 0.99 } }, 
							scale : { p1: { x: 0.50, y: 1.72 }, p2: { x: 0.55, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					}
				]
			} );
		presets.push( 
			{	name: switcher + " - Two guests one cam R",
				boxes: [
					0,
					{	i     : 1, 
						label : "key1", 
						type  : "keyers",
						src   : 0,
						enabled: true, 
						from  : { x: 0.00, y: 0.00, scale: 1.00, cropL: 0.00, cropT: 0.00, cropR: 18.20, cropB: 0.00 }, 
						to    : { x: -18.20, y: 0.00, scale: 1.00, cropL: 18.20, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						at    : { x: -18.20, y: 0.00, scale: 1.00, cropL: 18.20, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						delay : { x: 0.00, y: 0.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							scale : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					}
				]
			} );
		presets.push( 
			{	name: switcher + " - Two guests one cam L",
				boxes: [
					0,
					{	i     : 1, 
						label : "key1", 
						type  : "keyers",
						src   : 0,
						enabled: true, 
						from  : { x: -18.20, y: 0.00, scale: 1.00, cropL: 18.20, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						to    : { x: 0.00, y: 0.00, scale: 1.00, cropL: 0.00, cropT: 0.00, cropR: 18.20, cropB: 0.00 }, 
						at    : { x: 0.00, y: 0.00, scale: 1.00, cropL: 0.00, cropT: 0.00, cropR: 18.20, cropB: 0.00 }, 
						delay : { x: 0.00, y: 0.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							scale : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					}
				]
			} );
	}
	else // multi-keyer device
	{
		presets.push( 
			{	name: switcher + " - Two keyers up crossing",
				boxes: [
					0,
					{	i     : 1, 
						label : "key1", 
						type  : "keyers",
						src   : 0,
						enabled: true, 
						from  : { x: 24.19, y: 0.00, scale: 0.50, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						to    : { x: -8.00, y: 0.00, scale: 0.50, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.34, y: 1.56 }, p2: { x: 0.64, y: 1.00 } }, 
							y     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							scale : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					},
					{	i     : 2, 
						label : "key2", 
						type  : "keyers",
						src   : 0,
						enabled: true, 
						from  : { x: -24.14, y: 0.00, scale: 0.50, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						to    : { x: 8.00, y: 0.00, scale: 0.50, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.34, y: 1.56 }, p2: { x: 0.64, y: 1.00 } }, 
							y     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							scale : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					}
				]
			} );
		presets.push( 
			{	name: switcher + " - Two keyers up crossing diagonal",
				boxes: [
					0,
					{	i     : 1, 
						label : "key1", 
						type  : "keyers",
						src   : 0,
						enabled: true, 
						from  : { x: 24.14, y: -8.72, scale: 0.50, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						to    : { x: -8.00, y: 0.00, scale: 0.50, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.34, y: 1.56 }, p2: { x: 0.64, y: 1.00 } }, 
							y     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							scale : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					},
					{	i     : 2, 
						label : "key2", 
						type  : "keyers",
						src   : 0,
						enabled: true, 
						from  : { x: -24.19, y: 8.97, scale: 0.50, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						to    : { x: 8.00, y: 0.00, scale: 0.50, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.34, y: 1.56 }, p2: { x: 0.64, y: 1.00 } }, 
							y     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							scale : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					}
				]
			} );
		presets.push( 
			{	name: switcher + " - Two keyers drop in cropped",
				boxes: [
					0,
					{	i     : 1, 
						label : "key1", 
						type  : "keyers",
						src   : 0,
						enabled: true, 
						from  : { x: -7.00, y: 17.50, scale: 0.90, cropL: 9.00, cropT: 0.00, cropR: 9.00, cropB: 0.00 }, 
						to    : { x: -7.00, y: 0.00, scale: 0.90, cropL: 9.00, cropT: 0.00, cropR: 9.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.47, y: 1.71 }, p2: { x: 0.42, y: 1.00 } }, 
							scale : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					},
					{	i     : 2, 
						label : "key2", 
						type  : "keyers",
						src   : 0,
						enabled: true, 
						from  : { x: 7.00, y: 17.50, scale: 0.90, cropL: 9.00, cropT: 0.00, cropR: 9.00, cropB: 0.00 }, 
						to    : { x: 7.00, y: 0.00, scale: 0.90, cropL: 9.00, cropT: 0.00, cropR: 9.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 5.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.47, y: 1.71 }, p2: { x: 0.42, y: 1.00 } }, 
							scale : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					}
				]
			} );

		if ( options.keyers > 2 )
		{
			presets.push( 
			{	name: switcher + " - Three keyers drop in cropped",
				boxes: [
					0,
					{	i     : 1, 
						label : "key1", 
						type  : "keyers",
						src   : 0,
						enabled: true, 
						from  : { x: -7.00, y: 17.50, scale: 0.90, cropL: 9.00, cropT: 0.00, cropR: 9.00, cropB: 0.00 }, 
						to    : { x: -7.00, y: 0.00, scale: 0.90, cropL: 9.00, cropT: 0.00, cropR: 9.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.47, y: 1.71 }, p2: { x: 0.42, y: 1.00 } }, 
							scale : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					},
					{	i     : 2, 
						label : "key2", 
						type  : "keyers",
						src   : 0,
						enabled: true, 
						from  : { x: 7.00, y: 17.50, scale: 0.90, cropL: 9.00, cropT: 0.00, cropR: 9.00, cropB: 0.00 }, 
						to    : { x: 7.00, y: 0.00, scale: 0.90, cropL: 9.00, cropT: 0.00, cropR: 9.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 5.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.47, y: 1.71 }, p2: { x: 0.42, y: 1.00 } }, 
							scale : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					},
					{	i     : 3, 
							label : "key3", 
							type  : "keyers",
							src   : 0,
							enabled: true, 
							from  : { x: 7.00, y: 17.50, scale: 0.90, cropL: 9.00, cropT: 0.00, cropR: 9.00, cropB: 0.00 }, 
							to    : { x: 7.00, y: 0.00, scale: 0.90, cropL: 9.00, cropT: 0.00, cropR: 9.00, cropB: 0.00 }, 
							at    : 0, 
							delay : { x: 0.00, y: 5.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
							frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
							curves: { 
								x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
								y     : { p1: { x: 0.47, y: 1.71 }, p2: { x: 0.42, y: 1.00 } }, 
								scale : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
								cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
								cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
								cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
								cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
							}
						}
				]
			} );
		}
	}
	
	// supersource presets
	if ( options.supersource )
	{
		presets.push( 
			{	name: switcher + " - Four boxes swap",
				boxes: [
					0,
					{	i     : 1, 
						label : "box1", 
						type  : "supersource",
						src   : 0,
						enabled: true, 
						from  : { x: -8.00, y: 4.50, scale: 0.50, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						to    : { x: 8.00, y: 4.50, scale: 0.50, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							scale : { p1: { x: 0.34, y: 1.56 }, p2: { x: 0.64, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					},
					{	i     : 2, 
						label : "box2", 
						type  : "supersource",
						src   : 0,
						enabled: true, 
						from  : { x: 8.00, y: 4.50, scale: 0.50, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						to    : { x: 8.00, y: -4.50, scale: 0.50, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 3.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							scale : { p1: { x: 0.34, y: 1.56 }, p2: { x: 0.64, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					},
					{	i     : 3, 
						label : "box3", 
						type  : "supersource",
						src   : 0,
						enabled: true, 
						from  : { x: -8.00, y: -4.50, scale: 0.50, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						to    : { x: -8.00, y: 4.50, scale: 0.50, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 9.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							scale : { p1: { x: 0.34, y: 1.56 }, p2: { x: 0.64, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					},
					{	i     : 4, 
						label : "box4", 
						type  : "supersource",
						src   : 0,
						enabled: true, 
						from  : { x: 8.00, y: -4.50, scale: 0.50, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						to    : { x: -8.00, y: -4.50, scale: 0.50, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 6.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							scale : { p1: { x: 0.34, y: 1.56 }, p2: { x: 0.64, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					}
				]
			} );
		presets.push( 
			{	name: switcher + " - Four boxes burst in",
				boxes: [
					0,
					{	i     : 1, 
						label : "box1", 
						type  : "supersource",
						src   : 0,
						enabled: true, 
						from  : { x: -8.00, y: 4.50, scale: 0.01, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						to    : { x: -8.00, y: 4.50, scale: 0.50, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							scale : { p1: { x: 0.34, y: 1.56 }, p2: { x: 0.64, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					},
					{	i     : 2, 
						label : "box2", 
						type  : "supersource",
						src   : 0,
						enabled: true, 
						from  : { x: 8.00, y: 4.50, scale: 0.01, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						to    : { x: 8.00, y: 4.50, scale: 0.50, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 3.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							scale : { p1: { x: 0.34, y: 1.56 }, p2: { x: 0.64, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					},
					{	i     : 3, 
						label : "box3", 
						type  : "supersource",
						src   : 0,
						enabled: true, 
						from  : { x: -8.00, y: -4.50, scale: 0.01, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						to    : { x: -8.00, y: -4.50, scale: 0.50, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 9.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							scale : { p1: { x: 0.34, y: 1.56 }, p2: { x: 0.64, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					},
					{	i     : 4, 
						label : "box4", 
						type  : "supersource",
						src   : 0,
						enabled: true, 
						from  : { x: 8.00, y: -4.50, scale: 0.01, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						to    : { x: 8.00, y: -4.50, scale: 0.50, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 6.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							scale : { p1: { x: 0.34, y: 1.56 }, p2: { x: 0.64, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }
						}
					}
				]
			} );
		presets.push( 
			{	name: switcher + " - Three boxes cropped drop in",
				boxes: [
					0,
					{	i     : 1, 
						label : "box1", 
						type  : "supersource",
						src   : 0,
						enabled: true, 
						from  : { x: -10.50, y: 17.50, scale: 0.80, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 9.00 }, 
						to    : { x: -10.50, y: 0.00, scale: 0.80, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.47, y: 1.71 }, p2: { x: 0.42, y: 1.00 } }, 
							scale : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.50, y: 1.00 }, p2: { x: 0.89, y: 1.00 } }
						}
					},
					{	i     : 2, 
						label : "box2", 
						type  : "supersource",
						src   : 0,
						enabled: true, 
						from  : { x: 0.00, y: 17.50, scale: 0.80, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 9.00 }, 
						to    : { x: 0.00, y: 0.00, scale: 0.80, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 3.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 3.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.47, y: 1.71 }, p2: { x: 0.42, y: 1.00 } }, 
							scale : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.50, y: 1.00 }, p2: { x: 0.89, y: 1.00 } }
						}
					},
					{	i     : 3, 
						label : "box3", 
						type  : "supersource",
						src   : 0,
						enabled: true, 
						from  : { x: 10.50, y: 17.50, scale: 0.80, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 9.00 }, 
						to    : { x: 10.50, y: 0.00, scale: 0.80, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 6.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 6.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.47, y: 1.71 }, p2: { x: 0.42, y: 1.00 } }, 
							scale : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.50, y: 1.00 }, p2: { x: 0.89, y: 1.00 } }
						}
					}
				]
			} );
		presets.push( 
			{	name: switcher + " - Three boxes cropped slide in",
				boxes: [
					0,
					{	i     : 1, 
						label : "box1", 
						type  : "supersource",
						src   : 0,
						enabled: true, 
						from  : { x: -21.00, y: 0.00, scale: 0.80, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 0.00 }, 
						to    : { x: -10.50, y: 0.00, scale: 0.80, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 15.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.50, y: 1.00 }, p2: { x: 0.89, y: 1.00 } }, 
							y     : { p1: { x: 0.58, y: 0.00 }, p2: { x: 0.53, y: -0.71 } }, 
							scale : { p1: { x: 0.54, y: -0.07 }, p2: { x: 0.45, y: -0.76 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.11, y: 0.00 }, p2: { x: 0.50, y: 0.00 } }
						}
					},
					{	i     : 2, 
						label : "box2", 
						type  : "supersource",
						src   : 0,
						enabled: true, 
						from  : { x: 0.00, y: -16.50, scale: 0.80, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 0.00 }, 
						to    : { x: 0.00, y: 0.00, scale: 0.80, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 15.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.50, y: 1.00 }, p2: { x: 0.89, y: 1.00 } }, 
							scale : { p1: { x: 0.54, y: -0.07 }, p2: { x: 0.45, y: -0.76 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.11, y: 0.00 }, p2: { x: 0.50, y: 0.00 } }
						}
					},
					{	i     : 3, 
						label : "box3", 
						type  : "supersource",
						src   : 0,
						enabled: true, 
						from  : { x: 21.00, y: 0.00, scale: 0.80, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 0.00 }, 
						to    : { x: 10.50, y: 0.00, scale: 0.80, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 15.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.50, y: 1.00 }, p2: { x: 0.89, y: 1.00 } }, 
							y     : { p1: { x: 0.58, y: 0.00 }, p2: { x: 0.53, y: -0.71 } }, 
							scale : { p1: { x: 0.54, y: -0.07 }, p2: { x: 0.45, y: -0.76 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.11, y: 0.00 }, p2: { x: 0.50, y: 0.00 } }
						}
					}
				]
			} );
		presets.push( 
			{	name: switcher + " - Three boxes cropped jump out",
				boxes: [
					0,
					{	i     : 1, 
						label : "box1", 
						type  : "supersource",
						src   : 0,
						enabled: true, 
						from  : { x: -10.50, y: 0.00, scale: 0.80, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 0.00 }, 
						to    : { x: -10.50, y: 17.50, scale: 0.80, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 9.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.58, y: 0.00 }, p2: { x: 0.53, y: -0.71 } }, 
							scale : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.11, y: 0.00 }, p2: { x: 0.50, y: 0.00 } }
						}
					},
					{	i     : 2, 
						label : "box2", 
						type  : "supersource",
						src   : 0,
						enabled: true, 
						from  : { x: 0.00, y: 0.00, scale: 0.80, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 0.00 }, 
						to    : { x: 0.00, y: 17.50, scale: 0.80, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 9.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 3.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 3.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.58, y: 0.00 }, p2: { x: 0.53, y: -0.71 } }, 
							scale : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.11, y: 0.00 }, p2: { x: 0.50, y: 0.00 } }
						}
					},
					{	i     : 3, 
						label : "box3", 
						type  : "supersource",
						src   : 0,
						enabled: true, 
						from  : { x: 10.50, y: 0.00, scale: 0.80, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 0.00 }, 
						to    : { x: 10.50, y: 17.50, scale: 0.80, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 9.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 6.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 6.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 20.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.58, y: 0.00 }, p2: { x: 0.53, y: -0.71 } }, 
							scale : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.11, y: 0.00 }, p2: { x: 0.50, y: 0.00 } }
						}
					}
				]
			} );
		presets.push( 
			{	name: switcher + " - Three boxes cropped pop out",
				boxes: [
					0,
					{	i     : 1, 
						label : "box1", 
						type  : "supersource",
						src   : 0,
						enabled: true, 
						from  : { x: -10.50, y: 0.00, scale: 0.80, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 0.00 }, 
						to    : { x: -10.50, y: 0.00, scale: 0.00, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 0.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 15.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.58, y: 0.00 }, p2: { x: 0.53, y: -0.71 } }, 
							scale : { p1: { x: 0.54, y: -0.07 }, p2: { x: 0.45, y: -0.76 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.11, y: 0.00 }, p2: { x: 0.50, y: 0.00 } }
						}
					},
					{	i     : 2, 
						label : "box2", 
						type  : "supersource",
						src   : 0,
						enabled: true, 
						from  : { x: 0.00, y: 0.00, scale: 0.80, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 0.00 }, 
						to    : { x: 0.00, y: 0.00, scale: 0.00, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 3.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 15.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.58, y: 0.00 }, p2: { x: 0.53, y: -0.71 } }, 
							scale : { p1: { x: 0.54, y: -0.07 }, p2: { x: 0.45, y: -0.76 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.11, y: 0.00 }, p2: { x: 0.50, y: 0.00 } }
						}
					},
					{	i     : 3, 
						label : "box3", 
						type  : "supersource",
						src   : 0,
						enabled: true, 
						from  : { x: 10.50, y: 0.00, scale: 0.80, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 0.00 }, 
						to    : { x: 10.50, y: 0.00, scale: 0.00, cropL: 10.00, cropT: 0.00, cropR: 10.00, cropB: 0.00 }, 
						at    : 0, 
						delay : { x: 0.00, y: 0.00, scale: 6.00, cropL: 0.00, cropT: 0.00, cropR: 0.00, cropB: 0.00 }, 
						frames: { x: 20.00, y: 20.00, scale: 15.00, cropL: 20.00, cropT: 20.00, cropR: 20.00, cropB: 20.00 }, 
						curves: { 
							x     : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							y     : { p1: { x: 0.58, y: 0.00 }, p2: { x: 0.53, y: -0.71 } }, 
							scale : { p1: { x: 0.54, y: -0.07 }, p2: { x: 0.45, y: -0.76 } }, 
							cropL : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropT : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropR : { p1: { x: 0.37, y: 0.00 }, p2: { x: 0.63, y: 1.00 } }, 
							cropB : { p1: { x: 0.11, y: 0.00 }, p2: { x: 0.50, y: 0.00 } }
						}
					}
				]
			} );

		if ( options.keyers > 1 )
		{
			presets.push( 
				{	name: switcher + " - Six boxes slide in",
					boxes: [
						0,
						{	i     : 1, 
							label : "key1", 
							src   : 0,
							enabled: true, 
							type  : "keyers", 
							from  : { x: -32.000, y: 18.000, scale: 1.000, cropL: 5.350, cropT: 0.000, cropR: 5.350, cropB: 0.000 }, 
							to    : { x: -10.650, y: 4.500, scale: 0.500, cropL: 5.350, cropT: 0.000, cropR: 5.350, cropB: 0.000 }, 
							at    : { x: -10.650, y: 4.500, scale: 0.500, cropL: 5.350, cropT: 0.000, cropR: 5.350, cropB: 0.000 }, 
							delay : { x: 0.000, y: 0.000, scale: 0.000, cropL: 0.000, cropT: 0.000, cropR: 0.000, cropB: 0.000 }, 
							frames: { x: 20.000, y: 20.000, scale: 20.000, cropL: 20.000, cropT: 20.000, cropR: 20.000, cropB: 20.000 }, 
							curves: { 
								x     : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								y     : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								scale : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropL : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropT : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropR : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropB : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }
							}
						},
						{	i     : 2, 
							label : "key2", 
							src   : 0,
							enabled: true, 
							type  : "keyers", 
							from  : { x: 0.000, y: 18.000, scale: 1.000, cropL: 5.350, cropT: 0.000, cropR: 5.350, cropB: 0.000 }, 
							to    : { x: 0.000, y: 4.500, scale: 0.500, cropL: 5.350, cropT: 0.000, cropR: 5.350, cropB: 0.000 }, 
							at    : { x: 0.000, y: 4.500, scale: 0.500, cropL: 5.350, cropT: 0.000, cropR: 5.350, cropB: 0.000 }, 
							delay : { x: 0.000, y: 0.000, scale: 0.000, cropL: 0.000, cropT: 0.000, cropR: 0.000, cropB: 0.000 }, 
							frames: { x: 20.000, y: 20.000, scale: 20.000, cropL: 20.000, cropT: 20.000, cropR: 20.000, cropB: 20.000 }, 
							curves: { 
								x     : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								y     : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								scale : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropL : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropT : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropR : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropB : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }
							}
						},
						{	i     : 3, 
							label : "box1", 
							src   : 0,
							enabled: true, 
							type  : "supersource", 
							from  : { x: 32.000, y: 18.000, scale: 1.000, cropL: 5.350, cropT: 0.000, cropR: 5.350, cropB: 0.000 }, 
							to    : { x: 10.675, y: 4.500, scale: 0.500, cropL: 5.350, cropT: 0.000, cropR: 5.350, cropB: 0.000 }, 
							at    : { x: 10.675, y: 4.500, scale: 0.500, cropL: 5.350, cropT: 0.000, cropR: 5.350, cropB: 0.000 }, 
							delay : { x: 0.000, y: 0.000, scale: 0.000, cropL: 0.000, cropT: 0.000, cropR: 0.000, cropB: 0.000 }, 
							frames: { x: 20.000, y: 20.000, scale: 20.000, cropL: 20.000, cropT: 20.000, cropR: 20.000, cropB: 20.000 }, 
							curves: { 
								x     : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								y     : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								scale : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropL : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropT : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropR : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropB : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }
							}
						},
						{	i     : 4, 
							label : "box2", 
							src   : 0,
							enabled: true, 
							type  : "supersource", 
							from  : { x: -32.000, y: -18.000, scale: 1.000, cropL: 5.350, cropT: 0.000, cropR: 5.350, cropB: 0.000 }, 
							to    : { x: -10.675, y: -4.500, scale: 0.500, cropL: 5.350, cropT: 0.000, cropR: 5.350, cropB: 0.000 }, 
							at    : { x: -10.675, y: -4.500, scale: 0.500, cropL: 5.350, cropT: 0.000, cropR: 5.350, cropB: 0.000 }, 
							delay : { x: 0.000, y: 0.000, scale: 0.000, cropL: 0.000, cropT: 0.000, cropR: 0.000, cropB: 0.000 }, 
							frames: { x: 20.000, y: 20.000, scale: 20.000, cropL: 20.000, cropT: 20.000, cropR: 20.000, cropB: 20.000 }, 
							curves: { 
								x     : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								y     : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								scale : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropL : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropT : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropR : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropB : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }
							}
						},
						{	i     : 5, 
							label : "box3", 
							src   : 0,
							enabled: true, 
							type  : "supersource", 
							from  : { x: 0.000, y: -18.000, scale: 1.000, cropL: 5.350, cropT: 0.000, cropR: 5.350, cropB: 0.000 }, 
							to    : { x: 0.000, y: -4.500, scale: 0.500, cropL: 5.350, cropT: 0.000, cropR: 5.350, cropB: 0.000 }, 
							at    : { x: 0.000, y: -4.500, scale: 0.500, cropL: 5.350, cropT: 0.000, cropR: 5.350, cropB: 0.000 }, 
							delay : { x: 0.000, y: 0.000, scale: 0.000, cropL: 0.000, cropT: 0.000, cropR: 0.000, cropB: 0.000 }, 
							frames: { x: 20.000, y: 20.000, scale: 20.000, cropL: 20.000, cropT: 20.000, cropR: 20.000, cropB: 20.000 }, 
							curves: { 
								x     : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								y     : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								scale : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropL : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropT : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropR : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropB : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }
							}
						},
						{	i     : 6, 
							label : "box4", 
							src   : 0,
							enabled: true, 
							type  : "supersource", 
							from  : { x: 32.000, y: -18.000, scale: 1.000, cropL: 5.350, cropT: 0.000, cropR: 5.350, cropB: 0.000 }, 
							to    : { x: 10.675, y: -4.500, scale: 0.500, cropL: 5.350, cropT: 0.000, cropR: 5.350, cropB: 0.000 }, 
							at    : { x: 10.675, y: -4.500, scale: 0.500, cropL: 5.350, cropT: 0.000, cropR: 5.350, cropB: 0.000 }, 
							delay : { x: 0.000, y: 0.000, scale: 0.000, cropL: 0.000, cropT: 0.000, cropR: 0.000, cropB: 0.000 }, 
							frames: { x: 20.000, y: 20.000, scale: 20.000, cropL: 20.000, cropT: 20.000, cropR: 20.000, cropB: 20.000 }, 
							curves: { 
								x     : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								y     : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								scale : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropL : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropT : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropR : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }, 
								cropB : { p1: { x: 0.370, y: 0.000 }, p2: { x: 0.630, y: 1.000 } }
							}
						}
					]
				} );
		}
	}

	return presets;

}
