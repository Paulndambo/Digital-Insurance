// Currency configuration - update this in one place to change currency throughout the app
export const CURRENCY = {
  code: 'KES',
  symbol: 'KSh',
  name: 'Kenya Shillings',
  decimalPlaces: 2
};

// Helper function to format currency amounts
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return `${CURRENCY.symbol} 0.00`;
  }
  return `${CURRENCY.symbol} ${parseFloat(amount).toFixed(CURRENCY.decimalPlaces)}`;
};

// Helper function to format currency without symbol (just the number)
export const formatAmount = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0.00';
  }
  return parseFloat(amount).toFixed(CURRENCY.decimalPlaces);
};
