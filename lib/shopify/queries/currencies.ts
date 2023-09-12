export const getCurrencyQuery = `
query GetCurrency($countryCode: String!) {
  localization {
    country(countryCode: $countryCode) { # Update the field name here
      currency {
        isoCode
        name
        symbol
      }
      isoCode
      name
    }
  }
}
`;
