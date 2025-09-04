import React from "react";

export default function RecipeModal({ recipe, onClose }) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ing) {
      ingredients.push(`${ing} - ${measure}`);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg max-w-2xl w-full overflow-y-auto max-h-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">{recipe.strMeal}</h2>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full rounded-lg mb-4"
        />
        <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
        <ul className="list-disc list-inside mb-4">
          {ingredients.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
        <h3 className="text-lg font-semibold mb-2">Instructions</h3>
        <p className="mb-4 whitespace-pre-line">{recipe.strInstructions}</p>
        {recipe.strYoutube && (
          <a
            href={recipe.strYoutube}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 underline"
          >
            ▶ Watch on YouTube
          </a>
        )}
      </div>
    </div>
  );
}
