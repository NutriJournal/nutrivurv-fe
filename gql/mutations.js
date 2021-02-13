import gql from 'graphql-tag';

export const CREATE_PROFILE = gql`
  mutation CREATE_PROFILE(
    $age: Int!
    $weight: Int!
    $height: Int!
    $gender: Boolean
    $goal_weight: Int
    $activity_level: Int
    $fat: Int
    $carbs: Int
    $protein: Int
  ) {
    createProfile(
      data: {
        age: $age
        weight: $weight
        height: $height
        gender: $gender
        goal_weight: $goal_weight
        activity_level: $activity_level
        fat: $fat
        carbs: $carbs
        protein: $protein
      }
    ) {
      id
      age
      weight
      height
      gender
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UPDATE_PROFILE(
    $age: Int!
    $weight: Int!
    $height: Int!
    $gender: Boolean
    $goal_weight: Int
    $activity_level: Int
    $fat: Int
    $carbs: Int
    $protein: Int
    $calories: Int
  ) {
    updateProfile(
      data: {
        age: $age
        weight: $weight
        height: $height
        gender: $gender
        goal_weight: $goal_weight
        activity_level: $activity_level
        fat: $fat
        carbs: $carbs
        protein: $protein
        calories: $calories
      }
    ) {
      id
      age
      weight
      height
      gender
    }
  }
`;

export const ADD_FOOD = gql`
  mutation ADD_FOOD(
    $date: String!
    $calories: Int!
    $fat: Int!
    $carbs: Int!
    $fiber: Int!
    $protein: Int!
    $food_string: String!
    $meal_type: String!
    $quantity: Int!
    $user_id: String!
  ) {
    insert_daily_record(
      objects: {
        calories: $calories
        carbs: $carbs
        date: $date
        fat: $fat
        fiber: $fiber
        food_string: $food_string
        meal_type: $meal_type
        protein: $protein
        quantity: $quantity
        user_id: $user_id
      }
    ) {
      returning {
        date
        calories
        fat
        carbs
        fiber
        protein
        food_string
        meal_type
        quantity
        created_at
      }
    }
  }
`;

export const UPDATE_FOOD_ITEM = gql`
  mutation UPDATE_FOOD_ITEM(
    $id: uuid!
    $date: String
    $calories: Int
    $fat: Int
    $carbs: Int
    $fiber: Int
    $protein: Int
    $food_string: String
    $quantity: Int
    $meal_type: String
    $favorite: Boolean
  ) {
    update_daily_record_by_pk(
      id: $id
      data: {
        date: $date
        calories: $calories
        fat: $fat
        carbs: $carbs
        fiber: $fiber
        protein: $protein
        food_string: $food_string
        quantity: $quantity
        meal_type: $meal_type
        favorite: $favorite
      }
    ) {
      id
      date
      calories
      fat
      carbs
      fiber
      protein
      food_string
      quantity
      meal_type
      favorite
    }
  }
`;

export const CREATE_WEIGHT_LOG = gql`
  mutation CREATE_WEIGHT_LOG($current_weight: Int!, $date: String!) {
    createWeightLog(data: { current_weight: $current_weight, date: $date }) {
      current_weight
      date
    }
  }
`;

export const UPDATE_WEIGHT_LOG = gql`
  mutation UPDATE_WEIGHT_LOG($id: String!, $current_weight: Int) {
    updateWeightLog(id: $id, data: { current_weight: $current_weight }) {
      current_weight
      id
    }
  }
`;

export const ADD_POST = gql`
  mutation ADD_POST($title: String!, $body: String!, $user_id: String!) {
    insert_post(objects: { body: $body, title: $title, user_id: $user_id }) {
      returning {
        id
        user_id
        body
        created_at
        like_count
      }
    }
    __typename
  }
`;

export const ADD_COMMENT = gql`
  mutation ADD_COMMENT($postId: String!, $body: String!) {
    createComment(postId: $postId, data: { body: $body }) {
      id
      user_id
      body
      createdAt
      likeCount
    }
  }
`;

export const DELETE_FOOD_LOG_RECORD = gql`
  mutation DELETE_FOOD_LOG_RECORD($id: uuid!) {
    delete_daily_record_by_pk(id: $id) {
      id
    }
  }
`;

export const UPDATE_VIEW_COUNT = gql`
  mutation UPDATE_POST($id: String!, $viewCount: Int!) {
    updatePost(id: $id, data: { viewCount: $viewCount }) {
      viewCount
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UPDATE_POST($id: String!, $title: String, $body: String) {
    updatePost(id: $id, data: { title: $title, body: $body }) {
      id
      title
      body
    }
  }
`;

export const UPDATE_FOOD_LOG_RECORD = gql`
  mutation UPDATE_FOOD_LOG_RECORD(
    $id: String!
    $calories: Int
    $fat: Int
    $carbs: Int
    $protein: Int
    $quantity: Int
    $food_string: String
  ) {
    updateDailyRecord(
      id: $id
      data: {
        calories: $calories
        fat: $fat
        carbs: $carbs
        protein: $protein
        quantity: $quantity
        food_string: $food_string
      }
    ) {
      id
      date
      calories
      fat
      carbs
      fiber
      protein
      food_string
      quantity
      meal_type
    }
  }
`;

export const UPDATE_FAVORITE_STATUS = gql`
  mutation UPDATE_FAVORITE_STATUS($id: uuid!, $favorite: Boolean) {
    update_daily_record_by_pk(
      pk_columns: { id: $id }
      _set: { favorite: $favorite }
    ) {
      favorite
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation UPDATE_COMMENT($id: String!, $body: String) {
    updateComment(id: $id, data: { body: $body }) {
      id
      body
      likeCount
    }
  }
`;

export const DELETE_POST = gql`
  mutation DELETE_POST($id: String!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DELETE_COMMENT($id: String!) {
    deleteComment(id: $id) {
      id
    }
  }
`;

export const UPDATE_LIKE_COUNT = gql`
  mutation UpdateLikeCount($id: String!) {
    addLikeToPost(id: $id) {
      id
      likeCount
    }
  }
`;
