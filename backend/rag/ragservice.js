// const { Ollama } = require("ollama");
// const { retrieveDocuments } = require("./retriever");

// const ollamaHost = process.env.OLLAMA_HOST || "localhost";
// const ollama = new Ollama({ host: `http://${ollamaHost}:11434` });
// async function askRAG(question) {

//   const docs = await retrieveDocuments(question) || [];

//   const context = docs.map(d => d.pageContent).join("\n\n");

//   const prompt = `
// You are a maintenance engineering assistant.

// Use the following maintenance manual information to answer the question.

// Context:
// ${context}

// Question:
// ${question}
// `;

//   const response = await ollama.chat({
//     model: "qwen3.5:9b-q4_K_M",
//     messages: [
//       { role: "user", content: prompt }
//     ]
//   });

//   let answer = response.message.content;

//   // remove <thinking> blocks
//   answer = answer.replace(/<thinking>[\s\S]*?<\/thinking>/g, "").trim();

//   return answer;
// }

// module.exports = { askRAG };







const { Ollama } = require("ollama");
const { retrieveDocuments } = require("./retriever");

/* =========================================================
   Uses OLLAMA_HOST environment variable:
   - Docker → process.env.OLLAMA_HOST = "ollama"
   - Local  → process.env.OLLAMA_HOST = undefined → "localhost"
   ========================================================= */

const ollamaHost = process.env.OLLAMA_HOST || "localhost";   // ✅ env variable

const ollama = new Ollama({ host: `http://${ollamaHost}:11434` });

async function askRAG(question) {

  const docs = await retrieveDocuments(question) || [];

  const context = docs.map(d => d.pageContent).join("\n\n");

  const prompt = `
You are a maintenance engineering assistant.

Use the following maintenance manual information to answer the question.

Context:
${context}

Question:
${question}
`;

  const response = await ollama.chat({
    model: "qwen3.5:9b-q4_K_M",
    messages: [
      { role: "user", content: prompt }
    ]
  });

  let answer = response.message.content;

  // remove <thinking> blocks
  answer = answer.replace(/<thinking>[\s\S]*?<\/thinking>/g, "").trim();

  return answer;
}

module.exports = { askRAG };