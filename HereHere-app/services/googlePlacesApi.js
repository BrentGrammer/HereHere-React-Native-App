import keys from '../config/keys';

const API_KEY = keys.GooglePlacesKey;

/**
 * Gets a list of results within some distance of the location parameter
 * @param {String} query: user input 
 * @param {Object} location: { latitude, longitude }  
 */

export const searchNearbyQuery = (query, location) => {
  const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
  const encodedQuery = encodeURIComponent(query);
  // location may include delta props, we only need lat and long for the url:
  const locationParam = `${location.latitude},${location.longitude}`;

  return fetch(`${baseUrl}?key=${API_KEY}&location=${locationParam}&rankby=distance&keyword=${encodedQuery}`)
    .then(res => {
      if (!res.ok) {
        console.log('Search Nearby Request failed.');
        throw new Error('Error: Request failed.');
      }
      return res.json();
    });
};


// query {String} types {String[]}
export const autocompleteQuery = (query, types = ["establishment"]) => {
  const baseUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;
  const encodedQuery = encodeURIComponent(query);
  const typesParam = types.join(",");
  //${typesParam}
  return fetch(`${baseUrl}?key=${API_KEY}&input=${encodedQuery}&types=${typesParam}`)
    .then(res => {
      if (!res.ok) {
        console.log('autoComplete Request failed.');
        throw new Error('Request failed.');
      }
      return res.json();
    });
};

// return coords and address for place when clicked in suggestions list:
export const placeDetailsQuery = (placeId) => {
  const baseUrl = `https://maps.googleapis.com/maps/api/place/details/json`;

  return fetch(`${baseUrl}?key=${API_KEY}&placeid=${placeId}&fields=address_component,geometry,formatted_address`)
    .then(res => {
      if (!res.ok) {
        console.log('place detail Request failed.');
        throw new Error('Request failed.');
      }
      return res.json();
    });
};