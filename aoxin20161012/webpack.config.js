module.exports = {
	entry:  {
		'reactlib': './reactlib.jsx'
	},
	output: {
		path:     './',
		filename: '[name].js'
	},
	module: {
		loaders: [{
			test:    /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader:  'babel-loader',
			query:   {
				presets: ['es2015', 'react']
			}
		}]
	},
	/*watch:  true*/
}