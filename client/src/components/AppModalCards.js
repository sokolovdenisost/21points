import React from 'react';
import { View, StyleSheet, Text, Modal, Button, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { THEME } from '../theme';
import { AppCard } from './ui/AppCard';
import { all_desks } from '../cards';
import { changeDesk } from '../store/actions/user';

export const AppModalCards = ({ setModalVisible, modalVisible }) => {
    const dispatch = useDispatch();
    const userDesks = useSelector((state) => state.user.user.desks);
    const user = useSelector((state) => state.user.user);
    const selectDesk = useSelector((state) => state.user.selectDesk);
    const select = selectDesk ? selectDesk : user.selectDesk;

    const getImageForTitle = (title) => {
        const desk = all_desks.filter((d) => d.title === title);

        return desk;
    };

    // const checkSelectDesk = (title) => {
    //     if (user.selectDesk === title) {
    //         return true;
    //     }

    //     return false;
    // };

    const mapDesks = userDesks.map((d) => {
        const check = getImageForTitle(d.desk);
        if (check.length !== 0) {
            if (select === check[0].title) {
                return (
                    <AppCard
                        onPress={() => dispatch(changeDesk(check[0].title))}
                        select={true}
                        title={check[0].title}
                        image={check[0].image}
                        key={check[0].title}
                    />
                );
            }
            return (
                <AppCard
                    onPress={() => dispatch(changeDesk(check[0].title))}
                    select={false}
                    title={check[0].title}
                    image={check[0].image}
                    key={check[0].title}
                />
            );
        }
    });

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.screen}>
                <View style={styles.goBack}>
                    <Button
                        title="Назад"
                        color={THEME.MAIN_COLOR}
                        onPress={() => setModalVisible(!modalVisible)}
                    />
                </View>
                <ScrollView>
                    <View style={styles.cards}>
                        {mapDesks}
                        {/* <AppCard
                            title="STANDARD"
                            image={require('../../assets/images/standard-image.png')}
                        />
                        <AppCard
                            title="STANDARD BLACK"
                            image={getImageForTitle('STANDARD BLACK')}
                        /> */}
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    goBack: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 10,
        paddingTop: 15,
        paddingLeft: 10,
        fontSize: 16,
        fontFamily: 'roboto-medium',
    },
    cards: {
        alignItems: 'center',
        marginTop: 20,
    },
});
