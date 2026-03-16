const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf");

const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");

const { FaissStore } = require("@langchain/community/vectorstores/faiss");

const { OllamaEmbeddings } = require("@langchain/ollama");

async function run() {
  try {

    const loader = new PDFLoader("./rag/documents/source.pdf");

    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });

    const splitDocs = await splitter.splitDocuments(docs);

    const embeddings = new OllamaEmbeddings({
      model: "nomic-embed-text",
    });

    const vectorStore = await FaissStore.fromDocuments(
      splitDocs,
      embeddings
    );

    await vectorStore.save("./rag/index");

    console.log("✅ RAG index created successfully");

  } catch (error) {

    console.error("❌ Error creating RAG index:", error);

  }
}

run();