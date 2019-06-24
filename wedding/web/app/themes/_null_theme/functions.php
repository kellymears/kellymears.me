<?php
/**
 * _null functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package _null
 */

if ( ! function_exists( 'null_setup' ) ) :

	function null_setup() {

		load_theme_textdomain( '_null', get_template_directory() . '/languages' );

		register_nav_menus( array(
            'menu-1' => esc_html__( 'Primary', '_null' ),
            'menu-2' => esc_html__( 'Secondary', '_null'),
            'menu-3' => esc_html__( 'Tertiary', '_null')
        ) );

        register_sidebar(array(
            'name' => 'Primary Sidebar',
            'id' => 'primary-sidebar',
            'description' => 'Widget Area A',
            'before_widget' => '<div class="widgets">',
            'after_widget' => '</div>',
            'before_title' => '<h2 class="widgettitle">',
            'after_title' => '</h2>',
        ));
        register_sidebar(array(
            'name' => 'Secondary Sidebar',
            'id' => 'secondary-sidebar',
            'description' => 'Widget Area B',
            'before_widget' => '<div class="widgets">',
            'after_widget' => '</div>',
            'before_title' => '<h2 class="widgettitle">',
            'after_title' => '</h2>',
        ));
        register_sidebar(array(
            'name' => 'Tertiary Sidebar',
            'id' => 'tertiary-sidebar',
            'description' => 'Widget Area C',
            'before_widget' => '<div class="widgets">',
            'after_widget' => '</div>',
            'before_title' => '<h2 class="widgettitle">',
            'after_title' => '</h2>',
        ));

		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
        ) );

		add_theme_support( 'custom-background', apply_filters( 'null_custom_background_args', array(
			'default-color' => '000000',
			'default-image' => '',
        ) ) );

        add_theme_support( 'customize-selective-refresh-widgets' );

		add_theme_support( 'custom-logo', array(
			'height'      => 38,
			'width'       => 128,
			'flex-width'  => true,
			'flex-height' => true,
        ) );

    }

endif; add_action( 'after_setup_theme', 'null_setup' );

/* elementor */
function _null_register_elementor_locations( $elementor_theme_manager ) {
	$elementor_theme_manager->register_all_core_location();
	$elementor_theme_manager->register_location(
		'main-sidebar',
		[
			'label' => __( 'Primary Sidebar', '_null' ),
			'multiple' => false,
			'edit_in_content' => true,
		]
	);
	$elementor_theme_manager->register_location(
		'secondary-sidebar',
		[
			'label' => __( 'Secondary Sidebar', '_null' ),
			'multiple' => false,
			'edit_in_content' => true,
		]
	);
	$elementor_theme_manager->register_location(
		'tertiary-sidebar',
		[
			'label' => __( 'Tertiary Sidebar', '_null' ),
			'multiple' => false,
			'edit_in_content' => true,
		]
    );
} add_action( 'elementor/theme/register_locations', '_null_register_elementor_locations' );

/* insist on elementor full width template */
function load_elementor_full_width_template( $template ) {

    $url = plugins_url();
    $path = parse_url($url);
    $plugins_dir_url = $path['path'];

	$new_template = locate_template( array( plugins_url('modules/page-templates/templates/header-footer.php','elementor')) );
    if ( !empty( $new_template ) )
        return $new_template;
    return $template;

} add_filter( 'template_include', 'load_elementor_full_width_template', 99 );

/* stylesheet */
function null_scripts() {
	wp_enqueue_style( 'null-style', get_stylesheet_uri() );
} add_action( 'wp_enqueue_scripts', 'null_scripts' );

/* theme functions */
require get_template_directory() . '/inc/template-functions.php';
require get_template_directory() . '/inc/customizer.php';

/* jetpack infinite scroll support
 * not sure if this works */
if ( defined( 'JETPACK__VERSION' ) )
    require get_template_directory() . '/inc/jetpack.php';

/* soil */
add_theme_support('soil-clean-up');
add_theme_support('soil-disable-asset-versioning');
add_theme_support('soil-disable-trackbacks');
add_theme_support('soil-jquery-cdn');
add_theme_support('soil-js-to-footer');
add_theme_support('soil-nice-search');
add_theme_support('soil-relative-urls');
