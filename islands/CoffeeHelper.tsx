import { installGlobals } from "https://deno.land/x/virtualstorage@0.1.0/mod.ts";
installGlobals();

import { useCallback, useEffect, useState } from "preact/hooks";

const promptHints = [
  "What is the average time spent on the app per day?",
  "Find customers who signed up in first quarter of 2023 and who live in the UK.",
  "The requested statement is asking for a SQL query that will retrieve a list of customers who have spent more than $1000 in the last 30 days.",
  "I want to calculate the average session duration and average daily session duration by dates",
  "Which countries do purchasers come from?",
  "Find all users who live in Spain and have over 1000 credits!",
  "What are the local hours when users are most active?",
  "Find customers who have spent more than $1000 in the last 30 days.",
  "How many users have churned in the last week?",
  "How many matches were played today?",
  "Which advert type is watched more?",
  "Calculate the sum of salaries from the last year!",
  "What is the average of the max levels users reached on their first day?",
  "How long do organic users spend on the app?",
  "How many users come from Spain?",
  "How much sales were made in the last 1 month?",
  "How much is the profit in the last 1 week?",
  "What is the percentage of completion of the Tutorial?",
];

const promptLength = 280;

export default function CoffeeHelper() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState(promptHints[0]);
  const [timer, setTimer] = useState(0);

  const savedHistory = localStorage.getItem("history") &&
    JSON.parse(localStorage.getItem("history") || "[]");

  const [history, setHistory] = useState<
    { prompt: string; response: string }[]
  >(savedHistory || []);
  const [viewHistory, setViewHistory] = useState(false);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHint(promptHints[Math.floor(Math.random() * promptHints.length)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const onValueChange = useCallback((e: any) => {
    setPrompt((e.target as HTMLTextAreaElement).value);
  }, [prompt]);

  const onClick = useCallback(async () => {
    console.log(timer);

    if (timer > 0) {
      return;
    }

    setLoading(true);
    setResult("");

    const response = await fetch("/api/gpt", {
      method: "POST",
      body: prompt.substring(0, promptLength),
    });

    const data = await response.text();
    setResult(data);
    setLoading(false);
    setTimer(30);
    setViewHistory(false);
    setHistory([{ prompt, response: data }, ...history].slice(0, 15));
  }, [prompt, timer]);

  const onViewHistory = useCallback(() => {
    setViewHistory(!viewHistory);
  }, [viewHistory]);

  let label = timer > 0 ? `Operator is busy now (${timer})` : "Generate Now";
  if (loading) {
    label = "Typing...";
  }

  return (
    <div>
      <div className="flex flex-wrap">
        <h1 className="text-2xl font-bold mb-5 flex items-center text-gray-500">
          QUERY{" "}
          <span className="rounded-md ml-1 text-white px-1 bg-red-600 w-8 h-8">
            AI
          </span>
        </h1>
        <span className="ml-auto my-2 text-gray-500 text-xs hidden md:block">
          This project is using GPT-3.5 to generate queries.
        </span>
      </div>
      <textarea
        className="w-full h-32 p-4 border rounded-lg shadow-lg resize-none"
        value={prompt}
        onInput={onValueChange}
        placeholder={hint}
        maxLength={promptLength}
      >
      </textarea>
      <div className="flex justify-end">
        <span className="text-gray-500 text-sm">
          {prompt.length}/{promptLength}
        </span>
      </div>
      <div className="flex items-start mt-2 flex-col md:flex-row">
        <div className="text-sm text-gray-500 pr-5">
          Write any SQL related text and click "Generate Now" to get a new SQL Query.
          You can ask for metrics, methods, or anything else.
        </div>
        <button
          type="button"
          onClick={onClick}
          className="inline-flex items-center justify-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-green-400 hover:bg-green-500 transition ease-in-out duration-150 whitespace-nowrap mt-4 text-center w-full md:w-auto md:mt-0"
          disabled={loading || timer > 0 || prompt.length === 0}
        >
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              >
              </circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              >
              </path>
            </svg>
          )}
          {label}
        </button>
      </div>

      {result && (
        <div className="mt-5 border-t" style={{ whiteSpace: "pre-wrap" }}>
          <div className="my-3 text-xl font-semibold text-gray-600 flex flex-col">
            AI'S ANSWER:
            <span className="w-10 h-px bg-gray-600 mt-1 "></span>
          </div>
          <p className="bg-gray-800 text-sm text-gray-300 p-4 border rounded-lg shadow-lg overflow-x-auto">
            <pre className="language-sql">
            {result}
            </pre>
          </p>
        </div>
      )}

      {history.length > 0 && (
        <div className="flex justify-center mt-10">
          <button
            type="button"
            className="rounded-full inline-flex items-center justify-center text-xs p-2"
            onClick={onViewHistory}
          >
            <svg
              className="mr-1"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M24.59 16.59L17 24.17V4h-2v20.17l-7.59-7.58L6 18l10 10l10-10l-1.41-1.41z"
              >
              </path>
            </svg>
            History
          </button>
        </div>
      )}
      {viewHistory && history.length > 0 && (
        <>
          <div className="text-sm text-gray-500 bg-gray-100 mt-2 p-4 rounded-lg shadow-inner">
            {history.map((item: any, index) => (
              <div key={index}>
                <h3
                  className="mb-2 font-semibold"
                  onClick={() => !prompt && setPrompt(item.prompt)}
                >
                  {item.prompt}
                </h3>
                <p className="mb-5">{item.response}</p>
              </div>
            ))}
            <button
              className="text-xs block w-full text-left"
              onClick={() => setHistory([])}
            >
              Clear History
            </button>
          </div>
        </>
      )}
    </div>
  );
}
