import React from 'react';
import { connect } from 'react-redux';
import PlacesSearchInput from './PlacesSearchInput';
import { getPlaceData, getNearbyPlaces, getPlaceSuggestions } from '../../util/places';
import { storePlaceSelected, setPlaceResults } from '../../store/actions/places';

class PlacesSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      suggestions: [],
      error: ''
    };
  }

  onPlacesSearchInput = (val) => {
    this.setState({ search: val });

    if (val.length > 1) { 
      getPlaceSuggestions(val)
        .then(suggestions => {
          this.setState({ suggestions });
        })
        .catch(err => {
          console.log('Error getting suggestions', err);
          this.setState({ error: 'Cannot get Suggestions.'});
        });
    }
  };

  clearPlacesSearch = () => {
    this.setState({ search: '', suggestions: [] });
  };

  onPlaceSuggestionPressed = ({ key, placeName }) => {
    this.setState({ error: ''});
    this.clearPlacesSearch();
    const placeId = key;
    this.props.onSuggestionPressed(placeId, placeName);
  };

  onSubmitKeyPressed = () => {
    const query = this.state.search;
    const location = this.props.mapRegion;
    this.clearPlacesSearch();

    getNearbyPlaces(query, location)
      .then(placeResults => {
        this.props.setPlaceResults(placeResults);
      })
      .catch(err => {
        //@TODO show this to user in view
        this.setState({ error: 'Error - request failed.' });
      });
  };

  render() {
    return (
      <PlacesSearchInput
        suggestions={this.state.suggestions}
        search={this.state.search}
        clearPlacesSearch={this.clearPlacesSearch}
        onPlacesSearchInput={this.onPlacesSearchInput}
        onSubmitKeyPressed={this.onSubmitKeyPressed}
        onPlaceSuggestionPressed={this.onPlaceSuggestionPressed}
        error={this.state.error}
      />
    );
  }
}

const mapStateToProps = state => ({
  mapRegion: state.map.mapRegion
});

const mapDispatchToProps = dispatch => ({
  storePlaceSelected: (placeData) => dispatch(storePlaceSelected(placeData)),
  setPlaceResults: (placeResults) => dispatch(setPlaceResults(placeResults))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlacesSearch);