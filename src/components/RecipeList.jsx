import React from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes, onSelect }) {
  if (!recipes.length) return null;

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {recipes.map((r) => (
        <RecipeCard key={r.idMeal} recipe={r} onSelect={onSelect} />
      ))}
    </div>
  );
}
