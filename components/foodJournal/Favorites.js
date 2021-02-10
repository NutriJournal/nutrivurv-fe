import { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_FOODJOURNAL_LOGS } from "../../gql/queries";
import DashboardChart from "../dashboardChart/DashboardChart";

export default function FoodLog() {
  // We'll pull in the food data off the user, filter the items by the control selected, then pass that array to the chart component
  const { loading, error, data, refetch, client } = useQuery(
    GET_FOODJOURNAL_LOGS
  );

  useEffect(() => {
    refetch();
  }, []);

  if (loading) return "Loading...";
  if (error) return `Error: ${error}`;

  const { mealType, myDailyRecords } = data;

  const handleClick = (e) => {
    const mealType = e.target.dataset.mealtype;
    client.writeData({ data: { ...data, mealType: mealType } });
  };
  //  Filter records for favorited items
  const favoritesRecords = (data) => {
    let newArr = [];
    data?.map((record) => {
      const favorite = JSON.parse(record.food_string).favorite;
      const edamamId = JSON.parse(record.food_string).food;
      const alreadyInRecords = newArr
        .map((item) => {
          const itemEdamamId = JSON.parse(item.food_string).food;
          return edamamId === itemEdamamId;
        })
        .includes(true);
      favorite && !alreadyInRecords && newArr.push(record);
    });
    return newArr;
  };

  return (
    <>
      <div className="flex text- font-medium py-2">
        <div
          className={`${mealType === "breakfast" ? "border-b-2 border-blue-400" : ""
            } cursor-pointer mr-12`}
          data-mealtype="breakfast"
          onClick={handleClick}
        >
          Breakfast
        </div>
        <div
          className={`${mealType === "lunch" ? "border-b-2 border-blue-400" : ""
            } cursor-pointer mr-12`}
          data-mealtype="lunch"
          onClick={handleClick}
        >
          Lunch
        </div>
        <div
          className={`${mealType === "dinner" ? "border-b-2 border-blue-400" : ""
            } cursor-pointer mr-12`}
          data-mealtype="dinner"
          onClick={handleClick}
        >
          Dinner
        </div>
        <div
          className={`${mealType === "snack" ? "border-b-2 border-blue-400" : ""
            } cursor-pointer mr-12`}
          data-mealtype="snack"
          onClick={handleClick}
        >
          Snack
        </div>
        <div
          className={`${mealType === "water" ? "border-b-2 border-blue-400" : ""
            } cursor-pointer mr-12`}
          data-mealtype="water"
          onClick={handleClick}
        >
          Water
        </div>
      </div>
      <DashboardChart
        records={favoritesRecords(myDailyRecords)}
        mealType={mealType}
      />
    </>
  );
}
