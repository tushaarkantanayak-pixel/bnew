export const formatPrice = (price: number | string | undefined | null) => {
  if (price === undefined || price === null) return "";
  
  const rate = Number(process.env.NEXT_PUBLIC_USD_RATE) || 98;
  
  // Extract numerical value if string
  let numPrice: number;
  if (typeof price === 'string') {
    // Remove currency symbols and non-numeric characters except decimal point
    const cleaned = price.replace(/[^\d.]/g, '');
    numPrice = parseFloat(cleaned);
  } else {
    numPrice = price;
  }
  
  if (isNaN(numPrice)) return price.toString();
  
  const usdPrice = numPrice / rate;
  
  // Return formatted USD string
  return `$${usdPrice.toFixed(2)}`;
};
