import { Head } from "$fresh/runtime.ts";
import CoffeeHelper from "../islands/CoffeeHelper.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>QueryAI</title>
        <style>
          {`
            html, body {
              background-color: #f7fafc;
            }
          `}
        </style>
      </Head>
      <div className="flex flex-col p-4 mx-auto max-w-screen-md md:py-10 h-full">
        <main>
          <CoffeeHelper />
        </main>
        <footer className="text-gray-500 text-xs text-center pt-10 pb-2 md:text-right">
          Open Sourced on <a href="https://github.com/f/baristai">GitHub</a>.
        </footer>
      </div>
    </>
  );
}
