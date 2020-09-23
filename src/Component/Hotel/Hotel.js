import React, { useState } from 'react';
import HotelFakeData from '../HotelFakeData/HotelFakeData';


const Hotel = () => {
    const [Hotel, setHotel] = useState(HotelFakeData);

    return (
        <div style={{ width: '60%' }}>
            <div>
                <small>252 stays Apr 13-17 3guests</small><br/>
                <b>Stay in COX'S BAZAR</b>
                {Hotel.map(hotel =>

                    <div className="card mb-3" style={{ maxWidth: "1300px" }}>
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img src={hotel.HotelImg} className="card-img" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title"> {hotel.HotelName}</h5>
                                    <p className="card-text">{hotel.HotelBody}</p>
                                    <p className="card-text">Price: $<small className="text-muted">{hotel.price}</small></p>
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