import { gql } from '@apollo/client'

export const LOAN_TO_VALUE_CALC = gql`
  query LoanToValueCalc($depositValue: Int!, $purchasePrice: Int!) {
    loanToValueCalc(depositValue: $depositValue, purchasePrice: $purchasePrice) {
      result
    }
  }
`
