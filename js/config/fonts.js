define(['definition/font'], function(FontStyle) {
	return {
		default: new FontStyle(40, '#000', 'Georgia', '#555' ),
		frames: new FontStyle(12, '#000', 'monospace' ),
		defaultRight: new FontStyle(40, '#000', 'Georgia', '#555',  'right'),
		defaultLeft: new FontStyle(40, '#000', 'Georgia', '#555',  'left')
	};
});
