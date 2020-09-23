import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import travelData from '../../fakeData/fakeData';
import DetailsItem from '../DetailsItem/DetailsItem';
import './Home.css'

const Home = () => {

    const [travel, setTravel] = useState(travelData);

    const [item, setItem] = useState([]);
    const handle = (travelItem) => {
        setItem(travelItem);
    }


    return (
        <div className="backgroundImage d-flex bd-highlight mb-3 align-items-center">
            <div style={{ width: '130%', color: 'white',margin:'7%' }} className="mr-auto p-2 bd-highlight">

                <h1 className="TravelTitle">{item.TravelTitle}</h1>
                <p>{item.TravelBody}</p>
                <Link to={`/DetailsItem/${item.id}`}><button className="iteBtn">{item.TravelTitle}</button></Link>

            </div>

            <div className="ml-auto p-2 bd-highlight travelItem">
                {travel.map(travelItem =>
                    <img className="image" onClick={() => handle(travelItem)} onLoad={() => handle(travelItem)} src={travelItem.img} alt="" />
                )}
            </div>

        </div>
    );
};

export default Home;