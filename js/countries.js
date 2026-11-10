/*
  countries.js
  Which continent each country belongs to, by ISO numeric code.
  The map shapes come from the "world-atlas" data, which uses these codes.
  Countries not listed (for example Antarctica) are drawn in grey.
*/

var COUNTRY_CONTINENT = {};

(function () {
  var groups = {
    africa: [
      "012", "024", "072", "108", "120", "140", "148", "178", "180", "204", "226", "231",
      "232", "262", "266", "270", "288", "324", "384", "404", "426", "430", "434", "450",
      "454", "466", "478", "504", "508", "516", "562", "566", "624", "646", "686", "694",
      "706", "710", "716", "728", "729", "732", "748", "768", "788", "800", "818", "834",
      "854", "894"
    ],
    europe: [
      "008", "040", "056", "070", "100", "112", "191", "196", "203", "208", "233", "246",
      "250", "276", "300", "348", "352", "372", "380", "428", "440", "442", "498", "499",
      "528", "578", "616", "620", "642", "643", "688", "703", "705", "724", "752", "756",
      "804", "807", "826"
    ],
    asia: [
      "004", "031", "050", "051", "064", "096", "104", "116", "144", "156", "158", "268",
      "275", "356", "360", "364", "368", "376", "392", "398", "400", "408", "410", "414",
      "417", "418", "422", "458", "496", "512", "524", "586", "608", "626", "634", "682",
      "704", "760", "762", "764", "784", "792", "795", "860", "887"
    ],
    namerica: [
      "044", "084", "124", "188", "192", "214", "222", "304", "320", "332", "340", "388",
      "484", "558", "591", "630", "780", "840"
    ],
    samerica: [
      "032", "068", "076", "152", "170", "218", "238", "328", "600", "604", "740", "858",
      "862"
    ],
    oceania: [
      "036", "090", "242", "540", "548", "554", "598"
    ]
  };

  Object.keys(groups).forEach(function (continent) {
    groups[continent].forEach(function (code) {
      COUNTRY_CONTINENT[code] = continent;
    });
  });
})();

/*
  A few shapes in the map data have no ISO code (for example Kosovo,
  Northern Cyprus and Somaliland). This guesses their continent from
  their centre point [longitude, latitude].
*/
function guessContinent(lon, lat) {
  if (lat < -60) { return null; }
  if (lon < -30) { return lat > 12 ? "namerica" : "samerica"; }
  if (lon > 110 && lat < -8) { return "oceania"; }
  if (lon > 60) { return "asia"; }
  if (lat > 34) { return lon > 42 ? "asia" : "europe"; }
  if (lon > 35 && lat > 12) { return "asia"; }
  return "africa";
}
