import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import { AppPlayHistory } from '../components/ui/AppPlayHistory';
import { THEME } from '../theme';

export const HistoryScreen = ({ navigation }) => {
    const games = useSelector((state) => state.user.user.games);

    useEffect(() => {
        console.log(games);
    }, [games]);

    const mapToTop = games
        .map((g) => {
            return (
                <AppPlayHistory
                    type={g.gameId.result}
                    countPlayer={g.gameId.countPlayer}
                    countEnemy={g.gameId.countEnemy}
                    bet={g.gameId.bet}
                    raiting={g.gameId.raiting}
                    key={g._id}
                />
            );
        })
        .reverse();

    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.screen}>
                <View style={styles.history}>
                    {games.length ? mapToTop : <Text>Ни одной игры пока не сыграно!</Text>}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: THEME.MAIN_COLOR,
    },
    screen: {
        flex: 1,
        backgroundColor: THEME.MAIN_COLOR,
    },
    history: {
        marginTop: 20,
        alignItems: 'center',
    },
});
