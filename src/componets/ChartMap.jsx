import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

function ChartMap() {
  // coordinates
  const position = [52.51, 13.38];

  // custom marker ---
  const customIcon = new Icon({
    iconUrl: require("../assets/locationIcon.svg"),
    iconRetinaUrl: require("../assets/locationIcon.svg"),
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [40, 40],
    className: "leaflet-venue-icon",
  });
  return (
    <section className="map-component">
      <div className="map">
        <MapContainer center={position} zoom={15} scrollWheelZoom={true}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
            // --- (7) Alternative map style (attribution and url copied from the leaflet extras website) ---
           // attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            ///attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // --- (7) Alternative map style (attribution and url copied from the leaflet extras website) ---
            // attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            //  url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            //   --- -------------------------------------------------------------------------------------- ---
          />
          <Marker position={position} icon={customIcon}>
            <Popup>Clínica Copiapó</Popup>
          </Marker>
        </MapContainer>
        {/* --- ---------------------------- --- */}
      </div>
    </section>
  );
}
export default ChartMap;
