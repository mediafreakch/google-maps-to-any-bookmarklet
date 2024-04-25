import proj4 from "proj4";

export type Coordinate = [number, number];

interface LinkOpener {
    /**
     * Function to get the CRS that is required for this opener's coordinates.
     * E.g. EPSG:2056 . Make sure to register the given projection first using `proj4.defs`
     */
    getCrs(): string;
    /**
     * Function to get the URL to open with the given coordinates
     * @param lat
     * @param long
     */
    getUrl(lat: number, long: number): string;
}

class LVS95 {
    protected crs = "EPSG:2056";

    constructor() {
        // LVS95+ Swiss Coordinate System
        proj4.defs(
            "EPSG:2056",
            "+proj=somerc +lat_0=46.9524055555556 +lon_0=7.43958333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs +type=crs"
        );
    }
}

export class MapGeoAdminOpener extends LVS95 implements LinkOpener {
    getUrl(lat: number, long: number): string {
        return `https://map.geo.admin.ch?E=${lat}&N=${long}&zoom=11`;
    }

    getCrs(): string {
        return this.crs;
    }
}

export class GoGeodatenOpener extends LVS95 implements LinkOpener {
    getUrl(lat: number, long: number): string {
        return `https://go.geodatenonline.ch/?x=${lat}&y=${long}&zl=10`;
    }

    getCrs(): string {
        return this.crs;
    }
}

export class ZugMapOpener extends LVS95 implements LinkOpener {
    getUrl(lat: number, long: number): string {
        // mit Basiskarte "Ortsplan leicht"
        return `https://zugmap.ch/bmcl/?project=ZugMap.ch&rotation=0.00&scale=1200&center=${lat},${long}&layers=df8b17c6-f59d-40a3-98b6-d3f66d3248bb&legend=alle%20Themen`
    }

    getCrs(): string {
        return this.crs
    }
}
