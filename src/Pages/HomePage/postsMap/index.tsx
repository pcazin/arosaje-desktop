import React from "react";
import { PostProps } from "../../../shared/PostProps";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import PlanteService from "../../../services/PlanteService";
import { useNavigate } from "react-router-dom";

interface PostsMapProps {
    posts: PostProps[];
}

let DefaultIcon = L.icon({
    iconUrl: icon,
    iconSize: [25, 41],
    iconAnchor: [12,41],
    popupAnchor: [0, -20],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function PostsMap({ posts }: PostsMapProps) {

  const navigate = useNavigate()

  const handlePopupButtonClick = (post: PostProps) => {
    navigate(`/plant/${post.id}`)
  }

    const markers = posts.map((post) => {
        return (
            <Marker position={[Number(post.latitude), Number(post.longitude)]}>
                <Popup>
                    {post.user.username}
                    <button onClick={() => handlePopupButtonClick(post)}>voir la plante</button>
                </Popup>
            </Marker>
        );
    });

    return (
        <MapContainer
            center={[46.227638, 2.213749]}
            zoom={5}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers}
        </MapContainer>
    );
}


