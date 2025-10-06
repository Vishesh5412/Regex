export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Invalid or missing prompt" });
    }

    const reply = await getFastestRegex(prompt);

    if (!reply) {
      return res.status(500).json({ error: "No valid response received" });
    }

    return res.status(200).json({ result: reply });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
// async function getFastestRegex(prompt) {
//   const systemMessage =
//     "Answer ONLY with the exact regex pattern, no explanation, no quotes, no code blocks. If the question is not about regex, respond with error";

//   const callFunctions = [callDeepseek0324, callDeepseekR1, callMistralAi];

// for (const fn of callFunctions) {
//   try {
//     const result = await fn(prompt, systemMessage);
//     if (result) return result; //koi result milte hi direct return
//   } catch (err) {
//     console.warn(`[Fallback] ${fn.name} failed:`, err.message);
//   }
// }
// this for loop will wait for each event to happen means if every event takes 2 seconds and only 3rd one will succeed then it will reutrn in 6 seconds

// return null; // All failed
// }

async function getFastestRegex(prompt) {
  const systemMessage =
    "Answer ONLY with the exact regex pattern, no explanation, no quotes, no code blocks. If the question is not about regex, respond only with  message error ";

  const callFunctions = [callDeepseek0324, callDeepseekR1, callMistralAi];

  const wrappedCalls = callFunctions.map((fn) =>
    fn(prompt, systemMessage).catch((err) => {
      console.warn(`[Fallback] ${fn.name} failed:`, err.message);
      throw err; // still fail, so Promise.any can skip it
    })
  );

  try {
    const result = await Promise.any(wrappedCalls);
    return result;
  } catch (err) {
    console.error("All model calls failed:", err);
    return null;
  }
}

function callDeepseek0324(prompt, systemMessage) {
  return fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer":
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
      max_tokens: 30, // limit for faster response
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("OpenRouter request failed");
      return res.json();
    })
    .then((data) => {
      const result = data?.choices?.[0]?.message?.content;
      if (!result) throw new Error("Invalid response from OpenRouter");
      return result.trim();
    });
}
function callDeepseekR1(prompt, systemMessage) {
  return fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer":
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-r1:free",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
      max_tokens: 30, // limit for faster response
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("OpenRouter request failed");
      return res.json();
    })
    .then((data) => {
      const result = data?.choices?.[0]?.message?.content;
      if (!result) throw new Error("Invalid response from OpenRouter");
      return result.trim();
    });
}

function callMistralAi(prompt, systemMessage) {
  return fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer":
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct:free",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
      max_tokens: 30, // limit for faster response
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("OpenRouter request failed");
      return res.json();
    })
    .then((data) => {
      const result = data?.choices?.[0]?.message?.content;
      if (!result) throw new Error("Invalid response from OpenRouter");
      return result.trim();
    });
}
