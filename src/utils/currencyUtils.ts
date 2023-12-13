export function formatCurreny(number: number, currency = "TRY") {
  return Intl.NumberFormat(undefined, {currency, style: "currency"}).format(
    number
  );
}
