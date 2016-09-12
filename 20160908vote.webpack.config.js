module.exports = {
	entry:  {
		'20160908vote':'./20160908vote.jsx'
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
	watch:  true
}