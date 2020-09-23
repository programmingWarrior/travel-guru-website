import React, { useContext } from 'react';
import { UserContext } from '../../App';

const UserProfile = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            <h1>Hello : {loggedInUser.name}</h1>
        </div>
    );
};

export default UserProfile;