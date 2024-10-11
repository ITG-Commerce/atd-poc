import "@/styles/globals.css";
import { builder } from "@builder.io/sdk";
import type { AppProps } from "next/app";
import "../builder-registry";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
