const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const button = document.getElementById('new-quote');
const loader = document.getElementById('loader');

const quotesUrl = "https://raw.githubusercontent.com/iammohdrazi/QuickQuote/refs/heads/main/quotes.json";
let quotes = [];

async function loadQuotes() {
  try {
    loader.style.display = "block";   // show loader
    button.style.display = "none";    // hide button
    quoteElement.textContent = "";
    authorElement.textContent = "";

    const response = await fetch(quotesUrl);
    if (!response.ok) throw new Error("Failed to fetch quotes");

    quotes = await response.json();
    loader.style.display = "none";    // hide loader
    button.style.display = "inline-block";  // show button

    showRandomQuote();
  } catch (error) {
    loader.style.display = "none";
    quoteElement.textContent = "Failed to load quotes.";
    authorElement.textContent = "";
    console.error(error);
  }
}

function showRandomQuote() {
  if (quotes.length === 0) return;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteElement.textContent = quote.text;
  authorElement.textContent = `— ${quote.author}`;
}

button.addEventListener("click", showRandomQuote);

// Start loading quotes on popup open
loadQuotes();
