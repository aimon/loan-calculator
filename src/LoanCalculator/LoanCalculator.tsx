import { useState, useCallback, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'

import { LOAN_TO_VALUE_CALC } from '../gql'

type CalculatedResponseType = {
  loanToValueCalc: {
    result: number;
  };
};

function LoanCalculator() {
  const [depositValue, setDepositValue] = useState<number>(0);
  const [purchasePrice, setPurchasePrice] = useState<number>(0);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [calculationError, setCalculationError] = useState<Error | null>(null);
  const [calculatedResponse, setCalculatedResponse] = useState<CalculatedResponseType | null>(null);


  const client = useApolloClient()

  const calculateLoan = useCallback(async () => {
    try {
      setIsCalculating(true);
      const { data } = await client.query<CalculatedResponseType>({
        query: LOAN_TO_VALUE_CALC,
        variables: {
          depositValue,
          purchasePrice,
        },
      });
      setCalculatedResponse(data);
    } catch (error: any) {
      setCalculationError(error);
    } finally {
      setIsCalculating(false);
    }
  }, [depositValue, purchasePrice, client]);

  const onDepositPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepositValue(Number(e.target.value));
  };

  const onPurchasePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurchasePrice(Number(e.target.value));
  };

  useEffect(() => {
    if (depositValue && purchasePrice) {
      calculateLoan();
    }
  }, [depositValue, purchasePrice]);

  return (  
    <div className="formCard">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 undefined">
          Deposit Amount
        </label>
        <div className="flex flex-col items-start">
          <input
            type="number"
            onChange={onDepositPriceChange}
            name="depositValue"
            className="input"
          />
        </div>
      </div>
      <div className="mt-4">
        <label
          htmlFor="purchasePrice"
          className="block text-sm font-medium text-gray-700 undefined"
        >
          Purchase Price
        </label>
        <div className="flex flex-col items-start">
          <input
            type="number"
            onChange={onPurchasePriceChange}
            name="purchasePrice"
            className="input"
          />
        </div>
      </div>

      <div className="flex items-center w-full my-4">
        <hr className="w-full" />
        <p className="px-3">Result</p>
        <hr className="w-full" />
      </div>

      {isCalculating && (
        <div
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
          role="alert"
        >
          <p className="font-bold">Calculating..</p>
          <p>Calculation in progress...</p>
        </div>
      )}

      {!isCalculating && calculationError && (
        <div
          className="my-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <div className="font-bold">Error</div>
          <span className="block">{calculationError.message}</span>
        </div>
      )}

      {!isCalculating && !calculationError && calculatedResponse && (
        <>
          <div
            className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
            role="alert"
          >
            <div className="text-3xl text-center font-bold text-purple-600">
              {calculatedResponse?.loanToValueCalc?.result}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default LoanCalculator
