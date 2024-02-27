<?php
	include 'functions.php';

	$version = 0.2;
	$minify = true;
	$build = true; // create a single HTML file with inline CSS + JS
	
	$build_path = '../build/';
	$src_path = '../src/';

	if ( $minify ) $min = '-min';
	else $min = '';

	if ( $build ) // create a single HTML file with inline CSS + JS
	{
		$css = '<style>
		'.file_get_contents( "{$build_path}css/styles-min.css" ).'
		</style>';

		$script = '
		<script>';

		$script .= file_get_contents( "{$build_path}js/script-min.js" );
		$script .= file_get_contents( "{$build_path}js/animation-presets-min.js" );
		$script .= file_get_contents( "{$build_path}js/devices-min.js" );

		$script = $script.'
		</script>';
	}
	else // dev only, linked files
	{
		// serve dev-only CSS + JS files
		if ( preg_match( '/(\.css|\.js)$/', $_SERVER[ 'REQUEST_URI' ] ) ) return serve_file( $_SERVER[ 'REQUEST_URI' ] );

		$css = '
		<link rel="stylesheet" href="/build/css/styles-min.css">';

		$script = '
		<script src="/src/js/script.js"></script>
		<script src="/src/js/animation-presets.js"></script>
		<script src="/src/js/devices.js"></script>
		';
	}

	$html = file_get_contents( "{$src_path}html/GeneratorUI.html" );

	$build_version = file_get_contents( "{$src_path}build_version.txt" ) + 1;
	file_put_contents( "{$src_path}build_version.txt", $build_version );

	$html = str_replace( [
		'#styles',
		'#script',
		'#version',
		'#year',
		'#build',
		],
		[ 
			$css,
			$script,
			$version,
			date( 'Y'),
			$build_version,
		],
		$html );
	
	if ( $minify )
	{
		$search = [
			'/\>[^\S ]+/s',     // strip whitespaces after tags, except space
			'/[^\S ]+\</s',     // strip whitespaces before tags, except space
			'/(\s)+/s',         // shorten multiple whitespace sequences
			'/<!--(.|\s)*?-->/' // Remove HTML comments
		];

		$replace = [
			'>',
			'<',
			'\\1',
			''
			];

		$html = preg_replace( $search, $replace, $html );
	}

	if ( $build ) file_put_contents( $build_path.'ATEM-DVE-Animation-generator.html', $html );
	exit( $html );