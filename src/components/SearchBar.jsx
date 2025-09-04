import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 bg-white/10 backdrop-blur-md rounded-lg p-2 shadow-md"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter an ingredient (e.g., chicken)"
        className="px-4 py-2 rounded-lg text-black flex-1 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white font-semibold"
      >
        Search
      </button>
    </form>
  );
}
