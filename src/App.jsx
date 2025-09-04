import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import RecipeModal from "./components/RecipeModal";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // 👨‍🍳 Indian-friendly ingredient mappings → TheMealDB terms
const queryMap = {
  mutton: "lamb",
  paneer: "cheese",
  brinjal: "eggplant",
  curd: "yogurt",
  ladyfinger: "okra",
  bhindi: "okra",
  capsicum: "bell pepper",
  cornflour: "corn",
  icecream: "ice cream",
  aloo: "potato",
  gobi: "cauliflower"
};


  // 🔍 Search recipes by ingredient
  async function searchRecipes(query) {
  setLoading(true);
  setError(null);

  // Convert user-friendly word → API-friendly query
  const apiQuery = queryMap[query.toLowerCase()] || query;

  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${apiQuery}`
    );
    const data = await res.json();

    if (!data.meals) {
      setRecipes([]);
      setError(`No recipes found for "${query}".`);
    } else {
      setRecipes(data.meals);
    }
  } catch (err) {
    setError("❌ Failed to fetch recipes. Please try again.");
  } finally {
    setLoading(false);
  }
}


  // 📋 Fetch recipe details by ID
  async function fetchDetails(id) {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await res.json();
      setSelected(data.meals[0]);
    } catch (err) {
      setError("❌ Failed to load recipe details.");
    }
  }

  // ⭐ Quick Categories
  const quickCategories = ["Chicken", "Mutton", "Fish", "Rice"];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Hero Section */}
      <header
        className="relative bg-cover bg-center h-80 flex flex-col items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <h1 className="relative z-10 text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg">
          🍳 Recipe Ideas
        </h1>
        <p className="relative z-10 text-lg mt-2 text-gray-200">
          Find delicious recipes by ingredient
        </p>

        {/* 🔍 Search Bar */}
        <div className="relative z-10 mt-6 w-full max-w-lg px-4">
          <SearchBar onSearch={searchRecipes} />
        </div>

        {/* ⭐ Quick Categories */}
        <div className="relative z-10 mt-4 flex gap-3 flex-wrap justify-center">
          {quickCategories.map((item) => (
            <button
              key={item}
              onClick={() => searchRecipes(item)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-lg shadow-md"
            >
              {item}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {loading && (
          <p className="text-blue-400 mt-4 animate-pulse">⏳ Loading recipes...</p>
        )}
        {error && <p className="text-red-400 mt-4">{error}</p>}
        <RecipeList recipes={recipes} onSelect={fetchDetails} />
      </main>

      {/* Recipe Details Modal */}
      {selected && (
        <RecipeModal recipe={selected} onClose={() => setSelected(null)} />
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-center p-3 text-sm text-gray-400">
        Built with ❤️ by Tayler • Powered by TheMealDB API
      </footer>
    </div>
  );
}
