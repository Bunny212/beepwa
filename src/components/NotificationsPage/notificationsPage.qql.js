import { gql } from '@apollo/client';

export const GET_NOTIFICATIONS_DATA = gql`
  query Notifications {
    notifications {
      content
      created_at
      id
      image_url
      status
      title
      url
      url_type
      pathKey
      category_img
      category_mob_img
    }
  }
`;
