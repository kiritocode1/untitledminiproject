import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [statement, setStatement] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Statement: statement }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setStatement("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>untitled Insult rater </h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="statement"
            placeholder="Enter a statement"
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
          />
          <input type="submit" value="Generate statement" />
        </form>
        <div className={styles.result}>{result}</div>

        <h1 className={styles.result}>I know racism is bad and you should'nt do it , BUUUUUUUUUUUUUUT  </h1>
      </main>
      
    </div>
  );
}
