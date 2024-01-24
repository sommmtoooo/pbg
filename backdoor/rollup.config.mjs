import typescript from "rollup-plugin-typescript2";

export default {
  input: "source/app.ts", // Replace with the path to your TypeScript entry file
  output: {
    file: "bundle.js", // Replace with the desired output file and format
    sourcemap: true,
    format: "umd",
  },
  plugins: [
    typescript({
      tsconfig: "tsconfig.json", // Replace with the path to your tsconfig.json file
    }),
  ],
};
