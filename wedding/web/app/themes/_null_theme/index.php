<?php
/**
 * @package _null
 */

get_header();

if ( is_archive() || is_home() || is_search() )
    elementor_theme_do_location( 'archive' );
elseif ( is_singular() )
    elementor_theme_do_location(  'single' );
else
    elementor_theme_do_location(  'single' );
the_content();
get_footer();
