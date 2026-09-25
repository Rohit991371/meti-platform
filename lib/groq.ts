// import Groq from "groq-sdk";

// export const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// /**
//  * Calls Groq's chat completions and returns parsed JSON.
//  * On any failure (rate limit, network, bad JSON), returns `fallback` instead of throwing,
//  * per the platform's zero-crash resilience rule.
//  */
// export async function safeGroqJSON<T>(
//   systemPrompt: string,
//   userContent: string,
//   fallback: T
// ): Promise<T> {
//   try {
//     const completion = await groq.chat.completions.create({
//       model: "llama-3.3-70b-versatile",
//       response_format: { type: "json_object" },
//       messages: [
//         { role: "system", content: systemPrompt },
//         { role: "user", content: userContent || "N/A" },
//       ],
//     });
//     const raw = completion.choices[0]?.message?.content ?? "{}";
//     return JSON.parse(raw) as T;
//   } catch (err) {
//     console.error("[groq] falling back to safe default:", err);
//     return fallback;
//   }
// }


import Groq from "groq-sdk";

// timeout + maxRetries: 0 so a stuck request fails fast (10s) instead of hanging the whole
// dev server forever — groq-sdk's default fetch behavior can hang inside Next.js dev mode.
export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
  timeout: 10_000,
  maxRetries: 0,
});

/**
 * Calls Groq's chat completions and returns parsed JSON.
 * On any failure (rate limit, network, bad JSON), returns `fallback` instead of throwing,
 * per the platform's zero-crash resilience rule.
 */
export async function safeGroqJSON<T>(
  systemPrompt: string,
  userContent: string,
  fallback: T
): Promise<T> {
  try {
    console.log("[groq] request starting…");
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent || "N/A" },
      ],
    });
    console.log("[groq] request finished");
    const raw = completion.choices[0]?.message?.content ?? "{}";
    return JSON.parse(raw) as T;
  } catch (err: any) {
    console.error("[groq] falling back to safe default. Error name:", err?.name, "message:", err?.message);
    return fallback;
  }
}