import path from "path";
import webpack from 'webpack'

const isProd = process.env.NODE_ENV === "production";

export default {
  mode: isProd ? "production" : "development",
  entry: {
    main: "./src/main",
  },
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "[name].bundle.js",
    clean: true,
    publicPath: isProd ? "/react-project3-pages/" : "/", // ★ 환경별 경로 분리
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    static: path.resolve(process.cwd(), "public"),
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [
          path.resolve(process.cwd(), "src"),
          path.resolve(process.cwd(), "shared"),
        ],
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};