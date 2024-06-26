// set animation presets for device/animate combo
Generator.getDevices = function()
{
	var devices = {

		mini: {
			name: 'ATEM Mini',
			switchers: 1,
			keyers: 1,
			supersource: 0,
			cameras: 4,
			mediaplayers: 1,
			colors: 2
			},

		pro: {
			name: 'ATEM Mini Pro',
			switchers: 1,
			keyers: 1,
			supersource: 0,
			cameras: 4,
			mediaplayers: 1,
			colors: 2
			},

		proiso: {
			name: 'ATEM Mini Pro ISO',
			switchers: 1,
			keyers: 1,
			supersource: 0,
			cameras: 4,
			mediaplayers: 1,
			colors: 2
			},

		extreme: {
			name: 'ATEM Mini Extreme',
			switchers: 1,
			keyers: 2,
			supersource: 1,
			cameras: 8,
			mediaplayers: 2,
			colors: 2
			},

		extremeiso: {
			name: 'ATEM Mini Extreme ISO',
			switchers: 1,
			keyers: 2,
			supersource: 1,
			cameras: 8,
			mediaplayers: 2,
			colors: 2
			},

		sdi: {
			name: 'ATEM SDI',
			switchers: 1,
			keyers: 1,
			supersource: 0,
			cameras: 4,
			mediaplayers: 1,
			colors: 2
			},

		sdiproiso: {
			name: 'ATEM SDI Pro ISO',
			switchers: 1,
			keyers: 1,
			supersource: 0,
			cameras: 4,
			mediaplayers: 1,
			colors: 2
			},

		sdiextremeiso: {
			name: 'ATEM SDI Extreme ISO',
			switchers: 1,
			keyers: 2,
			supersource: 1,
			cameras: 8,
			mediaplayers: 2,
			colors: 2
			},

		tvstudio: {
			name: 'ATEM Television Studio',
			switchers: 1,
			keyers: 1,
			supersource: 0,
			cameras: 8,
			mediaplayers: 2,
			colors: 2
			},

		production_sw1me: {
			name: 'ATEM 1 M/E Production Switcher',
			switchers: 1,
			keyers: 1,
			supersource: 0,
			cameras: 8,
			mediaplayers: 2,
			colors: 2
			},

		production_sw2me: {
			name: 'ATEM 2 M/E Production Switcher',
			switchers: 2,
			keyers: 1,
			supersource: 0,
			cameras: 8,
			mediaplayers: 2,
			colors: 2
			},

		production_st4k: {
			name: 'ATEM Production Studio 4K',
			switchers: 1,
			keyers: 1,
			supersource: 0,
			cameras: 8,
			mediaplayers: 2,
			colors: 2
			},

		production_st1me4k: {
			name: 'ATEM 1 M/E Production Studio 4K',
			switchers: 1,
			keyers: 1,
			supersource: 0,
			cameras: 8,
			mediaplayers: 2,
			colors: 2
			},

		production_st2me4k: {
			name: 'ATEM 2 M/E Production Studio 4K',
			switchers: 2,
			keyers: 2,
			supersource: 0,
			cameras: 20,
			mediaplayers: 2,
			colors: 2
			},

		broadcast_st2me4k: {
			name: 'ATEM 2 M/E Broadcast Studio 4K',
			switchers: 2,
			keyers: 1,
			supersource: 0,
			cameras: 8,
			mediaplayers: 2,
			colors: 2
			},

		broadcast_st4me4k: {
			name: 'ATEM 4 M/E Broadcast Studio 4K',
			switchers: 4,
			keyers: 1,
			supersource: 0,
			cameras: 8,
			mediaplayers: 2,
			colors: 2
			},

		tvstudiohd: {
			name: 'ATEM Television Studio HD',
			switchers: 1,
			keyers: 1,
			supersource: 0,
			cameras: 8,
			mediaplayers: 2,
			colors: 2
			},

		tvstudioprohd: {
			name: 'ATEM Television Studio Pro HD',
			switchers: 1,
			keyers: 1,
			supersource: 0,
			cameras: 8,
			mediaplayers: 2,
			colors: 2
			},

		tvstudiopro4k: {
			name: 'ATEM Television Studio Pro 4K',
			switchers: 1,
			keyers: 1,
			supersource: 0,
			cameras: 20,
			mediaplayers: 2,
			colors: 2
			},

		constellation8k: {
			name: 'ATEM Constellation 8K',
			switchers: 4,
			keyers: 4,
			supersource: 1, // actually has 2, we only support 1
			cameras: 8,
			mediaplayers: 4,
			colors: 2
			}
	};

	return devices;

}
