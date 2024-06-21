import { gql } from '@apollo/client';

export const GET_BUNDLE_PRODUCT_OPTIONS = gql`
  query GetBundleProductOptions($sku: String!) {
    getBundleProductOptions(sku: $sku)
  }
`;