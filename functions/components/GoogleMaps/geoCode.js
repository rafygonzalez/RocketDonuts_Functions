var fetch = require("node-fetch");
class Geo_Code {
  constructor() {
    this.API_KEY = "AIzaSyBFpdMOluoz71jAgH3wuHVyk_CYOZymNog";
    this.API_URL_GEOCODE = "https://maps.googleapis.com/maps/api/geocode/json";
  }
  objectToQueryString(obj) {
    return Object.keys(obj)
      .map(key => key + "=" + obj[key])
      .join("&");
  }
  async reverse(coords, context) {
    var query = this.objectToQueryString({
      latlng: `${coords.latitude},${coords.longitude}`,
      key: this.API_KEY
    });
    const url = this.API_URL_GEOCODE + "?" + query;

    const response = await fetch(url);
    const json = await response.json();

    let GEOMETRIC_CENTER = [];

    if (json.status === "OK") {
      GEOMETRIC_CENTER = json.results.filter(result => {
        return result.geometry.location_type === "GEOMETRIC_CENTER";
      });
      if (GEOMETRIC_CENTER.length !== 0) {
        return GEOMETRIC_CENTER;
      } else {
        return json.results;
      }
    } else if (json.status === "ZERO_RESULTS") {
      return "No hemos encontrados resultados";
    }
    return false;
  }
}
exports.GeoCode = Geo_Code;
