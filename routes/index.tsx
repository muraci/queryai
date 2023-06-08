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
              ::-webkit-scrollbar {
                width: 12px;
                height: 12px;
            }
            ::-webkit-scrollbar-track {
                background-color: rgba(229, 231, 235, var(--bg-opacity));                
            }
            ::-webkit-scrollbar-thumb {
                background-color: #666b7a;
                border-radius: 10px;
            }
          </style>
            }
          `}
        </style>
      </Head>
      <div className="flex flex-col p-4 mx-auto max-w-screen-md md:py-10 h-full">
        <main>
          <CoffeeHelper />
        </main>
        <footer className="text-gray-500 text-xs text-center pt-10 pb-2 md:text-right">
          Inspired by this <a href="https://baristai.deno.dev/" target="_blank">project</a>💡and magic not used 🧙‍♂️
        </footer>
      </div>
    </>
  );
}
