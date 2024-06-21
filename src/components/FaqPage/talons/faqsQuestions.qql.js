import { gql } from '@apollo/client';

export const GET_FAQS_QUESTIONS_BY_CATEGORY = gql`
  query GetFaqsQuestionsByCategeoryId($id: Int!) {
    getFaqsQuestionsByCategeoryId(id: $id) {
      description
      is_active
      position
      question_id
      title
    }
  }
`;
