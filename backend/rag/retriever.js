const { FaissStore } = require("@langchain/community/vectorstores/faiss");
const { OllamaEmbeddings } = require("@langchain/ollama");

async function retrieveDocuments(question) {

  const embeddings = new OllamaEmbeddings({
    model: "nomic-embed-text"
  });

  const vectorStore = await FaissStore.load(
    "./rag/index",
    embeddings
  );

  const docs = await vectorStore.similaritySearch(
    question,
    3
  );

  return docs; // return documents, not text
}

module.exports = { retrieveDocuments };