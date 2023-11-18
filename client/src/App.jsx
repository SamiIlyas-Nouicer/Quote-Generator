import "./App.css"
import { publicFetch } from "./util/fetch"
import axios from "axios"
import { useEffect, useState } from "react"

function App() {
  const [quote, setQuote] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "JXvDnt5zsl2uLYC6IrKHmw==mwrcdR93uMAim2FC" // Replace with your actual API key

        const response = await axios.get(
          `https://api.api-ninjas.com/v1/quotes`,
          {
            headers: {
              "X-Api-Key": apiKey,
            },
          }
        )

        setQuote(response.data)
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        )
      }
    }

    fetchData()
  }, [refresh]) // Empty dependency array means this effect runs once when the component mounts

  console.log(quote) // This will log the initial state, not the updated state

  return (
    <div className="app">
      <h1>Quote Generator</h1>
      {quote.length > 0 && ( // Check if the quote array has elements before accessing them
        <div className="box">
          <p className="quote">{quote[0].quote}</p>
          <p className="author">- {quote[0].author}</p>
        </div>
      )}
      <div className="buttons">
        <button className="twitter">Tweet</button>
        <button className="new-quote" onClick={() => setRefresh(!refresh)}>
          Get a New Quote
        </button>
      </div>
    </div>
  )
}

export default App
