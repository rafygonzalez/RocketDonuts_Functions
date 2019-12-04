const Geo_Code = require("./geoCode.js");

exports.getReverseGeoCode = async (coords, context) => {
  const geoCode = new Geo_Code.GeoCode();
  const reverse = await geoCode.reverse(coords, context);
  return reverse;
};
