const NutritionTable = () => {
  return (
    <div>
      {/* <div id="nutrition-table" className="space-y-2 select-none">
        <div className="flex items-center">
          <div className="font-semibold text-md ">Nutrition</div>
          {!nutritionOpen && (
            <div
              className=" px-2"
              onClick={() => setNutritionOpen(true)}
            >
              <RightChevron />
            </div>
          )}
          {nutritionOpen && (
            <div
              className=" px-2"
              onClick={() => setNutritionOpen(false)}
            >
              <DownChevron />
            </div>
          )}
        </div>
        {nutritionOpen && (
          <div className="border border-gray-300 shadow-md rounded-md px-3 py-1 text-sm">
            <div className="flex justify-between border-b border-gray-300">
              <div className="font-semibold">Calories</div>
              <div className="text-gray-700">450 kcal</div>
            </div>
            <div className="flex justify-between border-b border-gray-300">
              <div className="font-semibold">Carbs</div>
              <div className="text-gray-700">30 g</div>
            </div>
            <div className="flex justify-between border-b border-gray-300">
              <div className="font-semibold">Protein</div>
              <div className="text-gray-700">10 g</div>
            </div>
            <div className="flex justify-between">
              <div className="font-semibold">Fat</div>
              <div className="text-gray-700">25 g</div>
            </div>
          </div>
        )}
      </div>

      <div id="ingredients" className="select-none">
        <div className="flex items-center">
          <div className="font-semibold text-md">Ingredients</div>
          {!ingredientOpen && (
            <div
              className="px-2"
              onClick={() => setIngredientOpen(true)}
            >
              <RightChevron />
            </div>
          )}
          {ingredientOpen && (
            <div
              className="px-2"
              onClick={() => setIngredientOpen(false)}
            >
              <DownChevron />
            </div>
          )}
        </div>
        {ingredientOpen && (
          <div className="grid grid-cols-2 px-3 py-1">
            <div>• Romaine lettuce</div>
            <div>• Croutons</div>
            <div>• Parmesan cheese</div>
            <div>• Lemon</div>
            <div>• Garlic</div>
            <div>• Olive oil</div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default NutritionTable;
