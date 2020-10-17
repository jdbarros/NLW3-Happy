import React, {useEffect, useState} from  'react';

import mapMarkerImg from '../images/map-logo.svg';
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import '../styles/s.pages/orphanages-map.css'

import 'leaflet/dist/leaflet.css'
import api from '../services/api';
import { Link } from 'react-router-dom';


const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,

    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
});


interface Orphanage {
    id:number;
    latitude:number;
    longitude:number;
    name:string;
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
   
    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    }, []);

    return (
    <div id="page-map">
        <aside>
            <header>
                <img src={mapMarkerImg}alt="Happy"/>
                <h2>Ecolha um orfanato no mapa</h2>
                <p>Muitas crianças estão esperando a sua visita :)</p>
            </header>

            <footer>
                <strong>Fortaleza</strong>
                <span>Ceará</span>
            </footer>

            
        </aside>

        <Map 
            center={[-3.7406727, -38.5156358]}
            zoom={15}
            style={{ width: '100%', height: '100%' }}
        >

            {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}/.png"/> */}
            <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>

            {orphanages.map(orphanage => (
                    <Marker
                        key={orphanage.id}
                        icon={mapIcon}
                        position={[orphanage.latitude, orphanage.longitude]}
                    
                    >

                        <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                            {orphanage.name}
                            <Link to={`/orphanages/${orphanage.id}`}>
                                <FiArrowRight size={20} color="#fff" />
                            </Link>

                        </Popup>
                    </Marker>

                )
            )}
        

        </Map>           
        

        <Link to="/orphanages/create" className="create-orphanage">
            <FiPlus size={32} color="#fff" />
        </Link>
    </div>
        
    );
}

export default OrphanagesMap;