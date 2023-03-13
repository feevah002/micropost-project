const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode:'development',
  // make multiple entries by making it an object
  entry: {
    bundle: path.resolve(__dirname, 'src/app.js'),
  },
  // out put directory for the bundled code
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean:true,
    // keep you assets name the same
    assetModuleFilename:'[name][ext]'
  },
  // to help show error in the sourse code
  devtool:'source-map',
  devServer:{
    static:{
      directory: path.resolve(__dirname, 'dist')
    },
    port:8080,
    // make browser open
    open:true,
    compress:true,
    historyApiFallback:true
  },
  // loader for scss
  module: {
    rules: [
      { 
        test: /\.scss$/, 
        // it has to be in this order
        use:[
              'style-loader',
              'css-loader', 
              'sass-loader',
            ], 
      },
      // to make application work on older browsers, so we use babel(not super necessary)
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env'],
          },
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ],
  },
  plugins:[
    new HtmlWebpackPlugin({
      title:'Webpack App',
      filename:'index.html',
      template:'src/template.html'
    })
  ]
};