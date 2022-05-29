import path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { InjectManifest } from "workbox-webpack-plugin";
import DotenvWebpackPlugin from "dotenv-webpack";
import CompressionPlugin from "compression-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

const rootPath = path.resolve(__dirname, "..", "..");
const rootDir = path.resolve(rootPath, "modules");

const webpackConfig = (): WebpackConfiguration => ({
  mode: "production",
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
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  plugins: [
    new InjectManifest({ swSrc: path.resolve(rootPath, "serviceWorker") }),
    new HtmlWebpackPlugin({
      template: path.resolve(rootPath, "public", "index.html"),
    }),
    new DotenvWebpackPlugin({ path: path.resolve(rootPath, "configs", "environments", ".env.production") }),
    new CompressionPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(rootPath, "public", "manifest.json"), to: "" },
        { from: path.resolve(rootPath, "public", "assets"), to: "assets" },
        { from: path.resolve(rootPath, "public", "favicon.ico"), to: "" },
      ],
    }),
  ],
});

export default webpackConfig;
