function log() 
{
	var str = '';
	for ( let i = 0; i < arguments.length; i++ )
	{
		//str = str + "<br />" + arguments[i];
		console.log( arguments[i] );
	}

	//if ( Generator.debug_stats ) Generator.debug_stats.innerHTML = str;
}

var Generator = (function()
{
	var Generator = {};

	Generator.debug = 0;

	// constants
	Generator.canvas_padding = 100; // canvas padding border
	Generator.handleSize = 0;
	Generator.curve_handlesize = 7;
	Generator.hw = 16 * 0.5;
	Generator.hh = 9 * 0.5;
	Generator.file_version = 2;

	// vars
	Generator.canvas_ctx = 0;
	Generator.boxes = [ 0 ];
	Generator.canvas_w = 0;
	Generator.canvas_h = 0;
	Generator.stage = 0;
	Generator.clipboard = 0;
	Generator.devices = 0;

	// DOM elements
	Generator.data_btns = 0;
	Generator.sourcebox = 0;
	Generator.tools = 0;
	Generator.save_macro_stuff = 0;
	Generator.fields = 0;
	Generator.curve_presets_elem = 0;
	Generator.curve_canvas_elem = 0;
	Generator.canvas_elem = 0;
	Generator.animation_list_elem = 0;

	// state
	Generator.device = 0;
	Generator.switcher = 0;
	Generator.settings = 0;
	Generator.macro_index = '';
	Generator.fps = 0;

	// runtime settings
	Generator.current_prop = 0;
	Generator.drawfactor = 0;
	Generator.pad = 0;
	Generator.snapbounds = 0;

	// curve stuff
	Generator.curve_canvas_ctx = 0;
	Generator.current_pts = 0;
	Generator.old_pts = 0;
	Generator.curve_padding = { x: 15, y: 120 };
	Generator.curvesize = 400;

	// playing
	Generator.play_state = 0;
	Generator.rendered_frames = 0; // current animation
	Generator.max_frames = 0;
	Generator.interval_hdl = 0;
	Generator.play_start = 0;
	Generator.current_frame = 0;
	Generator.fps_interval = 0;
	Generator.playback_skipped = false;

	// events
	Generator.selected = 0;
	Generator.clicked = 0;
	Generator.curve_clicked = 0;
	Generator.cropping = 0;
	Generator.scaling = 0;
	Generator.lastMouseXY = 0;
	Generator.dragOffset = 0;
	Generator.oldprops = 0;

	// animations
	Generator.selected_animation = 0;
	Generator.animation_presets = {}; // all devices/animate combos
	Generator.animations_list = 0; // current list of animations for device/animate combo

	// ------------------------------------------------

	Generator.init = function()
	{
		this.stage = 'from';

		if ( typeof( Storage ) === 'undefined' ) alert( 'no Web Storage support, use a modern web browser' );

		this.canvas_elem = document.getElementById('canvas');
		this.canvas_ctx = this.canvas_elem.getContext('2d');
		this.canvas_ctx.width = this.canvas_elem.width; // this *only* works reliably by setting the width/height
		this.canvas_ctx.height = this.canvas_elem.height; // in the HTML canvas element
		this.canvas_w = this.canvas_elem.width;
		this.canvas_h = this.canvas_elem.height;

		// calc drawing factor (between BMD coords and canvas)
		this.pad = 2; // when changing this, make sure to change the canvas HTML size to have the same h:w ratio
		this.drawfactor = this.BMDtoCanvasCoords( 16, 0 ).x / ( ( 16 * 2 ) + this.pad );

		this.handleSize = 21 / this.drawfactor; // in BMD coords

		this.curve_canvas_elem = document.getElementById('curve');
		this.curve_canvas_ctx = this.curve_canvas_elem.getContext('2d');
		this.curve_canvas_ctx.width = this.curve_canvas_elem.width;
		this.curve_canvas_ctx.height = this.curve_canvas_elem.height;

		// input fields
		this.transform_fieldset = document.getElementById('transform');
		this.fields = {
			from_x: document.getElementById('from_x'),
			from_y: document.getElementById('from_y'),
			from_scale: document.getElementById('from_scale'),
			from_cropL: document.getElementById('from_cropL'),
			from_cropT: document.getElementById('from_cropT'),
			from_cropR: document.getElementById('from_cropR'),
			from_cropB: document.getElementById('from_cropB'),

			to_x: document.getElementById('to_x'),
			to_y: document.getElementById('to_y'),
			to_scale: document.getElementById('to_scale'),
			to_cropL: document.getElementById('to_cropL'),
			to_cropT: document.getElementById('to_cropT'),
			to_cropR: document.getElementById('to_cropR'),
			to_cropB: document.getElementById('to_cropB'),	

			frames_x: document.getElementById('frames_x'),
			frames_y: document.getElementById('frames_y'),
			frames_scale: document.getElementById('frames_scale'),
			frames_cropL: document.getElementById('frames_cropL'),
			frames_cropT: document.getElementById('frames_cropT'),
			frames_cropR: document.getElementById('frames_cropR'),
			frames_cropB: document.getElementById('frames_cropB'),

			delay_x: document.getElementById('delay_x'),
			delay_y: document.getElementById('delay_y'),
			delay_scale: document.getElementById('delay_scale'),
			delay_cropL: document.getElementById('delay_cropL'),
			delay_cropT: document.getElementById('delay_cropT'),
			delay_cropR: document.getElementById('delay_cropR'),
			delay_cropB: document.getElementById('delay_cropB'),
		};

		// valid ranges
		this.ranges = {
			x: { min: -( 16 * 3 ), max: ( 16 * 3 ) },
			y: { min: -( 9 * 2 ), max: ( 9 * 3 ) },
			scale: { min: 0.001, max: 99.99 },
			cropL: { min: 0, max: 16 * 2 },
			cropT: { min: 0, max: 9 * 2 },
			cropR: { min: 0, max: 16 * 2 },
			cropB: { min: 0, max: 9 * 2 },
			frames: { min: 1, max: 360 },
			delay: { min: 0, max: 360 }
		};

		// box colors
		this.boxcolors = {
			1: { 
				bkg: '#286CD7', 
				circle: '#1F55AA' },
			2: { 
				bkg: '#D55354', 
				circle: '#B54848' },
			3: { 
				bkg: '#D79328', 
				circle: '#AA741F' },
			4: { 
				bkg: '#3FBF51', 
				circle: '#36A444' },
			5: { 
				bkg: '#C64498', 
				circle: '#B13D88' },
			6: { 
				bkg: '#2BA5BB', 
				circle: '#2692A6' },
			7: { 
				bkg: '#911eb4', 
				circle: '#841CA3' },
			8: { 
				bkg: '#9C9ABB', 
				circle: '#8A88A5' }
		}

		// set up screen canvas listeners
		this.canvas_elem.addEventListener( 'mousedown', function(e){ Generator.handleCanvasMouseDown() }, true );
		this.canvas_elem.addEventListener( 'mousemove', function(e){ Generator.handleCanvasMouseMove() }, true );
		this.canvas_elem.addEventListener( 'mouseup', function(e){ Generator.handleCanvasMouseUp() }, true );
		this.canvas_elem.addEventListener( 'mouseout', function(e){ Generator.handleCanvasMouseOut() }, true );

		// set up curve canvas listeners
		this.curve_canvas_elem.addEventListener( 'mousedown', function(e){ Generator.handleCurveMouseDown() }, true );
		this.curve_canvas_elem.addEventListener( 'mousemove', function(e){ Generator.handleCurveMouseMove() }, true );
		this.curve_canvas_elem.addEventListener( 'mouseup', function(e){ Generator.handleCurveMouseUp() }, true );
		this.curve_canvas_elem.addEventListener( 'mouseout', function(e){ Generator.handleCurveMouseOut() }, true );

		// focus and blur events are only on document, and don't bubble
		document.addEventListener( 'focus', function(e){ Generator.handleFocus( event ) }, true );
		document.addEventListener( 'blur', function(e){ Generator.handleBlur( event ) }, true );

		// fields
		this.transform_fieldset.oninput = function(e){ Generator.handleFieldsChange( event ) };
		this.transform_fieldset.onkeyup = function(e){ Generator.handleFieldsKeyUp( event ) };
		this.transform_fieldset.onmousedown = function(e){ Generator.handleFieldsMouseDown( event ) };
		this.transform_fieldset.onmouseup = function(e){ Generator.handleFieldsMouseUp( event ) };
		this.transform_fieldset.onwheel = function(e){ return Generator.handleFieldsWheel( event ) };

		// tools
		this.playback_tools = document.getElementById('playback_tools');
		this.playback_tools.addEventListener( 'click', function(e){ Generator.handleTools( event ) }, true );

		// data buttons
		this.data_btns = document.getElementById('data_btns');
		this.data_btns.addEventListener( 'click', function(e){ Generator.handleDataBtns( event ) }, true );

		// source select
		this.source_select = document.getElementById('source');
		this.source_select.addEventListener( 'change', function(e){ Generator.handleSourceSelect( event ) }, true );

		// file buttons
		document.getElementById('file_btns').addEventListener( 'click', function(e){ Generator.handleFileBtn( event ) }, true );
		document.getElementById('upload_file').onchange = function(event) { Generator.loadFile( event ) };

		// curve preset buttons
		this.curve_presets_elem = document.getElementById('curve_presets');
		this.curve_presets_elem.addEventListener( 'click', function(e){ Generator.handleCurvePresetBtn( e ) }, true );


		// macro saving stuff
		this.save_macro_stuff = document.getElementById( 'save_macro' );
		this.save_macro_stuff.onkeyup = function(e){ Generator.handleSaveMacro( e ) };
		this.save_macro_stuff.onclick = function(e) { Generator.handleSaveMacro( e ) };

		// animations list
		this.animations_list_elem = document.getElementById('animationlist');
		this.animations_list = [ 0 ];

		this.animations_list_elem.onmousedown = function( evt ) { return Generator.handleAnimationSelectList( evt ); }
		this.animations_list_elem.onkeydown = function( evt ) { return Generator.handleAnimationSelectList( evt ); }
		this.animations_list_elem.ondblclick = function( evt ) { return Generator.loadAnimation( Generator.selected_animation ) };

		document.getElementById( 'animationlist_btns' ).onclick = function( evt ) { return Generator.handleAnimationListBtns( evt ); }

		// device and animate selects
		document.getElementById( 'header' ).addEventListener( 'change', function( evt ){ Generator.handleMainMenu( evt ) }, true );

		// boxes
		document.getElementById( 'boxes' ).addEventListener( 'change', function( evt ){ Generator.handleBoxToggles( evt ) }, true );
		//document.getElementById( 'boxes' ).addEventListener( 'click', function( evt ){ Generator.handleMainMenu( evt ) }, true );

		// devices
		this.devices = this.getDevices();

		// fill devices menu
		var devices_select = document.getElementById( 'device' );
		for( device in this.devices )
		{
			var opt = document.createElement( 'option' );
			opt.id = device;
			opt.innerHTML = this.devices[ device ].name;
			devices_select.appendChild( opt );
		}

		// restore from local storage or defaults
		this.restoreState();
		this.setMenuOptions();

		// first draw
		this.redrawScreen();
		this.drawCurve();

		if ( this.debug ) // debug
		{
			// this.clicked = 1;
			// this.selected = this.clicked;
			// this.focusCanvasElement(); // focus element
			// this.handleFocus( { target: this.fields.from_x } );
			// this.redrawScreen();
			// this.getHandle( {x:1, y:2} );
			// this.clicked = 0;

			// document.getElementById( 'macro_name').value="test";
			// this.save_macro_stuff.querySelector( '#save_macro_btn' ).disabled = false;
		}

		// catch mouseups outside canvas
		var self = this;
		window.addEventListener( 'mouseup', function( event )
		{
			//log( 'mouseup window ' );
			if ( self.clicked ) self.handleCanvasMouseUp();
			else if ( self.curve_clicked ) self.handleCurveMouseUp();
		} );

		// only save state now (not reliable in Safari 14?)
		window.addEventListener( 'beforeunload', function( evt ) {
				
				self.saveState( false );
				delete evt['returnValue'];

			}, false );

		window.addEventListener( 'resize', function( evt ) {
		   	
		   //	log( window.innerWidth + ' : ' +  window.innerHeight + ' : ' + ( window.innerWidth / window.innerHeight ) );

		}, true ) 
	}

	// ------------------------------------------------

	Generator.handleCanvasMouseDown = function()
	{
		var mouseXY = this.getMouseXY();
		var bounds;
		var props;
		var handle = 0;

		this.clicked = 0;
		this.lastMouseXY = mouseXY;

		if ( this.selected ) // click on selected?
		{
			props = this.boxes[ this.selected ][ this.stage ];
			bounds = this.getBoxBounds( props, true, true );
			this.oldprops = { ...props };

			// yes
			if ( this.hitTest( mouseXY, bounds ) )
			{
				this.clicked = this.selected;
			}

			// handle?
			handle = this.getHandle( mouseXY );
			if ( handle )
			{
				if ( handle.indexOf( 'crop' ) >= 0 ) // crop
				{
					this.cropping = handle;
					var prop;
					if ( handle == 'crop21' ) prop = 'cropR';
					else if ( handle == 'crop01' ) prop = 'cropL';
					else if ( handle == 'crop10' ) prop = 'cropT';
					else if ( handle == 'crop12' ) prop = 'cropB';

					var elem = this.fields[ this.stage + '_' + prop ];
					this.focusRow( elem, prop );
				}
				else // scale
				{
					this.scaling = handle;
					var elem = this.fields[ this.stage + '_scale' ];
					this.focusRow( elem, 'scale' );
				}

				return;
			}
		}

		if ( this.clicked == 0 )
		{
			var max_length = this.boxes.length;
			for( var i = 1; i < max_length; i++ ) // always skip element 0
			{
				if ( ! this.boxes[ i ].enabled ) continue;

				props = this.boxes[ i ][ this.stage ];
				this.oldprops = { ...props };
				bounds = this.getBoxBounds( props, false );

				if ( this.hitTest( mouseXY, bounds ) )
				{
					this.clicked = i;
					break;
				}
			}
		}

		if ( this.clicked )
		{
			if ( this.selected ) this.blurRow(); // another element was active
			this.focusCanvasElement(); // focus element
		}
		else this.blurCanvasElement(); // blur element
		
		this.redrawScreen();
	}

	// ------------------------------------------------

	Generator.handleCanvasMouseMove = function()
	{
		var mouseXY = this.getMouseXY();

		if ( this.selected ) this.setCursor( mouseXY );	// cursor hover state			

		if ( this.clicked == 0 ) return;

		props = this.boxes[ this.clicked ][ this.stage ];

		var l = props.x + ( ( props.cropL - 16 ) * props.scale );
		var t = props.y + ( ( props.cropT - 9 ) * props.scale );

		var dox = mouseXY.x - this.lastMouseXY.x;
		var doy = mouseXY.y - this.lastMouseXY.y;
		var v;

		if ( dox || doy ) // we're dragging
		{
			if ( this.cropping !== 0 ) // crop
			{
				var snap = 0.3 / props.scale;

				if ( this.cropping == 'crop01' ) // crop L
				{
					v = Math.min( (this.hw*4) - this.oldprops.cropR, Math.max( 0, this.oldprops.cropL + ( dox / this.oldprops.scale ) ) );
					if ( v >= ( 16 - snap ) && v < ( 16 + snap ) ) v = 16;
				}
				else if ( this.cropping == 'crop10' ) // crop T
				{
					v = Math.min( (this.hh*4) - this.oldprops.cropB, Math.max( 0, this.oldprops.cropT - ( doy / this.oldprops.scale ) ) );
					if ( v >= ( 9 - snap ) && v < ( 9 + snap ) ) v = 9;
				}
				else if ( this.cropping == 'crop21' ) // crop R
				{
					v = Math.min( (this.hw*4) - this.oldprops.cropL, Math.max( 0, this.oldprops.cropR - ( dox / this.oldprops.scale ) ) );
					if ( v >= ( 16 - snap ) && v < ( 16 + snap ) ) v = 16;
				}
				else if ( this.cropping == 'crop12' ) // crop B
				{
					v = Math.min( (this.hh*4) - this.oldprops.cropT, Math.max( 0, this.oldprops.cropB + ( doy / this.oldprops.scale ) ) );
					if ( v >= ( 9 - snap ) && v < ( 9 + snap ) ) v = 9;
				}

				// compare from/to to see if different
				var was_changed = false;
				if ( ! this.floatsEqual( props[ this.current_prop ], v ) ) was_changed = true;

				props[ this.current_prop ] = v;

				this.updateFields( { [ this.current_prop ]: v }, this.stage );

				if ( was_changed ) this.drawCurve();

			}
			else if ( this.scaling !== 0 ) // scale
			{
				var r = this.oldprops.x + ( 16 * this.oldprops.scale );
				var b = this.oldprops.y + ( 9 * this.oldprops.scale );
				var w = r - props.x;
				var h = b - props.y;
				var mousear = Math.abs( mouseXY.y - props.y ) / Math.abs( mouseXY.x - props.x );
				var ar = h / w;

				if ( mousear > ar ) // follow w
				{
					var neww = Math.abs( mouseXY.x - props.x );
					var newh = ( neww * ar );
				}
				else // follow h
				{
					var newh = Math.abs( mouseXY.y - props.y );
					var neww = newh * ( w / h );
				}

				props.scale = Math.max( this.ranges.scale.min, Math.min( this.ranges.scale.max, ( neww * this.oldprops.scale ) / w ) );		
				this.updateFields( { scale: props.scale }, this.stage );
			}
			else // position
			{
				var newpos = this.checkSnap( this.oldprops.x + dox, this.oldprops.y + doy );

				props.x = newpos.x;
				props.y = newpos.y;

				this.updateFields( { x: newpos.x, y: newpos.y }, this.stage );
			}
		}

		this.redrawScreen();

		// var ctx = this.canvas_ctx;
		// ctx.fillStyle = 'rgba(255,222,0,0.5)';
		// ctx.fillRect( props.x + this.canvas_padding, props.y + this.canvas_padding, neww, newh );
		// ctx.strokeRect( cx + this.canvas_padding, cy + this.canvas_padding, mouseXY.x - cx, mouseXY.y - cy );

		// ctx.beginPath();
		// ctx.moveTo( cx + this.canvas_padding, cy + this.canvas_padding );
		// ctx.lineTo( cx + ( neww * 2.0 ) + this.canvas_padding, cy + ( newh * 2.0 ) + this.canvas_padding );
		// ctx.stroke();

		
	}

	// ------------------------------------------------

	Generator.getSnapBounds = function( props )
	{
		return {
			l: -16 + ( ( ( 16 - props.cropL ) * props.scale ) ),
			t: 9 + ( ( ( -9 + props.cropT ) * props.scale ) ),
			r: 16 - ( ( ( 16 - props.cropR ) * props.scale ) ),
			b: -9 + ( ( ( 9 - props.cropB ) * props.scale ) )
			};
	}
	// ------------------------------------------------

	Generator.checkSnap = function( x, y )
	{	
		var snap = 0.3;

		if ( x >= -snap && x < snap ) x = 0;
		else
		{
			if ( x >= ( this.snapbounds.l - snap ) && x < ( this.snapbounds.l + snap ) ) x = this.snapbounds.l;
			else if ( x <= ( this.snapbounds.r + snap ) && x > ( this.snapbounds.r - snap ) ) x = this.snapbounds.r;
		}

		if ( y > -snap && y < snap ) y = 0;
		{
			if ( y >= ( this.snapbounds.t - snap ) && y < ( this.snapbounds.t + snap ) ) y = this.snapbounds.t;
			else if ( y <= ( this.snapbounds.b + snap ) && y > ( this.snapbounds.b - snap ) ) y = this.snapbounds.b;
		}
		
		return { x: x, y: y }
	}

	// ------------------------------------------------

	Generator.handleCanvasMouseUp = function()
	{
		if ( this.clicked == 0 ) return;


		if ( this.cropping !== 0 )
		{

		}
		else if ( this.scaling !== 0 )
		{

		}
		else
		{

		}

		// check if within screen bounds
		// var props = this.boxes[ this.clicked ][ this.stage ];
		// var bounds = this.getBoxBounds( props, false, false );
		// var t = -this.canvas_padding - bounds.r;
		// if ( t > -20 ) props.x += t + ( this.canvas_padding * 0.5 );
		// var t = -this.canvas_padding - bounds.b;
		// if ( t > -20 ) props.y += t + ( this.canvas_padding * 0.5 );
		// var t = bounds.l - ( this.canvas_w + this.canvas_padding );
		// if ( t > -20 ) props.x -= t + ( this.canvas_padding * 0.5 );
		// var t = bounds.t - ( this.canvas_h + this.canvas_padding );

		// if ( t > -20 ) props.y -= t + ( this.canvas_padding * 0.5 );

		this.clicked = 0;
		this.cropping = 0;
		this.scaling = 0;
		this.dragOffset = 0;

		var mouseXY = this.getMouseXY();
		this.setCursor( mouseXY );

		this.redrawScreen();

		this.saveState( true );
	}

	// ------------------------------------------------

	Generator.handleCanvasMouseOut = function()
	{
		//log( 'mouseout' + Math.random( 1, 2222 ));
		//this.handleCanvasMouseUp();
	}

	// ------------------------------------------------

	Generator.handleFocus = function( e ) // handles focus for all document elements
	{
		if ( ! this.selected ) return;

		var elem = e.target;

		if ( elem.closest( '#transform' ) ) // focus on transform fields
		{
			var classes = elem.parentElement.classList;
			var cat, prop;
			[ cat, prop ] = elem.id.split('_');

			// change from/to stage
			if ( classes.contains( 'from-input' ) || classes.contains( 'to-input' ) )
			{
				this.setStage( cat );
			}

			// highlight row
			this.focusRow( elem, prop );
		}
		else
		{

		}
	}

	// ------------------------------------------------

	Generator.handleBlur = function( e ) // handles blur for all document elements
	{
		if ( ! this.selected ) return;

		var elem = e.target;

		if ( elem.closest( '#transform' ) ) // blur on transform fields
		{
			//elem.readOnly = true;
		}
		else
		{

		}
	}

	// ------------------------------------------------

	Generator.focusRow = function( elem, prop )
	{
		var focus_elem = this.transform_fieldset.querySelector( '.current_prop' );
		if ( focus_elem && focus_elem !== elem ) focus_elem.classList.remove( 'current_prop' );
		elem.classList.add( 'current_prop' );

		// focus new
		var row = elem.closest( 'tr' );
		if ( ! row.classList.contains( 'row-focus' ) )
		{
			// remove current focus
			var focus_row = this.transform_fieldset.querySelector( '.row-focus' );
			if ( focus_row ) focus_row.classList.remove( 'row-focus' );

			row.classList.add( 'row-focus' );

			// draw curve
			this.current_pts = this.boxes[ this.selected ].curves[ prop ];
			this.current_prop = prop;
			this.drawCurve();
		}
	}

	// ------------------------------------------------

	Generator.blurRow = function()
	{
		var focus_row = this.transform_fieldset.querySelector( '.row-focus' );
		if ( focus_row ) focus_row.classList.remove( 'row-focus' );

		var focus_elem = this.transform_fieldset.querySelector( '.current_prop' );
		if ( focus_elem )
		{
			focus_elem.classList.remove( 'current_prop' );
			this.setFieldEditable( focus_elem, false );
		}

		this.current_prop = 0;
		this.drawCurve();
	}

	// ------------------------------------------------
	
	Generator.updateFields = function( props, colname ) // update entire column
	{
		for( var prop in props )
		{
			var propname = colname + '_' + prop;
			if ( ! ( propname in this.fields ) ) continue;
			var val = props[ prop ];
			if ( typeof val === 'number' )
			{
				if ( colname !== 'frames' && colname !== 'delay' ) val = val.toFixed( 3 );
			}
			//log( 'updatefields ' + colname + ' ' + Date.now() );
			
			this.fields[ propname ].value = val;
		}
	}

	// ------------------------------------------------

	Generator.handleFieldsChange = function( e, no_update )
	{
		if ( ! this.selected ) return;
		var elem = e.target;
		var val;
		var inval = elem.value;

		var cat, prop;
		[ cat, prop ] = elem.id.split('_');

		if ( cat == 'frames' || cat == 'delay' )
		{
			inval = parseInt( inval );
			if ( isNaN( inval ) ) inval = this.ranges[ cat ].min;
			val = Math.max( this.ranges[ cat ].min, Math.min( this.ranges[ cat ].max, inval ) );
			if ( ! no_update ) elem.value = val;
		}
		else
		{
			inval = parseFloat( inval );
			if ( isNaN( inval ) )
			{
				//inval = this.ranges[ prop ].min;
				val = this.boxes[ this.selected ][ cat ][ prop ];
			} 
			else
			{
				
				val = Math.max( this.ranges[ prop ].min, Math.min( this.ranges[ prop ].max, +inval ) );
				if ( val != inval && ! no_update ) elem.value = val.toFixed( 3 );
			}
		}
		
		this.boxes[ this.selected ][ cat ][ prop ] = val;

		this.redrawScreen();
		this.drawCurve();
		this.saveState( true );
	}

	// ------------------------------------------------

	Generator.setFieldEditable = function( elem, editable )
	{
		if ( editable )
		{
			elem.classList.add( 'selectable' );
			elem.readOnly = false;
		}
		else
		{
			elem.classList.remove( 'selectable' );
			elem.readOnly = true;
		}
	}

	// ------------------------------------------------

	Generator.handleFieldsKeyUp = function( e )
	{
		if ( ! this.selected ) return;
		var elem = e.target;

		this.handleFieldsChange( e, true );

		if ( e.key === 'Enter' || e.keyCode === 13 ) elem.select();
	}

	// ------------------------------------------------

	Generator.handleFieldsMouseDown = function( e )
	{
		if ( ! this.selected ) return false;
		
		var elem = e.target;

		// click on focuses element
		if ( document.activeElement == elem ) this.setFieldEditable( elem, true );

		//if ( elem.type == 'text' && elem === document.activeElement )
		{
			//elem.select();
			//elem.readOnly = false;
		}

		return false;
	}

// ------------------------------------------------

	Generator.handleFieldsMouseUp = function( e )
	{
		// if ( ! this.selected ) return false;
		
		// var elem = e.target;

		// if ( elem.type == 'text' && elem === document.activeElement )
		// {
		// 	elem.select();
		// 	//elem.readOnly = false;
		// }

		return true;
	}

	// ------------------------------------------------

	Generator.handleFieldsWheel = function( e )
	{
		if ( ! this.selected ) return true;
		
		var elem = e.target;

		if ( elem.type == 'text' && elem === document.activeElement )
		{
			var cat, prop;
			[ cat, prop ] = elem.id.split('_');

//log( 'wheel ' + cat + ' ' + prop + ' ' + event.deltaY );
			if ( cat == 'frames' || cat == 'delay' )
			{
				var cat = this.boxes[ this.selected ][ cat ]; // either frames or delay
				var d = ( event.deltaY * 0.01 );
				if ( d > 0 ) d = Math.max( 1, d );
				else d = Math.min( -1, d );
				elem.value = cat[ prop ] + d;
			}
			else
			{
				var props = this.boxes[ this.selected ][ this.stage ];
				//log( props )
				var f;
				if ( prop == 'scale' ) f = -0.0001 * props[ prop ];
				else  f = -0.0025;

				if ( prop == 'y' ) f = -f; // flip

				elem.value = props[ prop ] + ( event.deltaY * f );
				//log( elem.value );
			}

			//log( this.current_prop + ' ' + props[ this.current_prop ] )

			this.handleFieldsChange( { target: elem } ); // will take care of valid range/format

			return false;
		}

		return true;
	}

	// ------------------------------------------------

	Generator.handleTools = function( e )
	{
		var elem = e.target;

		if ( elem.id == 'from_btn' )
		{
			this.setStage( 'from' );
		}
		else if ( elem.id == 'to_btn' )
		{
			this.setStage( 'to' );
		}
		else if ( elem.id == 'play_btn' )
		{
			if ( this.play_state == 0 ) this.play();
			else this.stop( true );
		}
		else if ( elem.id.startsWith( 'fpsbtn_' ) )
		{
			var newfps = elem.id.split( '_' )[1];
			if ( this.fps == newfps ) return;

			this.fps = newfps;
			this.setFPSbtns();

			this.saveState( true );
			if ( this.play_state )
			{
				this.stop();
				this.play();
			}
		}
	}

	// ------------------------------------------------

	Generator.setFPSbtns = function()
	{
		var curr = this.playback_tools.querySelector('#fpsbtns .toggled' );
		if ( curr ) curr.classList.remove( 'toggled' );
		this.playback_tools.querySelector('#fpsbtn_' + this.fps ).classList.add( 'toggled' );
	}

	// ------------------------------------------------

	Generator.handleSourceSelect = function( e )
	{
		if ( ! this.selected ) return;
		var elem = e.target;

		var src = elem.options[ elem.selectedIndex ].id;
		this.boxes[ this.selected ].src = ( src == 'none' ? 0 : src );

		this.redrawScreen();
	}

	// ------------------------------------------------

	Generator.handleDataBtns = function( e )
	{
		if ( ! this.selected ) return;
		var elem = e.target;

		var props = this.boxes[ this.selected ][ this.stage ];

		if ( elem.id == 'reset_scale_btn' )
		{
			props.scale = 1.0;
		}
		else if ( elem.id == 'reset_crop_btn' )
		{
			props.cropL = props.cropT = props.cropR = props.cropB = 0;
		}
		else if ( elem.id == 'reverse_btn' )
		{
			var tmp = { ...this.boxes[ this.selected ].from };
			this.boxes[ this.selected ].from = this.boxes[ this.selected ].to;
			this.boxes[ this.selected ].to = tmp;

			// reverse curves
			for( prop in this.boxes[ this.selected ].curves )
			{
				var p1 = { ...this.boxes[ this.selected ].curves[ prop ].p1 };
				var p2 = { ...this.boxes[ this.selected ].curves[ prop ].p2 };

				this.boxes[ this.selected ].curves[ prop ].p1 = { x: 1 - p2.x, y: 1 - p2.y };
				this.boxes[ this.selected ].curves[ prop ].p2 = { x: 1 - p1.x, y: 1 - p1.y };
			}

			this.updateFields( this.boxes[ this.selected ].to, 'to' );
			this.updateFields( this.boxes[ this.selected ].from, 'from' );
			if ( this.stage != 'from' ) this.setStage('from');
			else this.redrawScreen();
			this.drawCurve();

			return;
		}
		else if ( elem.id == 'copy_btn' )
		{
			this.clipboard = this.deepClone( this.boxes[ this.selected ] );
			document.getElementById( 'paste_btn' ).disabled = false;
		}
		else if ( elem.id == 'paste_btn' )
		{
			this.boxes[ this.selected ].from = this.deepClone( this.clipboard.from );
			this.boxes[ this.selected ].to = this.deepClone( this.clipboard.to );
			this.boxes[ this.selected ].delay = this.deepClone( this.clipboard.delay );
			this.boxes[ this.selected ].frames = this.deepClone( this.clipboard.frames );
			this.boxes[ this.selected ].curves = this.deepClone( this.clipboard.curves );
			this.setStage( 'from' );
		}
		else
		{
			var pos_preset = elem.id.split( '_' );
			if ( pos_preset[ 1 ] == 'pos' ) // position presets
			{
				var x = pos_preset[ 2 ].charAt(0) - 1;
				var y = -( pos_preset[ 2 ].charAt(1) - 1 );

				var newx, newy;

				if ( x < 0 ) newx = ( 16 * x ) + ( ( ( 16 - props.cropL ) * -x ) * props.scale );
				else newx = ( 16 * x ) + ( ( ( 16 - props.cropR ) * -x ) * props.scale );

				if ( y < 0 ) newy = ( 9 * y ) + ( ( ( 9 - props.cropB ) * -y ) * props.scale );
				else newy = ( 9 * y ) + ( ( ( 9 - props.cropT ) * -y ) * props.scale );

				props.x = newx;
				props.y = newy;
			}

		}

		this.updateFields( this.boxes[ this.selected ][ this.stage ], this.stage );
		this.drawCurve();
		this.redrawScreen();

	}

	// ------------------------------------------------

	Generator.handleMainMenu = function( e )
	{
		var elem = e.target;
		this.blurCanvasElement();

		if ( elem.id == 'device' )
		{
			this.device = elem.options[ elem.selectedIndex ].id;
			this.switcher = 'ME1';
			this.setMenuOptions();
			this.setupProps();
			this.saveState( true );
		}
		else if ( elem.id == 'switcher' )
		{
			this.switcher = elem.options[ elem.selectedIndex ].id;
			this.setupProps();
			this.saveState( true );
		}

		if ( this.stage != 'from' ) this.setStage( 'from' );
		else this.redrawScreen();

		return false;
	}

	// ------------------------------------------------

	Generator.setMenuOptions = function()
	{
		// set device option selection
		var device_elem = document.getElementById( 'device' );
//log( '#' + this.device );
		device_elem.querySelector( '#' + this.device ).selected = true;

		// set switcher option selection
		var switcher_elem = document.getElementById( 'switcher' );
		switcher_elem.querySelector( '#' + this.switcher ).selected = true;

		// create animate menu options
		var option;
		var options = this.getDeviceCapabilities( this.device );

		// set switchers
		for( var i = 0; i < 4; i++ )
		{
			option = switcher_elem.options[i];
			if ( i >= options.switchers ) option.disabled = true;
			else
			{
				if ( option.value == this.switcher ) option.selected = 'selected';
				option.disabled = false;
			}
		}

		if ( options.switchers == 1 )
		{
			switcher_elem.disabled = true;
			switcher_elem.querySelector( 'option' ).selected = false;
			switcher_elem.options[0].selected = true;
		}
		else switcher_elem.disabled = false;

		// set source options
		for( i = this.source_select.length; i >= 1 ; i-- )
			this.source_select.remove( i );

		// Black
		var opt = document.createElement( 'option' );
		opt.id = 'Black';
		opt.innerHTML = 'Black';
		this.source_select.appendChild( opt );

		// add camera's
		for( i = 1; i <= options.cameras; i++ )
		{
			var opt = document.createElement( 'option' );
			opt.id = "Camera" + i;
			opt.innerHTML = "Camera " + i;
			this.source_select.appendChild( opt );
		}

		// color bars
		var opt = document.createElement( 'option' );
		opt.id = 'ColorBars';
		opt.innerHTML = 'Color Bars';
		this.source_select.appendChild( opt );

		// add color generators
		for( i = 1; i <= options.colors; i++ )
		{
			var opt = document.createElement( 'option' );
			opt.id = 'Color' + i;
			opt.innerHTML = 'Color ' + i;
			this.source_select.appendChild( opt );
		}

		// add media players
		for( i = 1; i <= options.mediaplayers; i++ )
		{
			var opt = document.createElement( 'option' );
			opt.id = 'MediaPlayer' + i;
			opt.innerHTML = 'Media Player ' + i;
			this.source_select.appendChild( opt );

			var opt = document.createElement( 'option' );
			opt.id = 'MediaPlayer' + i + 'Key';
			opt.innerHTML = 'Media Player ' + i + ' Key';
			this.source_select.appendChild( opt );
		}

		// add super sources
		for( i = 1; i <= options.supersource; i++ )
		{
			var opt = document.createElement( 'option' );
			opt.id = 'SuperSource';
			opt.innerHTML = 'Supersource';
			this.source_select.appendChild( opt );
		}

		this.setFPSbtns();

		this.save_macro_stuff.querySelector( '#macro_index' ).value = this.macro_index;
	}

	// ------------------------------------------------
	
	Generator.getDeviceCapabilities = function( device )
	{
		return this.devices[ device ];
	}

	// ------------------------------------------------
	
	Generator.handleBoxToggles = function( e )
	{
		var box_index = e.target.value;
		this.boxes[ box_index ].enabled = e.target.checked;

		//log( box_index );

		if ( this.selected == box_index && ! e.target.checked )
		{
			this.handleCanvasMouseDown();
		}
		else if ( e.target.checked )
		{
			this.clicked = box_index;
			this.selected = this.clicked;
			this.focusCanvasElement(); // focus element
			this.clicked = 0;
		}

		this.redrawScreen();
		this.saveState( true );
	}

	// ------------------------------------------------

	Generator.focusCanvasElement = function()
	{
		this.selected = this.clicked;
		this.transform_fieldset.disabled = false;
		this.data_btns.disabled = false;
		this.source_select.disabled = false;
		var option_elem = this.source_select.namedItem( this.boxes[ this.selected ].src );
		if ( option_elem ) option_elem.selected = true;
		else this.source_select.namedItem( 'none' ).selected = true;


		// all columns
		this.updateFields( this.boxes[ this.selected ].from, 'from' );
		this.updateFields( this.boxes[ this.selected ].to, 'to' );
		this.updateFields( this.boxes[ this.selected ].delay, 'delay' );
		this.updateFields( this.boxes[ this.selected ].frames, 'frames' );

		this.snapbounds = this.getSnapBounds( this.boxes[ this.selected ][ this.stage ] );

	}

	// ------------------------------------------------

	Generator.blurCanvasElement = function()
	{
		this.selected = 0;
		this.transform_fieldset.disabled = true;
		this.data_btns.disabled = true;
		this.source_select.disabled = true;
		this.source_select.selectedIndex = 0;

		// empty all columns
		var emptyprops = { label: '', i: '', x: '', y: '', scale: '', cropL: '', cropT: '', cropR: '', cropB: '' };
		this.updateFields( emptyprops, 'from' );
		this.updateFields( emptyprops, 'to' );
		this.updateFields( emptyprops, 'delay' );
		this.updateFields( emptyprops, 'frames' );

		document.activeElement.blur();
		this.blurRow();
	}

	// ------------------------------------------------
	
	Generator.setStage = function( stage )
	{
		if ( ( stage == 'to' && this.stage !== 'to' ) || ( stage == 'from' && this.stage !== 'from' ) )
		{
			this.stage = stage;
			this.redrawScreen();

			this.playback_tools.querySelector('#from_btn' ).classList.toggle( 'toggled' );
			this.playback_tools.querySelector('#to_btn' ).classList.toggle( 'toggled' );

			this.transform_fieldset.querySelector('#from_th' ).classList.toggle( 'col-focus' );
			this.transform_fieldset.querySelector('#to_th' ).classList.toggle( 'col-focus' );

			if ( this.current_prop )
			{
				var elem = this.fields[ this.stage + '_' + this.current_prop ];
				this.focusRow( elem, this.current_prop );
			}
		}
		else this.redrawScreen();
	}

	// ------------------------------------------------

	Generator.getMouseXY = function()
	{
		return this.mouseToBMDcoords();
	}

	// ------------------------------------------------

	Generator.mouseToBMDcoords = function()
	{
		var e = window.event;

		var fx = ( e.offsetX / e.target.offsetWidth );
		var fy = ( e.offsetY / e.target.offsetHeight );

		var w = 16 * 2;
		var h = 9 * 2;
		var pad2 = this.pad + this.pad;

		var x = ( fx * ( w + pad2 ) ) - ( ( w * 0.5 ) + this.pad );
		var	y = -( ( fy * ( h + pad2 ) ) - ( ( h * 0.5 ) + this.pad ) ); // yes, that inverted y is pretty ridiculous
		
//log( this.BMDtoCanvasCoords( x, y ) )

		return { x: x, y: y };
	}

	// ------------------------------------------------

	Generator.BMDtoCanvasCoords = function( x, y )
	{
		var pad2 = this.pad + this.pad;
		x = Math.round( ( this.canvas_w/2 ) + ( x * ( this.canvas_w / ( ( 16 * 2 ) + pad2 ) ) ) );
		y = Math.round( ( this.canvas_h/2 ) + ( -y * ( this.canvas_h / ( ( 9 * 2 ) + pad2 ) ) ) );

		return { x: x, y: y }; 
	}

	// ------------------------------------------------

	Generator.getBoxBounds = function( props, outer_bounds, with_offset )
	{
		var offset;
		if ( with_offset ) offset = this.handleSize * 0.5;
		else offset = 0;

		var hw = 16 * props.scale;
		var hh = 9 * props.scale;

		if ( outer_bounds == true ) return {
			l: props.x - offset - hw,
			t: props.y + offset + hh,
			r: props.x + hw + offset,
			b: props.y - hh - offset };

		return {
			l: props.x - hw + ( props.cropL * props.scale ) - offset,
			t: props.y + hh - ( props.cropT * props.scale ) + offset,
			r: props.x + hw - ( props.cropR * props.scale ) + offset,
			b: props.y - hh + ( props.cropB * props.scale ) - offset };
		}

	// ------------------------------------------------
	
	Generator.hitTest = function( mouseXY, bounds )
	{
		return ( mouseXY.x >= bounds.l && mouseXY.x < bounds.r && mouseXY.y <= bounds.t && mouseXY.y > bounds.b );
	}

	// ------------------------------------------------
	
	Generator.hitTestCurve = function( mouseXY, bounds )
	{
		return ( mouseXY.x >= bounds.l && mouseXY.x < bounds.r && mouseXY.y >= bounds.t && mouseXY.y < bounds.b );
	}

	// ------------------------------------------------

	Generator.getHandle = function( mouseXY )
	{
		if ( this.selected == 0 ) return;

		var outer_bounds = this.getBoxBounds( this.boxes[ this.selected ][ this.stage ], true, true );
		var outer_w = ( outer_bounds.r - outer_bounds.l - this.handleSize ) * 0.5;
		var outer_h = ( outer_bounds.t - outer_bounds.b - this.handleSize ) * 0.5;

		var crop_bounds = this.getBoxBounds( this.boxes[ this.selected ][ this.stage ], false, true );
		var inner_w = ( crop_bounds.r - crop_bounds.l - this.handleSize ) * 0.5;
		var inner_h = ( crop_bounds.t - crop_bounds.b - this.handleSize ) * 0.5;

// var c = this.BMDtoCanvasCoords( outer_bounds.r, outer_bounds.b );
// this.drawPoint( this.canvas_ctx, c, 10, '#0FF' );

// c = this.BMDtoCanvasCoords( outer_bounds.l, outer_bounds.t );
// this.drawPoint( this.canvas_ctx, c, 10, '#00F' );

// c = this.BMDtoCanvasCoords( crop_bounds.l, crop_bounds.t );
// this.drawPoint( this.canvas_ctx, c, 10, '#F0F' );

// c = this.BMDtoCanvasCoords( crop_bounds.r, crop_bounds.b );
// this.drawPoint( this.canvas_ctx, c, 10, '#FF0' );

		var bounds;
		var w;
		var h;

		for( var x = 0; x < 3; x++ )
		{
			for( var y = 0; y < 3; y++ )
			{
				if ( x == 1 && y == 1 ) continue; // center dot

				if ( x == 1 || y == 1 ) // crop handles
				{
					bounds = crop_bounds;
					w = inner_w;
					h = inner_h;
				}
				else // scale handles
				{
					bounds = outer_bounds;
					w = outer_w;
					h = outer_h;
				}
				
				var l = bounds.l + ( x * w );
				var t = bounds.t - ( y * h );
				var r = l + this.handleSize;
				var b = t - this.handleSize;

// c = this.BMDtoCanvasCoords( l, t );
// this.drawPoint( this.canvas_ctx, c, 5, '#FD0' );
// c = this.BMDtoCanvasCoords( r, b );
// this.drawPoint( this.canvas_ctx, c, 5, '#0D0' );

				if ( this.hitTest( mouseXY, { l: l, t: t, r: r, b: b } ) )
				{
					if ( x % 2 || y % 2 ) return 'crop' + x + y;
					else return 'scale' + x + y;
				}
			}
		}

		return 0;
	}

	// ------------------------------------------------

	Generator.setCursor = function( mouseXY )
	{
		var hdl = this.getHandle( mouseXY );
		if ( hdl !== 0 )
		{
			if ( hdl == 'crop21' ) this.canvas_elem.style.cursor = 'w-resize';
			else if ( hdl == 'crop01' ) this.canvas_elem.style.cursor = 'e-resize';
			else if ( hdl == 'crop10' ) this.canvas_elem.style.cursor = 's-resize';
			else if ( hdl == 'crop12' ) this.canvas_elem.style.cursor = 'n-resize';
			else if ( hdl == 'scale22' ) this.canvas_elem.style.cursor = 'nw-resize';
			else if ( hdl == 'scale00' ) this.canvas_elem.style.cursor = 'se-resize';
			else if ( hdl == 'scale20' ) this.canvas_elem.style.cursor = 'sw-resize';
			else if ( hdl == 'scale02' ) this.canvas_elem.style.cursor = 'ne-resize';
		}
		else
		{
			var bounds = this.getBoxBounds( this.boxes[ this.selected ][ this.stage ], true, true );
// log( mouseXY );
// log( bounds );
			if ( this.hitTest( mouseXY, bounds ) ) this.canvas_elem.style.cursor = 'move';
			else if ( this.clicked == 0 ) this.canvas_elem.style.cursor = 'default';
		}
	}

	// ------------------------------------------------

	Generator.redrawScreen = function( elements )
	{
		var ctx = this.canvas_ctx;

		if ( ! elements ) elements = this.boxes;

		// clear to CSS background color (optimized)
		ctx.clearRect( 0, 0, ctx.width, ctx.height );

		// draw all elements
		var selected_info = 0;
		var info = 0;
		var max_length = elements.length;
		for( var i = max_length-1; i > 0; i-- ) // always skip element 0
		{
			if ( ! elements[ i ].enabled ) continue;
			info = this.drawBox( ctx, elements[ i ] );
			if ( i == this.selected ) selected_info = info;
		}

		// draw offscreen padding
		ctx.fillStyle = 'rgba(0,0,0,0.6)';
		padpx = Math.round( this.pad * this.drawfactor );
		ctx.fillRect( 0, 0, ctx.width, padpx );
		ctx.fillRect( 0, ctx.height - padpx, ctx.width, padpx );
		ctx.fillRect( 0, padpx, padpx, ctx.height - padpx - padpx );
		ctx.fillRect( ctx.width - padpx, padpx, padpx, ctx.height - padpx - padpx );

		// screen center cross
		ctx.fillStyle = 'rgba(0,0,0,0.2)';
		ctx.fillRect( 0, ( ctx.height * 0.5 ) - 1, ctx.width, 2 );
		ctx.fillRect( ( ctx.width * 0.5 ) - 1, 0, 2, ctx.height );

		// draw handles on selected
		if ( this.play_state === 0 && selected_info !== 0 )
		{
			var l = selected_info.l;
			var t = selected_info.t;
			var cw = selected_info.cw;
			var ch = selected_info.ch;

			// selection outline
			ctx.strokeStyle = 'white';
			ctx.setLineDash( [] );
			ctx.fillStyle = 'white';
			ctx.lineWidth = 4;
			ctx.strokeRect(	l + 2, t + 2, cw - 2, ch - 2 );

			// dashed non-cropped box
			ctx.setLineDash( [ 10, 10 ] );
			ctx.lineWidth = 2;
			ctx.strokeRect(	
				selected_info.x - selected_info.w + 1, 
				selected_info.y - selected_info.h + 1, 
				( selected_info.w * 2 ) - 2, 
				( selected_info.h * 2 ) - 2 );

			// handles
			ctx.fillStyle = '#FFF';
			var hdl = Math.round( this.handleSize * this.drawfactor );
			var hhdl = hdl * 0.5;

			for( var x = -1; x < 2; x++ )
			{
				for( var y = -1; y < 2; y++ )
				{
					if ( x == 0 && y == 0 ) // center mark
					{
						ctx.fillRect( 
							selected_info.x - 20,
							selected_info.y - 2,
							40,
							4,
							);
						ctx.fillRect( 
							selected_info.x  - 2,
							selected_info.y - 20,
							4,
							40,
							);
					}
					else if ( x == 0 || y == 0 ) // crop handles
					{
						ctx.fillStyle = '#BBB';
						ctx.fillRect( 
							l + ( cw * 0.5 * (x+1) ) - hhdl + 2, 
							t + ( ch * 0.5 * (y+1) ) - hhdl + 2, 
							hdl - 4, hdl - 4 );
						ctx.fillStyle = '#FFF';
					}
					else // scale handles
					{
						ctx.fillRect( 
							selected_info.x - ( selected_info.w * x ) - hhdl, 
							selected_info.y - ( selected_info.h * y ) - hhdl, 
							hdl, hdl );
					}
				}
			}

			// --------------••••••• DEBUG
			// var props = elements[ this.selected ][ this.stage ];

			// var hw = 16 * 0.5;
			// var hh = 9 * 0.5;


			// var l = -hw + ( ( ( hw - ( props.cropL * 0.5 ) ) * props.scale ) );
			// var t = hh + ( ( ( -hh + ( props.cropT * 0.5 ) ) * props.scale ) );
			// var r = hw - ( ( ( hw - ( props.cropR * 0.5 ) ) * props.scale ) );
			// var b = -hh + ( ( ( hh - ( props.cropB * 0.5 ) ) * props.scale ) );
			

			// var lt = this.BMDtoCanvasCoords( l, t );
			// var rb = this.BMDtoCanvasCoords( r, b );

			// ctx.lineWidth = 2;
			// ctx.strokeStyle = '#F99';
			// ctx.setLineDash( [ 5, 5 ] );
			// ctx.strokeRect( lt.x, lt.y, rb.x - lt.x, rb.y - lt.y );
			// --------------••••••• DEBUG

		}

		// draw dashed screen rect
		// ctx.lineWidth = 2;
		// ctx.strokeStyle = 'white';
		// ctx.setLineDash( [10, 10] );
		// ctx.strokeRect( this.canvas_padding, this.canvas_padding, this.canvas_w, this.canvas_h );

// draw snap bounds
// var lt = this.BMDtoCanvasCoords( this.snapbounds.l, this.snapbounds.t );
// var rb = this.BMDtoCanvasCoords( this.snapbounds.r, this.snapbounds.b );
// this.canvas_ctx.strokeRect( lt.x, lt.y, rb.x - lt.x, rb.y - lt.y );

	}

	// ------------------------------------------------

	Generator.drawBox = function( ctx, elem_props )
	{
		var props;
		var index = elem_props.i;

		if ( this.play_state && elem_props.at ) props = elem_props.at;
		else props = elem_props[ this.stage ];
		
		// get center
		var center = this.BMDtoCanvasCoords( props.x, props.y );

		// calc half width/height
		var w = Math.round( ( 16 * props.scale ) * this.drawfactor );
		var h = Math.round( ( 9 * props.scale ) * this.drawfactor );

		// get cropped bounds
		var l = Math.round( center.x - w + ( ( props.cropL * props.scale ) * this.drawfactor ) );
		var t = Math.round( center.y - h + ( ( props.cropT * props.scale ) * this.drawfactor ) );
		var cw = Math.round( center.x + w - ( ( props.cropR * props.scale ) * this.drawfactor ) - l );
		var ch = Math.round( center.y + h - ( ( props.cropB * props.scale ) * this.drawfactor ) - t );

		// draw cropped rect background
		ctx.fillStyle = this.boxcolors[ index ].bkg;
		ctx.fillRect( l, t, cw, ch );
		
		// set up clip for content
		ctx.save();
		var region = new Path2D();
		region.rect( l, t, cw, ch );
		ctx.clip( region );

		// draw contents
		ctx.beginPath();
		ctx.arc( center.x, center.y, h, 0, 2 * Math.PI, false );
		ctx.fillStyle = this.boxcolors[ index ].circle;
		ctx.fill();

		// center cross
		ctx.fillStyle = '#000';
		ctx.fillRect( l, center.y - 1, cw, 2 ); // cross h
		ctx.fillRect( center.x - 1, t, 2, ch ); // cross v
		
		// label in content
		ctx.fillStyle = '#FFF';
		ctx.font = 'bold ' + ( 300 * props.scale ) + 'px sans-serif';
		ctx.textAlign = 'center';
		ctx.fillText( elem_props.label, center.x, center.y + ( 60 * props.scale ) );

		ctx.restore();

		if ( elem_props.i == this.selected && ! this.play_state )
		{
			ctx.fillStyle = 'white';
		}
		else
		{
			// draw rect outline
			ctx.setLineDash( [] );
			ctx.strokeStyle = '#3854AC';
			ctx.fillStyle = ctx.strokeStyle;
			ctx.lineWidth = 4;
			ctx.strokeRect(	l + 2, t + 2, cw - 2, ch - 2 );
		}

		// draw label left top
		ctx.font = '36px sans-serif';
		ctx.textAlign = 'left';
		ctx.fillText( elem_props.label, l + 20, t + 50 );
		if ( elem_props.src != 0 )
		{
			ctx.font = '28px sans-serif';
			ctx.fillText( elem_props.src, l + 20, t + 85 );
		}

		return { l: l, t: t, cw: cw, ch: ch, x: center.x, y: center.y, w: w, h: h };

	}

	// ------------------------------------------------

	Generator.storeData = function( cname, data )
	{
		if ( data === 0 ) window.localStorage.removeItem( cname );
		else window.localStorage.setItem( cname, JSON.stringify( data ) );
	}
	// ------------------------------------------------

	Generator.retrieveData = function( cname ) 
	{
		var stored_state = window.localStorage.getItem( cname );

		stored_state = JSON.parse( stored_state );
		if ( ! stored_state || ( typeof stored_state !== 'object' ) )
		{
			//alert( 'State contents not valid' )
			return 0;
		}

		return stored_state;
	}

	// ------------------------------------------------

	Generator.saveState = function( from_event )
	{
		if ( from_event ) return;

		//log( '••••• SAVING STATE •••••', this.settings );

		// save state
		this.storeData( 'settings', this.getStateStorageStruct() );
	}

	// ------------------------------------------------

	Generator.restoreState = function( file_storage )
	{
		if ( ! file_storage )
		{
			stored_state = this.retrieveData( 'settings' ); // from localstorage
			this.animation_presets = this.retrieveData( 'animations' ); // from localstorage
		}
		else // file storage is a combo of state + animations
		{
			stored_state = file_storage[ 'state' ];

			if ( +stored_state.version != this.file_version )
			{
				alert( 'File version ('+ parseInt( stored_state.version ) +') doesn\'t match current ('+ this.file_version +'), sorry' );
				stored_state = 0;
			}
			else
			{
				this.animation_presets = file_storage[ 'animations' ];
			}
		}

		if ( ! stored_state || ( +stored_state.version != this.file_version ) )
		{
			this.settings = {}; // per device settings
		}
		else
		{
			this.device = stored_state.device;
			this.switcher = stored_state.switcher;
			this.settings = stored_state.settings;
			this.fps = stored_state.fps;
			this.macro_index = stored_state.macro_index;
		}

		if ( ! this.animation_presets ) this.animation_presets = {};

		this.setupProps();
	}

	// ------------------------------------------------

	Generator.setupProps = function()
	{
		// defaults from file or localstorage are set, determine what to set up

		this.boxes = [ 0 ];

		// settings
		if ( ( this.device in this.settings ) // settings exist for this device/switcher/animate combo
			&& ( this.switcher in this.settings[ this.device ] ) ) 
		{
			this.boxes = this.settings[ this.device ][ this.switcher ];
		}
		else // get defaults
		{
			// get possible options
			if ( this.device === 0 ) this.device = 'mini'; // default to Mini
			
			// default switcher
			if ( this.switcher == 0 ) this.switcher = 'ME1';

			// default fps
			if ( this.fps == 0 ) this.fps = 30;

			if ( ! ( this.device in this.settings ) ) this.settings[ this.device ] = {};
			if ( ! ( this.switcher in this.settings[ this.device ] ) ) this.settings[ this.device ][ this.switcher ] = {};
			
			this.settings[ this.device][ this.switcher ] = this.boxes;
		}

		// get device options
		var options = this.getDeviceCapabilities( this.device );
		var animation_options = { 'keyers': options.keyers, 'supersource': options.supersource ? 4 : 0 };

		// animation presets
		if ( ( this.device in this.animation_presets ) 
			&& ( this.switcher in this.animation_presets[ this.device ] ) ) // animations exist for this combo
		{
			// do nothing, this.animation_presets was loaded from storage
		}
		else // create device/animate defaults
		{
			// get the presets for this device/animate combo
			if ( ! ( this.device in this.animation_presets ) ) this.animation_presets[ this.device ] = {};
			if ( ! ( this.switcher in this.animation_presets[ this.device ] ) ) this.animation_presets[ this.device ][ this.switcher ] = {};
			this.animation_presets[ this.device ][ this.switcher ] = this.getAnimationPresets( options, this.switcher );
		}

		// set current animations presets list for quick referencing
		this.animations_list = this.animation_presets[ this.device ][ this.switcher ];
		this.updateAnimationList();

		// set box elements in UI
		var n = 1;
		for( var animate in animation_options )
		{
			var boxes_elem = document.getElementById( animate );
			while ( boxes_elem.firstChild ) { boxes_elem.removeChild( boxes_elem.lastChild ); }
			var ui = '';
			for( i = 1; i <= animation_options[ animate ]; i++ )
			{
				ui += '<input class="nobox" type="checkbox" id="box' + n + '" value="' + n + '"><label class="boxlabel btn" for="box' + n + '">' + i + '</label>';
				n++;
			}
			if ( ! animation_options[ animate ] ) ui = 'N/A';
			boxes_elem.innerHTML = ui;
		}

		if ( this.boxes.length == 1 && this.animations_list.length ) 
		{
			this.loadAnimation( 1 ); // first time defaults
		}
		else
		{
			this.fillBoxes();
			this.setBoxToggles();
		}
	}

	// ------------------------------------------------

	Generator.fillBoxes = function() // re-index and create boxes (when not present in current animation)
	{
		var options = this.getDeviceCapabilities( this.device );
		var animation_options = { 'keyers': options.keyers, 'supersource': options.supersource ? 4 : 0 };

		var box_count = 0;
		var name;
		box_count = animation_options.keyers + animation_options.supersource;
		if ( box_count == this.boxes.length-1 ) return; // all is well

		// sort and remove
		var keyers = [];
		var supersource = [];

		var len = this.boxes.length;
		for( var i = 1; i < len; i++ ) // 1-based index
		{
			if ( this.boxes[ i ].type == 'keyers' ) keyers.push( this.boxes[ i ] );
			else supersource.push( this.boxes[ i ] );
		}
		this.boxes.splice(1); // remove all but 0 at pos 0
		
		var set_enabled = ( len == 1 );

		var rows = 1;
		var cols = 1;

		if ( box_count == 8 )
		{
			rows = 3;
			cols = 3;
		}
		else if ( box_count == 6 )
		{
			rows = 2;
			cols = 3;
		}
		else if ( box_count == 4 )
		{
			rows = 2;
			cols = 2;
		}
		else if ( box_count == 2 )
		{
			rows = 1;
			cols = 2;
		}
		
		var w = 32 / cols;
		var h = 18 / rows;
		var s = Math.min( 0.5, ( 1 / cols ) );
		var x = 0;
		var y = 0;
		
		for( var i = 1; i <= box_count; i++ )
		{
			if ( i > animation_options.keyers )
			{
				name = 'box' + ( i - animation_options.keyers );
				type = 'supersource';
			}
			else
			{
				name = 'key' + i;
				type = 'keyers';
			}

			var box = 0;
			if ( i <= animation_options.keyers && keyers.length ) box = keyers.splice( 0,1 )[0];
			else if ( i > animation_options.keyers && supersource.length ) box = supersource.splice( 0,1 )[0];

			if ( box ) // box exists
			{
				box.i = i;
				box.type = type;
				this.boxes.push( box );
			}
			else // box not present, create default
			{
				if ( cols == 3 ) x = ( ( (i-1) % cols ) ) * w - (w * 1 );
				else if ( cols == 2 ) x = ( ( (i-1) % cols ) ) * w - (w * 0.5 );
				if ( rows == 2 ) y = (-Math.floor(i/(cols+1))) * h - (h*-0.5);
				else if ( rows == 3 ) y = -Math.floor( ( (i-1) / cols - 0.5 ) + 0.5 ) * h + h;

				this.boxes.push( { 
					i: i, 
					label: name,
					enabled: set_enabled,
					src: 0,
					type: type,
					from:   { x: x, y: y, scale: s, cropL: 0,  cropT: 0,  cropR: 0,  cropB: 0 },
					to:     { x: 0, y: 0, scale: 1.0,   cropL: 0,  cropT: 0,  cropR: 0,  cropB: 0 },
					at:     0,
					delay:  { x: 0,   y: 0,  scale: 0,   cropL: 0,  cropT: 0,  cropR: 0,  cropB: 0 },
					frames: { x: 20,  y: 20, scale: 20,  cropL: 20, cropT: 20, cropR: 20, cropB: 20 },
					curves: {
						x:     { p1: { x: 0.37, y: 0 }, p2: { x: 0.63, y: 1 } },
						y:     { p1: { x: 0.37, y: 0 }, p2: { x: 0.63, y: 1 } },
						scale: { p1: { x: 0.37, y: 0 }, p2: { x: 0.63, y: 1 } },
						cropL: { p1: { x: 0.37, y: 0 }, p2: { x: 0.63, y: 1 } },
						cropT: { p1: { x: 0.37, y: 0 }, p2: { x: 0.63, y: 1 } },
						cropR: { p1: { x: 0.37, y: 0 }, p2: { x: 0.63, y: 1 } },
						cropB: { p1: { x: 0.37, y: 0 }, p2: { x: 0.63, y: 1 } }
					}
				} );
			}
		}
	}

	// ------------------------------------------------

	Generator.getCurveMouseXY = function()
	{
		var e = window.event;
		var x, y;
		var drawscale = { x: this.curvesize + ( this.curve_padding.x * 2 ), y: this.curvesize + ( this.curve_padding.y * 2 ) }; 

		var fx = ( drawscale.x - ( this.curve_padding.x * 2 ) ) / e.target.offsetWidth;
		var fy = ( drawscale.y - ( this.curve_padding.y * 2 ) ) / e.target.offsetHeight;

		//{ x: 20, y: 100 }

		x = ( e.offsetX * fx ) - this.curve_padding.x;
		y = ( e.offsetY * fy ) - ( this.curve_padding.y );

		// var x = ( e.offsetX * ( drawscale.x / e.target.offsetWidth ) ) - this.curve_padding.x;
		// var y = ( e.offsetY * ( drawscale.y / e.target.offsetHeight ) ) - ( this.curve_padding.y * 2 );

		//log( e.target.offsetWidth, e.target.offsetHeight );
		//log( e.offsetX, e.offsetY );
		//log( Math.round( x ), Math.round( y ) );

		return { x: x, y: y };
	}

	// ------------------------------------------------

	Generator.handleCurveMouseDown = function()
	{
		if ( this.current_pts === 0 || this.curve_clicked ) return;

		var mouseXY = this.getCurveMouseXY();
		var drawscale = { x: this.curvesize - ( ( this.curve_padding.x * 2 ) ), y: this.curvesize - ( this.curve_padding.y * 2 ) }; 
		this.old_pts = { ...this.current_pts };

		var pt1_coords = { x: ( this.current_pts.p1.x * drawscale.x ), y: ( ( 1 - this.current_pts.p1.y ) * drawscale.y ) };
		var pt2_coords = { x: ( this.current_pts.p2.x * drawscale.x ), y: ( ( 1 - this.current_pts.p2.y ) * drawscale.y ) };


		// var ctx = this.curve_canvas_ctx;
		// ctx.fillStyle = '#FF0';
		// ctx.fillRect( pt1_coords.x - 5, pt1_coords.y - 5, 10, 10 );
		// ctx.fillRect( pt2_coords.x - 5, pt2_coords.y - 5, 10, 10 );

		// ctx.fillStyle = '#F00';
		// ctx.fillRect( mouseXY.x - 5, mouseXY.y - 5, 10, 10 );


		// find pt1 or pt2
		if ( this.hitTestCurve( mouseXY, { l: pt1_coords.x - this.curve_handlesize, t: pt1_coords.y - this.curve_handlesize, r: pt1_coords.x + this.curve_handlesize, b: pt1_coords.y + this.curve_handlesize } ) )
		{
			this.curve_clicked = 1;
			this.lastMouseXY = mouseXY;
		}
		else
		{
			var pt2_coords = { x: ( this.current_pts.p2.x * drawscale.x ), y: ( ( 1 - this.current_pts.p2.y ) * drawscale.y ) };

			if ( this.hitTestCurve( mouseXY, { l: pt2_coords.x - this.curve_handlesize, t: pt2_coords.y - this.curve_handlesize, r: pt2_coords.x + this.curve_handlesize, b: pt2_coords.y + this.curve_handlesize } ) )
			{
				this.curve_clicked = 2;
				this.lastMouseXY = mouseXY;
			}
		}
	}

	// ------------------------------------------------

	Generator.handleCurveMouseMove = function()
	{
		if ( ! this.curve_clicked ) return;

		var drawscale = { x: this.curvesize  - ( this.curve_padding.x * 2 ), y: this.curvesize - ( this.curve_padding.y * 2 ) }; 

		var mouseXY = this.getCurveMouseXY();
		var dox = mouseXY.x - this.lastMouseXY.x;
		var doy = this.lastMouseXY.y - mouseXY.y;

		if ( this.curve_clicked == 1 )
		{
			var newx = Math.max( this.old_pts.p1.x + ( dox / drawscale.x ), 0 );
			this.current_pts.p1 = { x: newx, y: this.old_pts.p1.y + ( doy / drawscale.y ) };
		}
		else if ( this.curve_clicked == 2 )
		{
			var newx = Math.min( this.old_pts.p2.x + ( dox / drawscale.x ), 1 );

			this.current_pts.p2 = { x: newx, y: this.old_pts.p2.y + ( doy / drawscale.y ) };
		}

		this.drawCurve();
	}

	// ------------------------------------------------

	Generator.handleCurveMouseUp = function()
	{
		this.curve_clicked = 0;
		//log( 'curve mouse up ' + this.curve_clicked );
	}

	// ------------------------------------------------

	Generator.handleCurveMouseOut = function()
	{
		//log( 'mouseout' + Math.random( 1, 2222 ));
		//this.handleCurveMouseUp();
	}

	// ------------------------------------------------

	Generator.loadAnimation = function( index )
	{
		this.stop();
		var newboxes;
		if ( typeof this.animations_list[ index ] === 'undefined' ) newboxes = [ 0 ];
		else newboxes = this.deepClone( this.animations_list[ index ].boxes ); // deep clone a copy
		
		// do some checks?
		this.settings[ this.device ][ this.switcher ] = newboxes;
		this.boxes = newboxes;

		this.fillBoxes();


		this.setBoxToggles();

		this.setStage( 'from' );
		this.play();
	}

	// ------------------------------------------------

	Generator.play = function()
	{
		var save_selection = this.selected;
		this.selected = 0;
		this.setStage( 'from' );
		this.selected = save_selection;

		this.play_state = 1;
		var play_btn = document.getElementById('play_btn');
		play_btn.classList.add( 'playing' );
		//play_btn.innerHTML = 'Stop';

		// prep animation lists
		var animation_info = this.renderFrames();
		this.rendered_frames = animation_info.rendered_frames;
		this.max_frames = animation_info.max_frames;

		// animate
		var self = this;
		this.current_frame = -1;
		this.interval_hdl = setInterval( function() { self.updateFrame() }, 5 );
		this.play_start = Date.now() + 250; // delay animation with 0.25s
		this.fps_interval = 1000 / this.fps;
		this.playback_skipped = false;
	}

	// ------------------------------------------------

	Generator.stop = function( force )
	{
		clearInterval( this.interval_hdl );
		this.play_state = 0;
		var play_btn = document.getElementById('play_btn');
		//play_btn.innerHTML = 'Play';
		play_btn.classList.remove( 'playing' );
		if ( force ) this.setStage( this.stage );
		else this.setStage( 'to' );

		this.redrawScreen();
	}

	// ------------------------------------------------

	Generator.updateFrame = function()
	{
		var d = Date.now() - this.play_start;

		var new_f = Math.round( d / this.fps_interval );
		if ( new_f <= this.current_frame || new_f < 0 ) return; // too soon

		if ( new_f > ( this.current_frame + 1 ) ) this.playback_skipped = true; // frames were skipped
		
		this.current_frame = new_f;

		if ( this.current_frame < this.max_frames ) // ----- playing
		{
			var len = this.rendered_frames.length;
			for( i = 1; i < len; i++ ) // iterate canvas elements, 1-based index
			{
				var anim_frames = this.rendered_frames[ i ];
				for( prop in anim_frames ) // animate element animated properties
				{
					var values = anim_frames[ prop ];
					if ( new_f < values.length )
					{
						this.boxes[ i ].at[ prop ] = values[ this.current_frame ];
					}
				}
			}

			this.redrawScreen();

			// show framecounter
			ctx = this.canvas_ctx;
			ctx.fillStyle = this.playback_skipped ? '#D00' : '#FFF';
			ctx.font = '40px monospace';
			ctx.textAlign = 'right';
			ctx.fillText( String("000" + this.current_frame ).slice( -3 ), this.canvas_w - 30, this.canvas_h - 30 );

		}
		else // ---------- done
		{
			this.stop( false );
		}

	}

	// ------------------------------------------------

	Generator.renderFrames = function()
	{
		rendered_frames = [0];

		var len = this.boxes.length;
		var from_props, to_props;
		var props = [ 'x', 'y', 'scale', 'cropL', 'cropT', 'cropR', 'cropB' ];
		var prop;
		var max_frames = 0;
		var props_len = props.length;
		for( var i = 1; i < len; i++ ) // 1-based index
		{
			var anim_frames = {};

			if ( ! this.boxes[ i ].enabled )
			{
				rendered_frames.push( 0 );
				continue;
			}

			from_props = this.boxes[ i ][ 'from' ];
			to_props = this.boxes[ i ][ 'to' ];

			for( var j = 0; j < props_len; j++ )
			{
				prop = props[ j ];
				anim_frames[ prop ] = [];

				var from = this.boxes[ i ].from[ prop ];
				
				// set all initial values
				anim_frames[ prop ].push( from_props[ prop ] );

				if ( this.floatsEqual( from_props[ prop ], to_props[ prop ] ) ) continue; // no change
				
				this.boxes[ i ].at = { ...from_props };

				// add delay frames
				for( var n = 0; n < this.boxes[ i ].delay[ prop ]; n++ )
				{
					anim_frames[ prop ].push( from_props[ prop ] );
				}

				// add animation frames
				var frames = this.boxes[ i ].frames[ prop ];
				var values = this.renderCurveValues( this.boxes[ i ].curves[ prop ], frames );
				
				// lerp from -> to
				var to = this.boxes[ i ].to[ prop ];
				for( n = 1; n <= frames; n++ ) // should we skip frame 0, we're already there?
				{
					var v = Math.max( this.ranges[ prop ].min, Math.min( this.ranges[ prop ].max, this.lerp( from, to, values[ n ] ) ) );
					anim_frames[ prop ].push( v );
				}

				max_frames = Math.max( max_frames, anim_frames[ prop ].length );
		    }
		    
		    rendered_frames.push( anim_frames );
		}

		return { rendered_frames: rendered_frames, max_frames: max_frames };
	}

	// ------------------------------------------------

	Generator.floatsEqual = function( f1, f2 )
	{
		return Math.abs( f1 - f2 ) < 0.05;
	}

	// ------------------------------------------------

	Generator.bezier = function( t, p0, p1, p2, p3 )
	{
		var cX = 3 * (p1.x - p0.x),
		bX = 3 * (p2.x - p1.x) - cX,
		aX = p3.x - p0.x - cX - bX;

		var cY = 3 * (p1.y - p0.y),
		bY = 3 * (p2.y - p1.y) - cY,
		aY = p3.y - p0.y - cY - bY;

		var x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
		var y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y;

		return { x: x, y: y };
	}

	// ------------------------------------------------

	Generator.drawCurve = function()
	{
		var ctx = this.curve_canvas_ctx;
		var pts = this.current_pts

		// background
		ctx.clearRect( 0, 0, this.curvesize, this.curvesize ); // clear to CSS bkg
		ctx.fillStyle = '#555';
		ctx.fillRect( this.curve_padding.x, this.curve_padding.y, this.curvesize - ( this.curve_padding.x * 2 ), this.curvesize - ( this.curve_padding.y * 2 ) );

		// propname
		ctx.fillStyle = '#AAA';
		ctx.font = '18px sans-serif';
		ctx.fillText( this.current_prop, this.curve_padding.x, 30 );

		var drawscale = { x: this.curvesize - ( this.curve_padding.x * 2 ), y: this.curvesize - ( this.curve_padding.y * 2 ) }; 

		//log( [ this.curve_padding.x, this.curve_padding.y, this.curvesize - ( this.curve_padding.x * 2 ), this.curvesize - ( this.curve_padding.y * 2 ) ] )

		// grid
		ctx.strokeStyle = '#777';
		var gridsizey = ( this.curvesize - ( this.curve_padding.y * 2 ) ) / 4;
		for( var x = 1; x < 4; x++ )
		{
			// hor lines
			ctx.beginPath();
			ctx.moveTo( this.curve_padding.x, this.curve_padding.y + ( x * gridsizey ) );
			ctx.lineTo( this.curvesize - this.curve_padding.x, this.curve_padding.y + ( x * gridsizey ) );
			ctx.stroke();
		}

		if ( ! this.current_prop ) return;

		if ( ! this.selected ) alert( "CURRENT PROP BUT NO SELECTION");

		var frames = Math.min( 20, this.boxes[ this.selected ].frames[ this.current_prop ] );
		var gridsizex = ( this.curvesize - ( this.curve_padding.x * 2 ) ) / frames;
		for( x = 1; x < frames; x++ )
		{
			// vertical (frame) lines
			ctx.beginPath();
			ctx.moveTo( this.curve_padding.x + ( x * gridsizex ), this.curve_padding.y );
			ctx.lineTo( this.curve_padding.x + ( x * gridsizex ), this.curvesize - this.curve_padding.y );
			ctx.stroke();
		}

		var props = this.boxes[ this.selected ];		
		var to = props.to[ this.current_prop ];
		var from = props.from[ this.current_prop ]

		if ( this.floatsEqual( to, from ) ) // no change, draw straight line
		{
			// disable presets
			this.curve_presets_elem.disabled = true;

			var lb = { x: this.curve_padding.x, y: this.curve_padding.y + ( 1 * drawscale.y ) };
			var rb = { x: this.curvesize - this.curve_padding.x, y: this.curvesize - this.curve_padding.y };
			this.drawPoint( ctx, lb, 6, '#AAA' );
			this.drawPoint( ctx, rb, 6, '#AAA' );

			ctx.strokeStyle = '#FFF';
			ctx.beginPath();
			ctx.moveTo( lb.x, lb.y );
			ctx.lineTo( rb.x, rb.y );
			ctx.stroke();

			return;
		}

		// enabled curve presets
		this.curve_presets_elem.disabled = false;


		//var vals = '';

		// handles
		ctx.strokeStyle = '#999';

		ctx.beginPath();
		ctx.moveTo( this.curve_padding.x, this.curve_padding.y + ( 1 * drawscale.y ) );
		ctx.lineTo( this.curve_padding.x + ( pts.p1.x * drawscale.x ), this.curve_padding.y + ( ( 1 - pts.p1.y ) * drawscale.y ) );
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo( this.curve_padding.x + ( pts.p2.x * drawscale.x ), this.curve_padding.y + ( ( 1 - pts.p2.y ) * drawscale.y ) );
		ctx.lineTo( this.curve_padding.x + drawscale.x, this.curve_padding.y );
		ctx.stroke();

		ctx.fillStyle = '#FFF';
		ctx.fillRect( this.curve_padding.x + ( pts.p1.x * drawscale.x ) - ( this.curve_handlesize/2 ), this.curve_padding.y + ( ( 1 - pts.p1.y ) * drawscale.y ) - ( this.curve_handlesize/2 ), this.curve_handlesize, this.curve_handlesize );
		ctx.fillRect( this.curve_padding.x + ( pts.p2.x * drawscale.x ) - ( this.curve_handlesize/2 ), this.curve_padding.y + ( ( 1 - pts.p2.y ) * drawscale.y ) - ( this.curve_handlesize/2 ), this.curve_handlesize, this.curve_handlesize );

		// curve
		ctx.beginPath();
		ctx.strokeStyle = '#FFF';

		// first point
		ctx.moveTo( this.curve_padding.x, this.curve_padding.y + ( 1 * drawscale.y ) );

		var curve_values = this.renderCurveValues( pts, frames );
		var len = curve_values.length;
		var frame_offset = 1.0 / frames;
		for( x = 0; x < len; x++ )
		{
			var framePt = this.getCurveCanvasPoint( { x: x * frame_offset, y: curve_values[ x ] } );
			ctx.lineTo( framePt.x, framePt.y );
			this.drawPoint( ctx, framePt, 6, '#AAA' );
		}

		// last point
		ctx.lineTo( this.curvesize - this.curve_padding.x, this.curve_padding.y );

		//vals += ( '<Op id="DVEAndFlyKeyYPosition" mixEffectBlockIndex="0" keyIndex="1" yPosition="' + ( from + ( 1.0 * ( to - from ) )  ).toFixed(2) + '"/>' + "\n" + '<Op id="MacroSleep" frames="1"/>' + "\n" );

		ctx.stroke();

		// to
		ctx.font = '18px';
		ctx.textAlign = 'right';
		ctx.fillText( to.toFixed(2), this.curvesize - this.curve_padding.x, this.curve_padding.y - 10 );

		// from
		ctx.textAlign = 'left';
		ctx.fillText( from.toFixed(2), this.curve_padding.x, this.curve_padding.y + ( 1 * drawscale.y ) + 23 );

	}

	// ------------------------------------------------

	Generator.renderCurveValues = function( pts, frames ) 
	{
		// this function will calculate fixed-time values on a bezier curve
		// note that the accuracy is only used to determine the underlying bezier
		// curve from which the fixed-time values are derived
		
		//var ctx = this.curve_canvas_ctx;

		frames = Math.max( frames, 1 );
		var values = [];
		var accuracy = 0.015; // curve accuracy
		var frame_offset = 1.0 / frames;
		var lastpt = { x: 0, y: 0 };
		var p0 = {x: 0, y: 0 };
		var p3 = {x: 1.0, y: 1.0 };
		var framex = 0.0001;
		for ( var i = 0; Math.ceil( i ) <= 1; i += accuracy )
		{
			// 0.0 - 1.0 coords
			var pt = this.bezier( i, p0, pts.p1, pts.p2, p3 );

			// draw curve segment
			// var canvasPt = this.getCurveCanvasPoint( pt );
			// ctx.lineTo( canvasPt.x, canvasPt.y );
			// this.drawPoint( ctx, canvasPt, 2, '#FFF' );

			// draw frame intersect
			while( framex <= pt.x )
			{
				var newy = lastpt.y + ( pt.y - lastpt.y ) * ( ( framex - lastpt.x ) / ( pt.x - lastpt.x ) );
				var framePt = this.getCurveCanvasPoint( { x: framex, y: newy } );
				framex += frame_offset;
				//this.drawPoint( ctx, framePt, 6, '#AAA' );
				values.push( newy );
			}

			lastpt = pt;
		}

		while ( values.length < frames+1 ) values.push( 1.0 ); // always end with 1.0

		return values;
	}

	// ------------------------------------------------

	Generator.lerp = function( a, b, f )
	{
		return a + f * ( b - a );
	}

	// ------------------------------------------------

	Generator.getCurveCanvasPoint = function( pt )
	{
		var drawscale = { x: this.curvesize - ( this.curve_padding.x * 2 ), y: this.curvesize - ( this.curve_padding.y * 2 ) }; 

		return { x: this.curve_padding.x + ( pt.x * drawscale.x ),
				 y: this.curve_padding.y + ( ( 1 - pt.y ) * drawscale.y ) };
	}

	// ------------------------------------------------

	Generator.drawPoint = function( ctx, pt, size, color )
	{
		ctx.fillStyle = color;
		ctx.fillRect( pt.x - (size/2), pt.y - (size/2), size, size );
	}

	// ------------------------------------------------

	Generator.getStateStorageStruct = function()
	{
		// clear tmp animation data
		var max_length = this.boxes.length;
		for( var i = 1; i < max_length; i++ ) // always skip element 0
		{
			this.boxes[ i ].at = 0;
		}

		return { 
			version: this.file_version,
			device: this.device,
			switcher: this.switcher,
			fps: this.fps,
			macro_index: this.macro_index,
			settings: this.settings
			};
	}

	// ------------------------------------------------

	Generator.handleFileBtn = function( e )
	{
		var elem = e.target;

		if ( elem.id == 'save_settings_btn' )
		{
			var filename = prompt( 'Download settings as', 'settings' );
			if ( filename != null )
			{
				this.saveFile( filename + '.json', JSON.stringify( { 
					state: this.getStateStorageStruct(), 
					animations: this.animation_presets 
					} ) );
			}
		}
		else if ( elem.id == 'clear_settings' )
		{
			this.storeData( 'settings', 0 );
			this.storeData( 'animations', 0 );
			this.device = 0;
			this.switcher = 0;
			this.fps = 30;
			this.macro_index = '';
			this.settings = {};
			this.restoreState();
			this.setMenuOptions();
			this.setStage('from');
			this.drawCurve();
		}
	}

	// ------------------------------------------------

	Generator.handleCurvePresetBtn = function( e )
	{
		var elem = e.target;
		var tag = elem.tagName.toLowerCase();
		if ( tag == 'svg' || tag == 'path' || tag == 'line' ) elem = elem.closest( 'button' );
		else if ( tag !== 'button' ) return;

		var preset_id = elem.id;
		var presets = {
			linear: { p1: { x: 0.33, y: 0.33 }, p2: { x: 0.66, y: 0.66 } },
			easeInSine: { p1: { x: 0.12, y: 0 }, p2: { x: 0.39, y: 0 } },
			easeOutSine: { p1: { x: 0.61, y: 1 }, p2: { x: 0.88, y: 1 } },
			easeInOutSine: { p1: { x: 0.37, y: 0 }, p2: { x: 0.63, y: 1 } },
			easeInQuad: { p1: { x: 0.11, y: 0 }, p2: { x: 0.5, y: 0 } },
			easeOutQuad: { p1: { x: 0.5, y: 1 }, p2: { x: 0.89, y: 1 } },
			easeInOutQuad: { p1: { x: 0.45, y: 0 }, p2: { x: 0.55, y: 1 } },
			easeInCubic: { p1: { x: 0.32, y: 0 }, p2: { x: 0.67, y: 0 } },
			easeOutCubic: { p1: { x: 0.33, y: 1 }, p2: { x: 0.68, y: 1 } },
			easeInOutCubic: { p1: { x: 0.65, y: 0 }, p2: { x: 0.35, y: 1 } },
			easeInQuart: { p1: { x: 0.5, y: 0 }, p2: { x: 0.75, y: 0 } },
			easeOutQuart: { p1: { x: 0.25, y: 1 }, p2: { x: 0.5, y: 1 } },
			easeInOutQuart: { p1: { x: 0.76, y: 0 }, p2: { x: 0.24, y: 1 } },
			easeInQuint: { p1: { x: 0.64, y: 0 }, p2: { x: 0.78, y: 0 } },
			easeOutQuint: { p1: { x: 0.22, y: 1 }, p2: { x: 0.36, y: 1 } },
			easeInOutQuint: { p1: { x: 0.83, y: 0 }, p2: { x: 0.17, y: 1 } },
			easeInExpo: { p1: { x: 0.7, y: 0 }, p2: { x: 0.84, y: 0 } },
			easeOutExpo: { p1: { x: 0.16, y: 1 }, p2: { x: 0.3, y: 1 } },
			easeInOutExpo: { p1: { x: 0.87, y: 0 }, p2: { x: 0.13, y: 1 } },
			easeInCirc: { p1: { x: 0.55, y: 0 }, p2: { x: 1, y: 0.45 } },
			easeOutCirc: { p1: { x: 0, y: 0.55 }, p2: { x: 0.45, y: 1 } },
			easeInOutCirc: { p1: { x: 0.85, y: 0 }, p2: { x: 0.15, y: 1 } },
			easeInBack: { p1: { x: 0.36, y: 0 }, p2: { x: 0.66, y: -0.56 } },
			easeOutBack: { p1: { x: 0.34, y: 1.56 }, p2: { x: 0.64, y: 1 } },
			easeInOutBack: { p1: { x: 0.68, y: -0.6 }, p2: { x: 0.32, y: 1.6 } }
		};

		if ( preset_id in presets )
		{
			this.current_pts.p1 = presets[ preset_id ].p1;
			this.current_pts.p2 = presets[ preset_id ].p2;
			this.drawCurve();
		}
	}

	// ------------------------------------------------

	Generator.saveFile = function( fileName, data )
	{
		if ( this.debug )
		{
			var pre = document.createElement( 'pre' );
			pre.textContent = data;
			pre.classList.add( 'debug' );
			body.appendChild( pre );
			pre.onclick = function( evt ) { body.removeChild( pre ) };
			return;
		}

		var a = document.createElement('a');
		document.body.appendChild( a );
		a.style = 'display: none';
		blob = new Blob( [data], { type: 'octet/stream' } ),
		url = window.URL.createObjectURL( blob );
		a.href = url;
		a.download = fileName;
		a.click();
		window.URL.revokeObjectURL( url );
		a.parentElement.removeChild( a );
	}

	// ------------------------------------------------

	Generator.loadFile = function( evt )
	{
		if ( ! window.FileReader ) alert( 'FileReader not supported by this browser' );

		var reader = new FileReader();
		var self = this;

		reader.onload = function( evt ) {
			if ( evt.target.readyState != 2 ) return;
			if ( evt.target.error) 
			{
				alert( 'Error while reading file' );
				return;
			}

			try 
			{
				var json = JSON.parse( evt.target.result );
			} 
			catch( e ) 
			{
				alert( 'Error while reading JSON' );
				return;
			}

			self.restoreState( json );
		};

		reader.readAsText( evt.target.files[0] );
	}

	// ------------------------------------------------

	Generator.handleSaveMacro = function( evt )
	{
		var save_btn = this.save_macro_stuff.querySelector( '#save_macro_btn' );
		var name_field = this.save_macro_stuff.querySelector( '#macro_name' );
		var macro_name = name_field.value.replace( /^\s+|\s+$/gm, '' );
		var index_field = this.save_macro_stuff.querySelector( '#macro_index' );
		var macro_index = +index_field.value;

		if ( evt.type == 'click' ) // click
		{
			if ( evt.target == save_btn )
			{
				this.generateMacro( macro_name, macro_index );
			}
		}
		else // keyup
		{
			if ( macro_name.length && ( typeof macro_index == 'number' ) && macro_index > 0 && macro_index <= 99 )
			{
				save_btn.disabled = false;

				if ( macro_index !== this.macro_index )
				{
					this.macro_index = macro_index;
					this.saveState( true );
				}

				if ( evt.key === 'Enter' || evt.keyCode === 13 )
				{
					//log( 'save by enter/return' );
				}
			}
			else save_btn.disabled = true;
		}
	}

	// ------------------------------------------------

	Generator.generateMacro = function( macro_name, macro_index )
	{
		var devicename = this.devices[ this.device ].name;
		
		var set_on_air = true;

		// prep animation lists
		var animation_info = this.renderFrames();
		var rendered_frames = animation_info.rendered_frames;
		var max_frames = animation_info.max_frames;
		var len = rendered_frames.length;
		var last_values = {};
		var animate_crop = true;
		var i;
		var options = this.getDeviceCapabilities( this.device );
		var switcher_index = this.switcher.substring( 2 )-1;

		var xml = '<?xml version="1.0" encoding="UTF-8"?>\
<Profile majorVersion="1" minorVersion="5" product="'+ devicename +'">\n\
	<MacroPool>\n\
		<Macro index="'+ ( macro_index - 1 ) +'" name="'+ macro_name +'" description="">\n\n';

        // set on air status (off first, for keyers)
		if ( set_on_air )
		{
			xml += '\
			<!-- on air status -->\n';

			for( i = 1; i < this.boxes.length; i++ ) // iterate *all* boxes, 1-based index
			{
				if ( this.boxes[ i ].type == 'supersource' )
				{
					// box enabled
					if ( this.boxes[ i ].enabled ) xml += '\
			<Op id="SuperSourceV2BoxEnable" superSource="0" boxIndex="'+ (i-options.keyers-1) +'" enable="True"/>\n';
					else xml += '\
			<Op id="SuperSourceV2BoxEnable" superSource="0" boxIndex="'+ (i-options.keyers-1) +'" enable="False"/>\n';
				}
				else // keyers, take off air first
				{
					xml += '\
			<Op id="KeyOnAir" mixEffectBlockIndex="'+ switcher_index +'" keyIndex="'+ (i-1) +'" onAir="False"/>\n';
				}
				xml += '\n';
			}
		}

		// set mask on/off
		if ( animate_crop )
		{
			xml += '\
			<!-- mask status -->\n';

			for( i = 1; i < len; i++ ) // iterate animated boxes, 1-based index
			{
				if ( ! this.boxes[ i ].enabled ) continue;

				if ( this.boxes[ i ].type == 'supersource' ) xml += '\
			<Op id="SuperSourceV2BoxMaskEnable" superSource="0" boxIndex="'+ (i-options.keyers-1) +'" enable="True"/>\n';
				else  xml += '\
			<Op id="DVEKeyMaskEnable" mixEffectBlockIndex="' + switcher_index + '" keyIndex="'+ (i-1) +'" enable="True"/>\n';
				xml += '\n';
			}
		}

		xml += '\n';

		// set source
		xml += '\
			<!-- source status -->\n';

		for( i = 1; i < len; i++ ) // iterate animated boxes, 1-based index
		{
			if ( ! this.boxes[ i ].enabled || this.boxes[ i ].src == 0 ) continue;

			if ( this.boxes[ i ].type == 'supersource' ) xml += '\
			<Op id="SuperSourceV2BoxInput" superSource="0" boxIndex="'+ (i-options.keyers-1) +'" input="' + this.boxes[ i ].src + '"/>\n';
			else  xml += '\
			<Op id="KeyFillInput" mixEffectBlockIndex="' + switcher_index + '" keyIndex="'+ (i-1) +'" input="' + this.boxes[ i ].src + '"/>\n';
			xml += '\n';
		}

		// loop through all animation data
		for( var f = 0; f < max_frames; f++ )
		{
			for( i = 1; i < len; i++ ) // iterate animated boxes, 1-based index
			{
				var anim_frames = rendered_frames[ i ];
				for( prop in anim_frames ) // animate element animated properties
				{
					var values = anim_frames[ prop ];
					if ( f < values.length )
					{
						var v = values[ f ].toFixed(3); // reduce precision for ATEM

						if ( ! ( i in last_values ) ) last_values[ i ] = {};

						if ( ! ( prop in last_values[ i ] ) || v != last_values[ i ][ prop ] ) // only animate changes
						{
							var box_index = i-1;
							if ( this.boxes[ i ].type == 'supersource' ) box_index -= options.keyers;
							if ( v != last_values[ i ][ prop ] ) xml += this.generateMacroOpcode( box_index, prop, v, this.boxes[ i ].type, switcher_index );
							last_values[ i ][ prop ] = v;
						}
					}
				}

				xml += '\n';
			}

			xml += '\
			<Op id="MacroSleep" frames="1"/>\n\n';

			if ( f == 0 && set_on_air ) // after setting up first frame, show keyers
			{
				for( i = 1; i < len; i++ ) // iterate animated boxes, 1-based index
				{
					if ( ( ! this.boxes[ i ].enabled ) || this.boxes[ i ].type != 'keyers' ) continue;
					xml += '\
			<Op id="KeyOnAir" mixEffectBlockIndex="' + switcher_index + '" keyIndex="'+ ( i-1 ) +'" onAir="True"/>\n';
				}
				xml += '\
			<Op id="MacroSleep" frames="1"/>\n\n';
			}
		}

		// take keyers off air when off screen or minimized
		for( i = 1; i < len; i++ ) // iterate boxes, 1-based index
		{
			if ( ( ! this.boxes[ i ].enabled ) || this.boxes[ i ].type != 'keyers' ) continue;

			// take off air
		}
		
		xml += '\
		</Macro>\n\
	</MacroPool>\n\
</Profile>';

		this.saveFile( macro_name + '.xml', xml );

	}

	// ------------------------------------------------

	Generator.generateMacroOpcode = function( box_index, prop, val, animate, switcher_index )
	{
		if ( animate == 'supersource' )
		{
			var prop_lookup = {

				x: { id: 'SuperSourceV2BoxXPosition', attr: 'xPosition' },
				y: { id: 'SuperSourceV2BoxYPosition', attr: 'yPosition' },
				scale: { id: 'SuperSourceV2BoxSize', attr: 'size' },
				cropL: { id: 'SuperSourceV2BoxMaskLeft', attr: 'left' },
				cropT: { id: 'SuperSourceV2BoxMaskTop', attr: 'top' },
				cropR: { id: 'SuperSourceV2BoxMaskRight', attr: 'right' },
				cropB: { id: 'SuperSourceV2BoxMaskBottom', attr: 'bottom' }
			};

			var xml = '\
			<Op id="' + prop_lookup[ prop ].id + '" superSource="0" boxIndex="' + box_index + '" ' + prop_lookup[ prop ].attr + '="'+ val + '"/>\n';
		}
		else
		{
			var prop_lookup = {

				x: { id: 'DVEAndFlyKeyXPosition', attr: 'xPosition' },
				y: { id: 'DVEAndFlyKeyYPosition', attr: 'yPosition' },
				scale: { id: 'DVEAndFlyKeyXSize', attr: 'xSize' },
				scaleY: { id: 'DVEAndFlyKeyYSize', attr: 'ySize' },// special case
				cropL: { id: 'DVEKeyMaskLeft', attr: 'left' },
				cropT: { id: 'DVEKeyMaskTop', attr: 'top' },
				cropR: { id: 'DVEKeyMaskRight', attr: 'right' },
				cropB: { id: 'DVEKeyMaskBottom', attr: 'bottom' }
			};

			var xml = '\
			<Op id="' + prop_lookup[ prop ].id + '" mixEffectBlockIndex="'+ switcher_index +'" keyIndex="' + box_index + '" ' + prop_lookup[ prop ].attr + '="'+ val + '"/>\n';

			if ( prop == 'scale' ) xml += this.generateMacroOpcode( box_index, 'scaleY', val, animate, switcher_index );
		}

		return xml;

	}

	// ------------------------------------------------

	Generator.updateAnimationList = function()
	{
		this.animations_list_elem.innerHTML = '';
		this.selected_animation = 0;

		for( var i = 1; i < this.animations_list.length; i++ ) // skip item 0 
		{
			var li = document.createElement( 'li' );
			li.appendChild( document.createTextNode( this.animations_list[ i ].name ) );
			li.setAttribute( 'id', 'item_' + i );
			this.animations_list_elem.appendChild( li );
		}
	}

	// ------------------------------------------------

	Generator.setBoxToggles = function() // sets boxes toggles checked state
	{
		var options = this.getDeviceCapabilities( this.device );
		// var animation_options = { 'keyers': options.keyers, 'supersource': options.supersource ? 4 : 0 };
		// var boxes_elem = document.getElementById( 'boxes' );

		// for( var animate in animation_options )
		// {
		// 	for( var i = 1; i <= animation_options[ animate ]; i++ )
		// 	{
		// 		var box_elem = boxes_elem.querySelector( '#' + animate + '_box' + i );
		// 		var n = ( i + ( animate == 'supersource' ? animation_options.keyers : 0 ) );
		// 		if ( typeof this.boxes[ n ] === 'undefined' ) continue;
		// 		if ( this.boxes[ n ].enabled ) box_elem.checked = true;
		// 		else box_elem.checked = false;
		// 	}
		// }

		var boxes_elem = document.getElementById( 'boxes' );

		for( i = 1; i < this.boxes.length; i++ )
		{
			var box_elem = boxes_elem.querySelector( '#box' + i );
			if ( this.boxes[ i ].enabled ) box_elem.checked = true;
			else box_elem.checked = false;
		}
	}

	// ------------------------------------------------

	Generator.formatAnimation = function()
	{
		var boxes = this.animations_list[ this.selected_animation ].boxes;
		var name = this.animations_list[ this.selected_animation ].name;
		var format_line = function( data ) {
			var str = '{ ';
			var n = Object.keys(data).length;
			for( var prop in data )
			{
				var val = data[ prop ];
				if ( typeof val == 'number' ) str += prop + ': ' + val.toFixed( 3 );
				else if ( typeof val == 'object' ) str += prop + ': ' + format_line( val );
				str += ( --n > 0 ? ', ' : '' );
			}
			return str + ' }';
			};


		var str = 'presets.push( \n\
{	name: switcher + " - ' + name + '",\n\
	boxes: [\n\
		0,\n';

		for( var i = 1; i < boxes.length; i++ )
		{
			var box = boxes[ i ];
			str += '\t\t{';

			var n = Object.keys(box).length;
			for( prop in box )
			{
				str += ( prop == 'i' ? '\t' : '\t\t\t' ) + String( prop ).padEnd( 6, ' ' ) + ': ';
				var val = box[ prop ];
				var type = typeof val;
				if ( type == 'number' ) str += val;
				else if ( type == 'string' ) str += '"' + val + '"';
				else if ( type == 'boolean' ) str += val;
				else if ( type == 'object' )
				{
					if ( prop == 'curves' ) 
					{
						var n2 = Object.keys(val).length;
						str += '{ ';
						for( prop2 in val )
						{
							str += '\n\
				' + String( prop2 ).padEnd( 6, ' ' ) + ': ' + format_line( val[ prop2 ] ) + ( --n2 > 0 ? ', ' : '' );
						}
						str += '\n\
			}';
					}
					else str += format_line( val );
				}

				str += ( --n > 0 ? ', ' : '' );
				str += '\n';
			}

			str += '\
		}';
			if ( i < boxes.length-1 ) str += ',\n';

		}
	
		str += '\n\
	]\n\
} );';
		window.prompt("Copy to clipboard: CMD+C, Enter", str );
	}

	// ------------------------------------------------

	Generator.handleAnimationListBtns = function( evt )
	{
		if ( evt.target.id == 'load_anim' )
		{
			this.loadAnimation( this.selected_animation );
		}
		else if ( evt.target.id == 'format_anim' )
		{
			this.loadAnimation( this.selected_animation );
			this.formatAnimation();
		}
		else if ( evt.target.id == 'save_anim' )
		{
			var new_name = window.prompt( 'Save new animation preset as',  '' );
			if ( new_name != null )
			{
				var newboxes = this.deepClone( this.boxes ); // deep clone a copy
				this.animations_list.push( { name: new_name, boxes: newboxes } );
				this.storeData( 'animations', this.animation_presets );
				this.updateAnimationList();
				this.setAnimationListSelection( this.animations_list.length-1 );
				this.animations_list_elem.focus();
			}
		}
		else if ( evt.target.id == 'rename_anim' )
		{
			var new_name = window.prompt( 'Rename animation',  this.animations_list[ this.selected_animation ].name );
			if ( new_name != null )
			{
				var sel = this.selected_animation;
				this.animations_list[ this.selected_animation ].name = new_name;
				this.updateAnimationList();
				this.setAnimationListSelection( sel );
				this.animations_list_elem.focus();
				this.storeData( 'animations', this.animation_presets );
			}
		}
		else if ( evt.target.id == 'delete_anim' )
		{
			this.animations_list.splice( this.selected_animation, 1 );
			var new_sel = 0;
			if ( this.animations_list.length > 1 )
			{
				if ( this.selected_animation >= this.animations_list.length ) new_sel = this.animations_list.length-1;
				else new_sel = this.selected_animation;
			}

			this.updateAnimationList();
			this.setAnimationListSelection( new_sel );
			this.storeData( 'animations', this.animation_presets );
		}
	}
	
	// ------------------------------------------------

	Generator.handleAnimationSelectList = function( evt )
	{
		if ( evt.type == 'mousedown' )
		{
			var anim_id = 0;

			if ( evt.target.tagName == 'LI' )
			{
				var anim_id = parseInt( evt.target.id.split('_')[ 1 ] );

				if ( this.selected_animation == anim_id ) return true; // to handle focus
			}
			else if ( evt.clientX >= ( this.animations_list_elem.offsetWidth - 3 ) ) // click on scrollbar (not very solid)
			{
				return true;
			}
			
			this.setAnimationListSelection( anim_id );

		}
		else if ( evt.type == 'keydown' )
		{
			var new_sel = 0;
			if ( evt.keyCode == 38 ) // up arrow
			{
				new_sel = Math.max( 1, this.selected_animation - 1 );
			}
			else if ( evt.keyCode == 40 ) // down arrow
			{ 
				new_sel = Math.min( this.animations_list.length-1, this.selected_animation + 1 );
			}

			if ( new_sel && new_sel != this.selected_animation )
			{
				this.setAnimationListSelection( new_sel );
			}

			if ( evt.keyCode == 38 || evt.keyCode == 40 ) return false;

			return true;

		}

		this.animations_list_elem.focus();
	}

	// ------------------------------------------------

	Generator.deepClone = function( obj )
	{
		return JSON.parse( JSON.stringify( obj ) );
	}

	// ------------------------------------------------

	Generator.setAnimationListSelection = function( index )
	{
		if ( this.selected_animation ) this.animations_list_elem.querySelector( '.selected' ).classList.remove( 'selected' );
		
		if ( index )
		{
			var li = this.animations_list_elem.querySelector( '#item_' + index );
			li.classList.add( 'selected' );
			var o = li.offsetTop - this.animations_list_elem.scrollTop;
			// log ( o );
			if ( o > ( this.animations_list_elem.clientHeight - li.clientHeight ) )
			{
				this.animations_list_elem.scrollTop = ( li.offsetTop - this.animations_list_elem.clientHeight + li.clientHeight );
			}
			else if ( o < 0 )
			{
				this.animations_list_elem.scrollTop = li.offsetTop;
			}
		}

		if ( ! this.selected_animation ) // enable buttons
		{
			var btns = this.animations_list_elem.parentElement.querySelectorAll( '#load_anim, #rename_anim, #delete_anim, #format_anim' );
			for (var i = 0; i < btns.length; i++) { btns[ i ].disabled = false; }
		}

		if ( ! index ) // disable buttons
		{
			var btns = this.animations_list_elem.parentElement.querySelectorAll( '#load_anim, #rename_anim, #delete_anim, #format_anim' );
			for (var i = 0; i < btns.length; i++) { btns[ i ].disabled = true; }
		}

		this.selected_animation = index;
	}

	// ------------------------------------------------

	return Generator;

}());

window.addEventListener('load', function () {
Generator.init();
})