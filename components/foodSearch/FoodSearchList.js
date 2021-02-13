import { useQuery } from '@apollo/react-hooks';

import SearchResultsCard from './SearchResultCard';
import { GET_SEARCH_RESULTS } from '../../gql/queries';
import { useState } from 'react';
import { chunkArr } from '../../lib/utils';
import { Spacer } from '../Layout/LayoutPrimitives';

export default function FoodSearchList({ setNutrInfo }) {
  const [currChunk, setCurrChunk] = useState(0);
  const { data } = useQuery(GET_SEARCH_RESULTS);
  const results = JSON.parse(data.searchResults);
  const chunkedResults = chunkArr(results, 5);

  const cardList = () => {
    //  Some of the items from edamam have duplicate id's,
    // keyOrder added to garauntee a unque value for the key
    let keyOrder = 0;

    return chunkedResults[currChunk].map((item) => {
      keyOrder++;
      return (
        <SearchResultsCard
          key={`${item.food.foodId} ${keyOrder}`}
          item={item}
          setNutrInfo={setNutrInfo}
        />
      );
    });
  };

  return (
    <div className="flex flex-col w-1/2">
      {results.length > 0 ? (
        <div className="flex pb-4 justify-around text-lg border-b border-gray-300">
          <p className="w-1/6 mx-4">Food Item</p>
          <p className="w-1/6 mx-4">Serving Size</p>
          <p className="w-1/6 text-center">Fats %</p>
          <p className="w-1/6 text-center">Protein %</p>
          <p className="w-1/6 text-center">Carb %</p>
          <p className="w-1/6 text-center">Meal Type</p>
        </div>
      ) : (
        'No Results Found'
      )}
      {cardList()}
      {
        <span
          className={`flex mt-8 ${chunkedResults.length <= 1 ? 'hidden' : ''}`}
        >
          <Spacer />
          <button
            className="px-2 py-1 border w-1/6 disabled:text-gray-100 disabled:cursor-default"
            disabled={currChunk === 0}
            onClick={() => setCurrChunk(currChunk - 1)}
          >
            previous
          </button>
          <button
            className="px-2 py-1 border w-1/6 disabled:text-gray-100 disabled:cursor-default"
            disabled={currChunk === chunkedResults.length - 1}
            onClick={() => setCurrChunk(currChunk + 1)}
          >
            next
          </button>
          <Spacer />
        </span>
      }
    </div>
  );
}
