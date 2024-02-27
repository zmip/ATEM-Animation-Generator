<?php
	
	//===============================================

	function auto_version( $file ) //$file = RELATIVE: /css/myfile.css
	{
		//dump( SITEPATH.$file, 1 );
		if( strpos( $file, '/' ) !== 0 or ! file_exists( SITEPATH.$file ) )
		return $file;

		$mtime = filemtime( SITEPATH.$file );
		return preg_replace( '{\\.([^./]+)$}', ".$mtime.\$1", $file );
	}

	//===============================================

	function serve_file( $filename )
	{
		$src_file = __DIR__.$filename;

		if ( strpos( $filename, '.css' ) !== false )
		{
			$mime_type = 'text/css';
		}
		else if ( strpos( $filename, '.js' ) !== false )
		{
			$mime_type = 'application/javascript';
		}

//dump( $src_file, 1 );
		$size = filesize( $src_file );

		header( "Expires: 0"); 
		header( "Cache-Control: no-cache, must-revalidate, post-check=0, pre-check=0"); 
		header( "Cache-Control: private", false ); 

		header( "Content-transfer-encoding: binary" );
		header( 'Content-Type: '.$mime_type );
		header( 'Content-Length: '.$size );

		exit( readfile( $src_file ) );
	}

	//===============================================

	function dump( $val, $halt = false )
	{
		
			echo '<pre>';
			echo htmlspecialchars( print_r( $val, true ) );
			echo "</pre>\n";


		if ( $halt ) exit;
	}

	//===============================================
