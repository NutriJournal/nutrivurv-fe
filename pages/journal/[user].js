import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import withApollo from '../../lib/apollo';
import { GET_DASHNAV_STATE } from '../../gql/queries';
import Layout from '../../components/Layout/index';
import DesktopFoodJournal from '../../components/foodJournal/DesktopFoodJounal';
import FoodSearchResults from '../../components/foodJournal/FoodSearchResults';

const FoodJournal = () => {
  //Gets active journal component from client cache
  const { data } = useQuery(GET_DASHNAV_STATE);

  const journalComponent = data ? data.journalComponent : 'log'; // gets the label for the component to render

  return (
    <div>
      <Layout>
        <div>
          {journalComponent === 'log' ? (
            <DesktopFoodJournal />
          ) : journalComponent === 'searchResults' ? (
            <FoodSearchResults />
          ) : (
                'Error'
              )}
        </div>
      </Layout>
    </div>
  );
};

export default withApollo(FoodJournal);
