import React, { useContext } from 'react';
import { UserContext } from '../../App';

const UserProfile = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            <h1> Welcome to Our Website <img src={loggedInUser.img} alt=""/> {loggedInUser.name}</h1>
        </div>
    );
};

export default UserProfile;