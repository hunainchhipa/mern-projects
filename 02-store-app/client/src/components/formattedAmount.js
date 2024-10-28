import accounting from "accounting";

export function formattedAmount(value) {
  return accounting.formatMoney(value, {
    symbol: "$",
    precision: 2,
    thousand: ",",
    format: "%s%v", // %s is the symbol, %v is the value
  });
}
