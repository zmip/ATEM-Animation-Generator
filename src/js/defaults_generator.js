// var w = 32 / max;
// var s = Math.min( 0.5, ( 1 / max ) );

// for( i = 1; i <= max; i++ )
// {
// 	var x = (i-(max*0.5)) * w - (w*0.5);

// 	this.boxes.push( { 
// 		i: i, 
// 		label: ( name + i ),
// 		enabled: true,
// 		from:   { x: x, y: 0, scale: s, cropL: 0,  cropT: 0,  cropR: 0,  cropB: 0 },
// 		to:     { x: 0, y: 0, scale: 1.0,   cropL: 0,  cropT: 0,  cropR: 0,  cropB: 0 },
// 		at:     0,
// 		delay:  { x: 0,   y: 0,  scale: 0,   cropL: 0,  cropT: 0,  cropR: 0,  cropB: 0 },
// 		frames: { x: 20,  y: 20, scale: 20,  cropL: 20, cropT: 20, cropR: 20, cropB: 20 },
// 		curves: {
// 			x:     { p1: { x: 0.37, y: 0 }, p2: { x: 0.63, y: 1 } },
// 			y:     { p1: { x: 0.37, y: 0 }, p2: { x: 0.63, y: 1 } },
// 			scale: { p1: { x: 0.37, y: 0 }, p2: { x: 0.63, y: 1 } },
// 			cropL: { p1: { x: 0.37, y: 0 }, p2: { x: 0.63, y: 1 } },
// 			cropT: { p1: { x: 0.37, y: 0 }, p2: { x: 0.63, y: 1 } },
// 			cropR: { p1: { x: 0.37, y: 0 }, p2: { x: 0.63, y: 1 } },
// 			cropB: { p1: { x: 0.37, y: 0 }, p2: { x: 0.63, y: 1 } }
// 		}
// 	} );
// }

if ( ! ( this.device in this.settings ) ) this.settings[ this.device ] = {};


this.settings[ this.device ][ this.animate ] = this.boxes;