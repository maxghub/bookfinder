/* eslint-disable react/prop-types */
export default function BookCard({ book }) {
  const coverId = book.cover_i;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col">
      <img
        src={coverUrl}
        alt={book.title}
        className="w-full h-48 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        {book.title}
      </h3>
      <p className="text-sm text-gray-600">
        {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
      </p>
      <p className="text-xs text-gray-500 mt-auto">
        First published: {book.first_publish_year || "N/A"}
      </p>
    </div>
  );
}
