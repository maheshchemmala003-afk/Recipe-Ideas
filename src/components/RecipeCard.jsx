import React from "react";

export default function RecipeCard({ recipe, onSelect }) {
  return (
    <div
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 hover:shadow-2xl transition duration-300"
      onClick={() => onSelect(recipe.idMeal)}
    >
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white">{recipe.strMeal}</h3>
      </div>
    </div>
  );
}
