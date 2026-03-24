// const { FaissStore } = require("@langchain/community/vectorstores/faiss");
// const { OllamaEmbeddings } = require("@langchain/ollama");

// async function retrieveDocuments(question) {

// // const embeddings = new OllamaEmbeddings({
// //   model: "nomic-embed-text",
// //   baseUrl: "http://ollama:11434"   
// // });
//   const embeddings = new OllamaEmbeddings({
//     model: "nomic-embed-text",
//     baseUrl: "http://localhost:11434"
//   });
//   const vectorStore = await FaissStore.load(
//     "./rag/index",
//     embeddings
//   );

//   const docs = await vectorStore.similaritySearch(
//     question,
//     3
//   );

//   return docs; // return documents, not text
// }

// module.exports = { retrieveDocuments };



const { FaissStore } = require("@langchain/community/vectorstores/faiss");
const { OllamaEmbeddings } = require("@langchain/ollama");

/* =========================================================
   Uses OLLAMA_HOST environment variable:
   - Docker → process.env.OLLAMA_HOST = "ollama"
   - Local  → process.env.OLLAMA_HOST = undefined → "localhost"
   ========================================================= */

async function retrieveDocuments(question) {

  const ollamaHost = process.env.OLLAMA_HOST || "localhost";   // ✅ env variable

  const embeddings = new OllamaEmbeddings({
    model: "nomic-embed-text",
    baseUrl: `http://${ollamaHost}:11434`                      // ✅ env variable
  });

  const vectorStore = await FaissStore.load(
    "./rag/index",
    embeddings
  );

  const docs = await vectorStore.similaritySearch(
    question,
    3
  );

  return docs;
}

module.exports = { retrieveDocuments };