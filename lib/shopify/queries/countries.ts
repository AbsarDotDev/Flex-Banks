// get countries list from Shopify
export const getCountries = `
        query {
          localization {
            availableCountries {
              isoCode
              name
            }
          }
        }
      `;
