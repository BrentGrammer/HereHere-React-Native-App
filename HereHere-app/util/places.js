import { placeDetailsQuery, searchNearbyQuery, autocompleteQuery } from '../services/googlePlacesApi';

export const generateNewMapCoords = (coords) => {
  const { latitude, longitude } = coords;
  return {
    latitude: latitude + .002,
    longitude
  };
};

export const buildPlaceObject = ({ placeId, address, placeName, coords, city = "Denver,Colorado,United States" }) => {
  return {
    placeId,
    address,
    placeName,
    coords: {
      ...coords
    },
    city
  };
};

const getCity = (address_components) => {
  const filteredLocality = address_components.filter((address_component) => {
    return address_component.types.includes("locality");
  }); 
  const filteredCountry = address_components.filter((address_component) => {
    return address_component.types.includes("country");
  }); 
  const filteredAdminLevelOne = address_components.filter((address_component) => {
    return address_component.types.includes("administrative_area_level_1");
  }); 
  const locality = filteredLocality.length ? filteredLocality[0].long_name : "";
  const country = filteredCountry.length ? filteredCountry[0].long_name : "";
  const adminLevelOne = filteredAdminLevelOne.length ? filteredAdminLevelOne[0].long_name : "";
  
  return `${locality},${adminLevelOne},${country}`;
};

export const getPlaceData = (placeId, placeName) => {
  return placeDetailsQuery(placeId)
   .then(res => {
     const address = res.result.formatted_address;
     const coords = {
       latitude: res.result.geometry.location.lat,
       longitude: res.result.geometry.location.lng
     }; 

    const { address_components } = res.result;
    const city = getCity(address_components);

    const placeData = buildPlaceObject({ placeId, placeName, address, coords, city });
    return placeData;
  });
};

export const getNearbyPlaces = (query, location) => {
  return searchNearbyQuery(query, location)
      .then(res => {
        let results = [];

        if (res.status !== "OK" && res.status === "ZERO_RESULTS") {
          console.log('No Results');
          //@TODO set no results flag or way to show "No Results" to user
          return results;
        }
        res.results.forEach(result => {
          const placeId = result.place_id;
          const placeName = result.name;
          const address = result.vicinity;
          const coords = {
            latitude: result.geometry.location.lat,
            longitude: result.geometry.location.lng
          };

          const placeData = buildPlaceObject({ placeId, placeName, address, coords });
          results.push(placeData);
        });

        return results;
      });
};

export const getPlaceSuggestions = (query, types = ["establishment"]) => {
  return autocompleteQuery(query, types)
    .then(res => {
      let suggestions = [];

      res.predictions.forEach(prediction => {
        const placeName = prediction.structured_formatting.main_text;
        const placeId = prediction.place_id;
        const description = prediction.description;

        suggestions.push({ key: placeId, title: description, placeName });
      });

      return suggestions;
    });
};
