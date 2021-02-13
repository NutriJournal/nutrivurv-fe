import { useState, useEffect } from "react";

import { getNutritionInfo } from "../../lib/edamam";
import FormDropdown from "../form/FormDropdown";
import MealDropdown from "../form/MealDropDown";
import { useQuery } from "@apollo/react-hooks";
import { GET_NUTRITION } from "../../gql/queries";

export default function SearchResultsCard({ item }) {
  const [foodObj, setFoodObj] = useState();
  const { data, client } = useQuery(GET_NUTRITION);

  // When a dropdown option is selected, get the nutrition info and write it to the client cache
  const setNutrition = (someData) => {
    const nutrition = JSON.stringify({
      info: someData,
      label: foodObj.label,
      meal_type: foodObj.meal_type,
    });

    client.writeData({ data: { ...data, nutritionInfo: nutrition } });
  };

  const getInfo = async () => {
    // CB for use in MealDropdown when the meal_type is selected to trigger the Nutrition Graphic
    const foodData = await getNutritionInfo(foodObj);
    setNutrition(foodData);
  };

  return (
    <>
      <div className="flex my-2 border-b">
        <div className="flex justify-around w-full hover:bg-item-hover hover:opacity-50 border-b-1 border-gray-300 ">
          <p className="w-1/6 h-auto my-2 mx-4 self-center">
            {item.food.label}
          </p>
          <FormDropdown
            data={item}
            setValue={setFoodObj}
            name={"Serving"}
            obj={foodObj}
          />
          <p className="w-1/6 self-center text-center">
            {Math.ceil(item.food.nutrients.FAT) || 0} g
          </p>
          <p className="w-1/6 self-center text-center">
            {Math.ceil(item.food.nutrients.PROCNT || 0)} g
          </p>
          <p className="w-1/6 self-center text-center">
            {Math.ceil(item.food.nutrients.CHOCDF) || 0} g
          </p>
          <MealDropdown obj={foodObj} setValue={setFoodObj} getInfo={getInfo}/>
        </div>
      </div>
    </>
  );
}
