const { retrieveDocuments } = require("./retriever");

async function test() {

  const question = "What causes seal failure in pumps?";

  const docs = await retrieveDocuments(question);

  console.log("\nRetrieved Documents:\n");

  docs.forEach((doc, index) => {
    console.log("----- Document", index + 1, "-----");
    console.log(doc.pageContent);
    console.log("\n");
  });

}

test();