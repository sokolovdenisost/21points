import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import store from './src/store/index';

import { boostrap } from './src/boostrap';
import { Application } from './src/index';

export default function App() {
    const [isReady, setIsReady] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    if (!isReady) {
        return (
            <AppLoading
                startAsync={boostrap}
                onFinish={() => setIsReady(true)}
                onError={(err) => console.log(err)}
            />
        );
    }

    return (
        <Provider store={store}>
            <Application />
        </Provider>
    );
}
