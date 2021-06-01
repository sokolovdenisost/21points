import React, { useState, useEffect } from 'react';

export const useAuth = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch('http://192.168.0.21:3001/auth/check-auth')
            .then((res) => res.json())
            .then((res) => {
                setUser(res);
            });
    }, []);

    if (user.login) {
        return user;
    }

    return false;
};
