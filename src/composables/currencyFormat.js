export function useCurrencyFormat() {
    const formatAmount = (amount) => {
      return new Intl.NumberFormat('en-PH', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount)
    }
  
    return {
      formatAmount
    }
}  