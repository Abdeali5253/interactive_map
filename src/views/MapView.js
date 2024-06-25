import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import "../utils/styling/MapView.css"; // Assuming this file might still contain other necessary custom styles

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

  const [isLoaded, setIsLoaded] = useState(false);
  const objectRef = useRef(null);

  useEffect(() => {
    const svgObject = objectRef.current;
    if (!svgObject) return;

    const onLoad = () => {
      setIsLoaded(true);
    };

    svgObject.addEventListener("load", onLoad);
    return () => {
      svgObject.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const svgObject = objectRef.current;
    const svgDocument = svgObject.contentDocument;
    if (!svgDocument) {
      console.error('SVG document could not be accessed');
      return;
    }

    Object.entries(visibility).forEach(([key, visible]) => {
      const element = svgDocument.getElementById(key);
      if (element) {
        element.style.display = visible ? "block" : "none";
      }
    });
  }, [visibility, isLoaded]);

  const toggleVisibility = (id) => {
    setVisibility((prev) => {
      const newState = {};
      Object.keys(prev).forEach((key) => {
        newState[key] = key === id ? !prev[id] : false;
      });
      return newState;
    });
  };

  return (
    <div className="container text-center my-3">
      <object
        ref={objectRef}
        type="image/svg+xml"
        data="/mas.svg"
        className="map mb-3"
      />
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