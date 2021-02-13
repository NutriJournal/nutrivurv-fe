import { useQuery } from '@apollo/react-hooks';

import NutritionFacts from './NutritionFacts';
import SplashSVG from '../svg/SplashSVG';
import FoodSearchList from './FoodSearchList';
import { GET_NUTRITION } from '../../gql/queries';

export default function FoodSearchResults() {
  const { data } = useQuery(GET_NUTRITION);

  const nutrition = data ? data.nutritionInfo : '';

  const svg = (
    <div className="flex flex-col pt-12">
      <SplashSVG />
    </div>
  );

  return (
    <section className="flex flex-1 justify-between mt-24">
      <FoodSearchList />
      {data ? <NutritionFacts nutrition={JSON.parse(nutrition)} /> : svg}
    </section>
  );
}
