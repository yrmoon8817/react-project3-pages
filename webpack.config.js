import path from "path";
import webpack from 'webpack'

export default {
  mode: "development",
  entry: {
    main: "./src/main",
  },
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "[name].bundle.js",
    clean: true,
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devtool: "source-map",
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
