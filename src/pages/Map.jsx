import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import { GeocodingControl } from "@maptiler/geocoding-control/react";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import { MaplibreLegendControl } from "@watergis/maplibre-gl-legend";
import "@watergis/maplibre-gl-legend/dist/maplibre-gl-legend.css";
import "@maptiler/geocoding-control/style.css";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "../CSS/map.css";

export const Map = () => {
  const [mapController, setMapController] = useState(null);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const mumbai = { lng: 72.8397202, lat: 19.1619411 };
  const zoom = 9;
  maptilersdk.config.apiKey = "gioXKdvRiQckRM3wwGOS";
  navigator.geolocation.getCurrentPosition((position) => {
    mumbai.lng = position.coords.longitude;
    mumbai.lat = position.coords.latitude;
  });

  useEffect(() => {
    if (map.current) return;
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [mumbai.lng, mumbai.lat],
      zoom: zoom,
    });

    // show legends in map
    map.current.on("load", () => {
      const targets = {
        Residential: "Residential",
        Water: "Water",
        Building: "Building",
        Airport: "Airport",
        "Other POI": "Pois",
      };
      const options = {
        showDefault: true,
        showCheckbox: true,
        onlyRendered: false,
        reverseOrder: true,
      };
      const legendControl = new MaplibreLegendControl(targets, options);
      map.current.addControl(legendControl, "bottom-left");
    });

    ///////////////////////////////////////////////////

    const popup = new maptilersdk.Popup({ offset: 25 }).setText(
      "You are here."
    );

    // searching in map
    const marker = new maptilersdk.Marker()
      .setLngLat([mumbai.lng, mumbai.lat])
      .setPopup(popup)
      .addTo(map.current);

    setMapController(createMapLibreGlMapController(map.current, maptilersdk));
    ///////////////////////////////////////////////////
    // return () => {
    //   if (map.current) map.current.remove(); // Clean up map instance on component unmount
    // };
  }, [mumbai.lng, mumbai.lat, zoom]);

  const changeStyle = (e) => {
    if (!map.current) return; // Ensure map is initialized

    const styleCode = e.target.value.split(".");
    const newStyle =
      styleCode.length === 2
        ? maptilersdk.MapStyle[styleCode[0]][styleCode[1]]
        : maptilersdk.MapStyle[styleCode[0]] || e.target.value;

    map.current.setStyle(newStyle);
  };

  return (
    <div className="map-wrap">
      <div className="geocoding">
        {mapController && (
          <GeocodingControl
            apiKey="gioXKdvRiQckRM3wwGOS"
            mapController={mapController}
          />
        )}
      </div>
      <select class="mapstyles-select" onChange={changeStyle}>
        <optgroup label="Navigation and city exploration">
          <option value="STREETS">STREETS</option>
          <option value="STREETS.DARK" selected>
            STREETS.DARK
          </option>
          <option value="STREETS.LIGHT">STREETS.LIGHT</option>
          <option value="STREETS.PASTEL">STREETS.PASTEL</option>
        </optgroup>
        <option value="OUTDOOR">OUTDOOR</option>
        <option value="WINTER">WINTER</option>
        <option value="SATELLITE">SATELLITE</option>
        <option value="HYBRID">HYBRID</option>
        <optgroup label="Data visualization">
          <option value="DATAVIZ">DATAVIZ</option>
          <option value="DATAVIZ.DARK">DATAVIZ.DARK</option>
          <option value="DATAVIZ.LIGHT">DATAVIZ.LIGHT</option>
        </optgroup>
        <option value="e4e704fd-bdaa-4a54-a6d5-50f1b07d9d68">Coffee</option>
        <option value="f38285f4-f75f-486a-9127-0cc7a7358ae6">Beer</option>
      </select>
      <div ref={mapContainer} className="map"></div>
    </div>
  );
};
