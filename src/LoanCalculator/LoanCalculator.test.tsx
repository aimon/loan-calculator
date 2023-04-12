import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { MockedProvider } from "@apollo/client/testing";
import { LOAN_TO_VALUE_CALC } from '../gql'
import LoanCalculator from './LoanCalculator';


describe("LoanCalculator", () => {
  test("Should show calculation loader", () => {
    const mocks: any = [];

    const { getByPlaceholderText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoanCalculator />
      </MockedProvider>
    );
    fireEvent.change(getByPlaceholderText("Deposit Amount"), {
      target: { value: 1000 }
    });
    fireEvent.change(getByPlaceholderText("Purchase Price"), {
      target: { value: 1000 }
    });
    expect(screen.getByText(/Calculation in progress/i)).toBeDefined()
  });

  test("Should show calculation error", async () => {
    const depositValue = 1000;
    const purchasePrice = 1000;
    const mocks: any = {
      request: {
        query: LOAN_TO_VALUE_CALC,
        variables: {
          depositValue,
          purchasePrice,
        },
      },
      error: new Error("An error occurred")
    };

    const { getByPlaceholderText } = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <LoanCalculator />
      </MockedProvider>
    );
    fireEvent.change(getByPlaceholderText("Deposit Amount"), {
      target: { value: depositValue }
    });
    fireEvent.change(getByPlaceholderText("Purchase Price"), {
      target: { value: purchasePrice }
    });
    await waitFor(() => {
      expect(screen.getByText(/An error occurred/i)).toBeDefined()
    })
  });

  test("Should show calculation results", async () => {
    const depositValue = 1000;
    const purchasePrice = 1000;
    const mocks: any = {
      request: {
        query: LOAN_TO_VALUE_CALC,
        variables: {
          depositValue,
          purchasePrice,
        },
      },
      result: {
        data: {
          loanToValueCalc: { result: '100%' }
        }
      }
    };

    const { getByPlaceholderText, getByText } = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <LoanCalculator />
      </MockedProvider>
    );
    fireEvent.change(getByPlaceholderText("Deposit Amount"), {
      target: { value: depositValue }
    });
    fireEvent.change(getByPlaceholderText("Purchase Price"), {
      target: { value: purchasePrice }
    });
    await waitFor(() => {
      expect(screen.getByText(/Calculated/i)).toBeDefined()
      expect(screen.getByText(/100%/i)).toBeDefined()
    })
  });
});