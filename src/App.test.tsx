import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { MockedProvider } from "@apollo/client/testing";
import { LOAN_TO_VALUE_CALC } from './gql'
import App from './App';

describe("App", () => {
  test("Should show corrent title", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <App />
      </MockedProvider>
    );
    expect(screen.getByText(/Loan Calculator/i)).toBeDefined()
  });

});