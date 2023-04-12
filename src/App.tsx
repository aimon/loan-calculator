import LoanCalculator from './LoanCalculator'

function App(): JSX.Element {
  return (
    <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
      <h3 className="text-4xl font-bold text-purple-600">Loan Calculator</h3>
      <LoanCalculator />
    </div>
  )
}

export default App
