import path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import DotenvWebpackPlugin from "dotenv-webpack";
import CopyPlugin from "copy-webpack-plugin";

const rootPath = path.resolve(__dirname, "..", "..");
const rootDir = path.resolve(rootPath, "modules");

const devServer: WebpackDevServerConfiguration = {
  historyApiFallback: true,
  hot: true,
  https: false,
  liveReload: true,
  open: true,
  port: 80,
};

const webpackConfig = (): WebpackConfiguration => ({
  mode: "development",
  entry: path.resolve(rootDir, "core", "ui", "index.tsx"),
  context: rootPath,
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@core": path.resolve(rootDir, "core"),
      "@lunchbreak": path.resolve(rootDir, "lunchbreak"),
    },
  },
  output: {
    path: path.resolve(rootPath, "dist"),
    filename: "[name].[contenthash].js",
    libraryTarget: "umd",
    libraryExport: "default",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(rootPath, "public", "index.html"),
    }),
    new DotenvWebpackPlugin({ path: path.resolve(rootPath, "configs", "environments", ".env.development") }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(rootPath, "public", "manifest.json"), to: "" },
        { from: path.resolve(rootPath, "public", "assets"), to: "assets" },
        { from: path.resolve(rootPath, "public", "favicon.ico"), to: "" },
      ],
    }),
  ],
  devServer,
});

export default webpackConfig;
