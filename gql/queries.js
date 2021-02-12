import gql from 'graphql-tag';

export const GET_USER = gql`
  query getUser {
    user {
      id
      name
      email
    }
  }
`;

export const GET_ALL_USERS = gql`
  query getAllUsers {
    users {
      id
      name
      email
    }
  }
`;

export const DASH_ME = gql`
  query dashMe {
    user {
      id
      name
    }
    lowerNav @client
  }
`;

export const ME = gql`
  query me {
    user {
      id
      name
      profile {
        id
        age
        weight
        height
        gender
        goal_weight
        activity_level
        diet
        fat
        carbs
        protein
        calories
      }
    }
    weight_log {
      current_weight
      id
    }
    daily_record(order_by: { date: desc }) {
      id
      date
      fat
      carbs
      protein
      calories
    }
    lowerNav @client
  }
`;

export const USER_DASH_HEADER = gql`
  query userDashHeader {
    user {
      id
      name
      profile {
        id
        weight
        gender
      }
      weight_log {
        date
        current_weight
        id
      }
    }
  }
`;

export const GET_PROGRESS_DATA = gql`
  query getProgressData {
    myDailyRecords {
      id
      date
    }
    user {
      id
      profile {
        id
        goal_weight
        weight
      }
    }
  }
`;

export const GET_FOOD_LOG = gql`
  query getFoodLog {
    user {
      id
      profile {
        id
        weight
      }
    }
    daily_record {
      id
      date
      calories
      fat
      carbs
      fiber
      protein
      food_string
      meal_type
    }
    weight_log {
      id
      current_weight
    }
  }
`;

export const GET_DOUGHNUT_DATA = gql`
  query getFoodLog {
    user {
      id
      profile {
        id
        weight
      }
    }
    daily_record {
      id
      date
      calories
      fat
      carbs
      fiber
      protein
      food_string
      meal_type
    }
    weight_log {
      id
      current_weight
    }
  }
`;

export const GET_FOODJOURNAL_LOGS = gql`
  query getFoodJournalLogs {
    daily_record {
      id
      date
      calories
      fat
      carbs
      fiber
      protein
      food_string
      meal_type
      quantity
    }
    mealType @client
  }
`;

export const GET_DASHNAV_STATE = gql`
  query GetDashNavState {
    user {
      id
      name
      profile {
        id
      }
    }
    lowerNav @client
    journalComponent @client
  }
`;

export const GET_MEAL_TYPE = gql`
  {
    mealType @client
  }
`;

export const GET_OPEN_LOG_STATE = gql`
  {
    logType @client
    mealType @client
  }
`;

export const GET_LOG_TYPE_STATE = gql`
  {
    logType @client
  }
`;

export const GET_SEARCH_RESULTS = gql`
  query GetSearchResults {
    user {
      id
      name
    }
    searchResults @client
  }
`;
export const GET_NUTRITION = gql`
  {
    nutritionInfo @client
    lowerNav @client
  }
`;

export const GET_FORUM_SELECTION_STATE = gql`
  {
    activeCat @client
  }
`;

export const GET_LAST_WEIGHT_LOG = gql`
  query getLastWeightLog {
    user {
      id
      profile {
        id
        weight
      }
    }
    myWeightLogs(orderBy: createdAt_DESC, first: 1) {
      id
      current_weight
    }
  }
`;

export const GET_WEIGHT_LOGS = gql`
  query getWeightLogs {
    myWeightLogs(orderBy: date_DESC) {
      date
      current_weight
      id
    }
    user {
      id
      name
      profile {
        id
        age
        weight
        height
        gender
        goal_weight
      }
    }
  }
`;

export const GET_FORUM_TOPICS = gql`
  query getForumTopics {
    posts {
      body
      id
      comments {
        id
        user_id
        body
      }
      user {
        id
        name
        email
      }
      viewCount
      title
      createdAt
      updatedAt
      likeCount
    }
    user {
      id
      name
    }
  }
`;

export const GET_POST_COMMENTS = gql`
  query getPostComments {
    comments {
      id
      user_id
      user {
        id
        name
      }
      updatedAt
      likeCount
      body
      post {
        id
      }
    }
    user {
      id
    }
  }
`;

export const GET_POST_DETAILS = gql`
  query getPost($id: String!) {
    post(id: $id) {
      id
      body
      title
      user {
        id
        name
      }
      user_id
      comments {
        id
        user {
          id
          name
        }
        body
      }
      viewCount
      likeCount
    }
    user {
      id
      name
    }
  }
`;