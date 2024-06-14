import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as MySvg } from "../utils/svgs/mas.svg";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import "./src/utils/svgs/mas.svg"; // Assuming this file might still contain other necessary custom styles

function MapView() {
  const [visibility, setVisibility] = useState({
    Masjid_to_St_x5F_patricks: false,
    Masjid_to_CDGK_Parking_Plaza: false,
    Masjid_to_Noman_Square: false,
    Masjid_to_Church_Parking: false,
    Masjid_to_Toilet: false,
    Masjid_to_Toilet_2: false,
    Masjid_to_Lucky_Star: false,
    Masjid_to_KPI: false,
  });

  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    Object.entries(visibility).forEach(([key, visible]) => {
      const element = svg.getElementById(key);
      if (element) {
        element.setAttribute("class", visible ? "shown" : "hidden");
      }
    });
  }, [visibility]);

  const toggleVisibility = (id) => {
    setVisibility((prev) => {
      const newState = {};
      Object.keys(prev).forEach((key) => {
        newState[key] = false; // Turn off all toggles
      });
      newState[id] = !prev[id]; // Toggle the clicked one
      return newState;
    });
  };

  return (
    <div className="container text-center my-3">
      <MySvg ref={svgRef} className="map mb-3" />
      <div className="d-flex flex-wrap justify-content-center">
        {Object.keys(visibility).map((key) => (
          <div key={key} className="form-check form-switch m-2">
            <input
              className="form-check-input"
              type="checkbox"
              id={key}
              checked={visibility[key]}
              onChange={() => toggleVisibility(key)}
            />
            <label className="form-check-label" htmlFor={key}>
              Toggle {key.replace(/_/g, " ")}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MapView;
