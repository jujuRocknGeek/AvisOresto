const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin");

module.exports = 
{
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: 
    {
    rules: [
        {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.sc|ass$/,
        use: [
        { loader: MiniCssExtractPlugin.loader },
        { 
          loader: 'css-hot-loader',
        }, 
        { 
          loader: "css-loader",
          options: {
            importLoaders: 1
          }
        },          
        {
          loader: 'postcss-loader',
          options: {
          sourceMap: true,
          config: {
            ctx: {
            cssnano: {},
            autoprefixer: {}
            }
          }
          }
        },
        {
          loader: 'resolve-url-loader' 
        },
        { 
          loader: "sass-loader",
          options: {
            sourceMap: true 
          }
        }
      ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[hash].[ext]'
        }
        },
    ]
      },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new OptimizeCSSAssets(),
      ],
      devServer: {
        contentBase: path.resolve(__dirname, "./dist"),
        historyApiFallback: true,
        inline: true,
        open: true,
        hot: true
      },
      devtool: "eval-source-map"
};