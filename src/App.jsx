import { useState } from "react";
import BookCard from "./components/BookCard";

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await res.json();
      setBooks(data.docs.slice(0, 12)); 
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          📚 Book Finder
        </h1>

        {/* Search Bar */}
        <form
          onSubmit={searchBooks}
          className="flex justify-center mb-8 gap-2"
        >
          <input
            type="text"
            placeholder="Search by book title ,name,id, author name......."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

        {/* Results */}
        {loading && <p className="text-center text-lg">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {books.map((book, i) => (
            <BookCard key={i} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
