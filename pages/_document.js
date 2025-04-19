import Menu from "../components/Menu";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="pb-24  !bg-slate-200/50 antialiased">
        <Main />
        <NextScript />
        <Menu/>
      </body>
    </Html>
  );
}
