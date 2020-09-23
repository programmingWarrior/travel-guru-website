import React, { useState } from 'react';
import HotelFakeData from '../HotelFakeData/HotelFakeData';
import './hotel.css';


const Hotel = () => {
    const [Hotel, setHotel] = useState(HotelFakeData);

    return (
        <div>
            <div>
                <h5 style={{color:'tomato', fontWeight:'bold'}}>252 stays Apr 13-17 3guests </h5>
                <h3 style={{color:'purple'}}>Stay in COX'S BAZAR</h3>
                {Hotel.map(hotel =>

                    <div className="card mb-3" style={{ maxWidth: "1300px",border: "4px solid purple", margin:"20px"}}>
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img src={hotel.HotelImg} className="card-img" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title"> {hotel.HotelName}</h5>
                                    <p className="card-text">{hotel.HotelBody}</p>
                                    <p className="card-text">Price: ${hotel.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div>
                {/* <GoogleMap></GoogleMap> */}
                {/* <Grid item xs={12} md={6}>
                <GoogleMap></GoogleMap>
                <GoogleMap></GoogleMap>
               </Grid> */}
            </div>
        </div>
    );
};

export default Hotel;