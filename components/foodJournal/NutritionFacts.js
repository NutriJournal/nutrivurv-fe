import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { ADD_FOOD } from '../../gql/mutations';
import { adjustIntValuesonAnObject } from '../../lib/utils';
import { GET_DOUGHNUT_DATA } from '../../gql/queries';
import { useFetchUser } from '../../lib/Auth0/user';

export default function NutritionFacts({
  nutrition: { info, label, meal_type },
}) {
  //  Qty value used to get final values
  const [qty, setQty] = useState(1);
  //  No of servings entered into the nutrition display, default value of 1
  const [enteredQty, setEnteredQty] = useState(1);
  const { user } = useFetchUser();

  const {
    //  Destructure info for access to properties we're loading into foodLogData
    calories,
    totalNutrients: {
      FAT: { quantity: fatQuantity },
      CHOCDF: { quantity: carbsQuantity },
      PROCNT: { quantity: proteinQuantity },
      FIBTG: { quantity: fiberQuantity },
    },
    ingredients: [{ parsed }],
  } = info;

  //  add favorite and logged qty properties to food_string
  const foodString = { ...parsed[0], favorite: false, loggedQty: enteredQty };

  const foodLogData = {
    //Obj for storing the vales used in the nutrition graphic and the dailyRecord mutation
    recordData: {
      date: new Date(Date.now()).toLocaleDateString().toString(),
      calories: Math.round(calories * qty) || 0,
      fat: Math.floor(fatQuantity * qty) || 0,
      carbs: Math.floor(carbsQuantity * qty) || 0,
      fiber: Math.floor(fiberQuantity * qty) || 0,
      protein: Math.floor(proteinQuantity * qty) || 0,
      food_string: JSON.stringify(foodString),
      meal_type: meal_type,
      quantity: parseInt(enteredQty),
      user_id: user.sub,
    },
    graphicData: info,
  };

  const {
    //  Access needed data from foodLogdata to build our Nutrition Label
    ingredients,
    totalNutrients,
    totalWeight,
    totalDaily,
    yield: itemYield,
  } = foodLogData.graphicData;

  // Name of food item
  const name = ingredients[0].parsed[0].food;
  // Array of returned nutrients for creating nutrition lable
  const nutrients = Object.keys(totalNutrients).splice(1);
  // Weight of a single serving
  const servingSize = Math.floor(totalWeight / itemYield);

  //  Programatically grab our return nutrients and create items for display in the Nutrition Label
  const nutrientList = nutrients.map((nutrient) => {
    // Macros
    const nutrientTotals = totalNutrients;
    //  Percent daily values
    const dailyTotals = totalDaily;
    //  Macro name
    const label = nutrientTotals[nutrient].label;

    const nutrientQuantity = Math.floor(
      //  Total per selected serving
      nutrientTotals[nutrient].quantity * qty
    );

    //  Unit for serving total
    const nutrientUnit = nutrientTotals[nutrient].unit;

    //  Qty for the % daily value
    const totalQuantity = dailyTotals[nutrient]
      ? Math.floor(dailyTotals[nutrient].quantity * qty)
      : '';

    //  Unit for the % daily value
    const totalUnit = dailyTotals[nutrient]
      ? dailyTotals[nutrient].unit
      : 'N/A';

    return (
      <div
        className={`flex ${nutrientQuantity === 0 ? 'hidden' : ''}`}
        key={label}
      >
        <p className="">{label}</p>
        <p className="flex-1"></p>
        <p className="mx-3">{`${nutrientQuantity} ${nutrientUnit}`}</p>
        <p
          className={`${totalQuantity < 10 ? 'ml-2' : ''}`}
        >{`${totalQuantity} ${totalUnit}`}</p>
      </div>
    );
  });

  const [addFood, { client }] = useMutation(
    /* Returns CB needed to make mutation call, updates cache with returned values,  
        gives us access to the client to change the dashboard back to the food journal */
    ADD_FOOD
  );

  const logFood = async () => {
    //  CB that runs mutation in handleSubmit
    const { loading, data, error } = await addFood({
      variables: foodLogData.recordData,
      refetchQueries: [
        {
          query: GET_DOUGHNUT_DATA,
        },
      ],
    });

    if (error) return `Error: ${error}`;

    if (data) {
      //  On success set Dashboard to Food Journal, logType to daily,  and mealType to the type last logged
      client.writeData({
        data: {
          ...data,
          lowerNav: 'journal',
          mealType: meal_type,
          logType: 'daily',
          journalComponent: 'log',
          // nutritionInfo: "",
          // searchResults: "",
        },
      });
    }
  };

  const handleChange = (e) => {
    setEnteredQty(e.target.value);
  };

  const handleSubmit = (e) => {
    //  Adjusts values on macros according to the quantity set by the user and returns a new object
    e.preventDefault();
    setQty(enteredQty);
    adjustIntValuesonAnObject(foodLogData.recordData, qty, enteredQty);
  };

  return (
    <div className="flex flex-col w-4/5 max-w-md pr-24 -mt-48">
      <h1 className="text-2xl font-semibold capitalize pb-4">
        {name.toLowerCase()}
      </h1>
      <label>No. of Servings</label>
      <form className="flex" value={enteredQty} onSubmit={handleSubmit}>
        <input
          className="border border-gray-500 w-2/12"
          value={enteredQty}
          onChange={handleChange}
        />
        <p className="pl-2 -mb-1">{label}</p>
      </form>
      <h2 className="text-2xl font-semibold mt-4 mb-2">Nutrition Facts</h2>
      <p>{`Serving Amt. ${servingSize * qty}g`}</p>
      <div className="flex text-xl py-2">
        <p className="">Calories</p>
        <p className="flex-1"></p>
        <p className="">{info.calories * qty}</p>++
      </div>
      <div className="flex">
        <p className="flex-1"></p>
        <p className="text-sm font-hairline">% Daily Value*</p>
      </div>
      {nutrientList}
      <p className="py-4 text-sm font-hairline">
        * The % Daily Values tells you how much a nutrient in a serving of food
        contributes to a daily diet of 2,000 calories a day is used for general
        nutrition advice
      </p>
      <button
        className="w-full text-white bg-blue-400 hover:item-hover py-4 rounded-sm"
        onClick={logFood}
      >
        Log Food
      </button>
    </div>
  );
}
