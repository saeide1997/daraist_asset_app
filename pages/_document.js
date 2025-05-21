//pages/_document.js

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className=" !bg-slate-200/50 ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
