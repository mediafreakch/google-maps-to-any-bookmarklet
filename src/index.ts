import proj4 from "proj4";
import {
  Coordinate,
  MapGeoAdminOpener,
  GoGeodatenOpener,
  ZugMapOpener,
} from "./utils/openers/index";

// WGS 84 Coordinate System (used by Google Maps in URL)
proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs +type=crs");

/*
 * Parses a google maps url for WGS84 coordinates.
 * e.g. https://www.google.com/maps/@47.1951037,8.5236687,17z?entry=ttu
 */
function getGoogleMapsCoordinate(): Coordinate | null {
  const googleMapsLatLonMatch = window.location.pathname.match(
    /@([\d\.]+),([\d^\.]+)/
  );

  if (!googleMapsLatLonMatch) {
    return null;
  }

  const [, lat, long] = googleMapsLatLonMatch;

  return [parseFloat(long), parseFloat(lat)];
}

const openers = [
  new MapGeoAdminOpener(),
  new GoGeodatenOpener(),
  new ZugMapOpener(),
];

function run(): void {
  const wgs84 = getGoogleMapsCoordinate();

  if (wgs84) {
    openers.forEach((opener) => {
      const [lat, long] = proj4("EPSG:4326", opener.getCrs(), wgs84);

      // this will trigger Popup-Blockers which need to manually be granted once for maps.google.com
      window.open(opener.getUrl(lat, long), "_blank");
    });
  }
}

run();
