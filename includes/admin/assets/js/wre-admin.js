/*
 * WP Real Estate plugin by MyThemeShop
 * https://wordpress.com/plugins/wp-real-estate/
 */
(function($){
	
	/*
	 * Adapted from: http://mikejolley.com/2012/12/using-the-new-wordpress-3-5-media-uploader-in-plugins/
	 * Further modified from PippinsPlugins https://gist.github.com/pippinsplugins/29bebb740e09e395dc06
	 */
	jQuery(document).ready(function($) {
		// Uploading files
		var file_frame;

		jQuery('.wre_wpmu_button').on('click', function(event) {

			event.preventDefault();

			// If the media frame already exists, reopen it.
			if (file_frame) {
				file_frame.open();
				return;
			}

			// Create the media frame.
			file_frame = wp.media.frames.file_frame = wp.media({
				title: jQuery(this).data('uploader_title'),
				button: {
					text: jQuery(this).data('uploader_button_text'),
				},
				multiple: false // Set to true to allow multiple files to be selected
			});

			// When an image is selected, run a callback.
			file_frame.on('select', function() {
				// We set multiple to false so only get one image from the uploader
				attachment = file_frame.state().get('selection').first().toJSON();

				// Do something with attachment.id and/or attachment.url here
				// write the selected image url to the value of the #wre_wp_meta text field
				jQuery('#wre_meta').val('');
				jQuery('#wre_upload_meta').val(attachment.url);
				jQuery('#wre_upload_edit_meta').val('/wp-admin/post.php?post=' + attachment.id + '&action=edit&image-editor');
				jQuery('.wre-current-img').attr('src', attachment.url).removeClass('placeholder');
			});

			// Finally, open the modal
			file_frame.open();
		});

		// Toggle Image Type
		jQuery('input[name=img_option]').on('click', function(event) {
			
			var imgOption = jQuery(this).val();
			if (imgOption == 'external') {
				jQuery('#wre_upload').hide();
				jQuery('#wre_external').show();
			} else if (imgOption == 'upload') {
				jQuery('#wre_external').hide();
				jQuery('#wre_upload').show();
			}

		});

		if ('' !== jQuery('#wre_meta').val()) {
			jQuery('#external_option').attr('checked', 'checked');
			jQuery('#wre_external').show();
			jQuery('#wre_upload').hide();
		} else {
			jQuery('#upload_option').attr('checked', 'checked');
		}

		// Update hidden field meta when external option url is entered
		jQuery('#wre_meta').blur(function(event) {
			if ('' !== $(this).val()) {
				jQuery('#wre_upload_meta').val('');
				jQuery('.wre-current-img').attr('src', $(this).val()).removeClass('placeholder');
			}
		});

		jQuery('.remove_img').on('click', function(event) {
			var placeholder = jQuery('#wre_placeholder_meta').val();
			jQuery(this).parent().fadeOut('fast', function() {
				jQuery(this).remove();
				jQuery('.wre-current-img').addClass('placeholder').attr('src', placeholder);
			});
			jQuery('#wre_upload_meta, #wre_upload_edit_meta, #wre_meta').val('');
		});

	});

})(jQuery);