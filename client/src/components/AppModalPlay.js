import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Modal,
    Dimensions,
    Button,
    LayoutAnimation,
    Alert,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { AppTextInput } from './ui/AppTextInput';
import { AppButton } from './ui/AppButton';
import { AppPlayTable } from './AppPlayTable';
import { THEME } from '../theme';
import { cards, cardsBlack } from '../cards';
import { saveGame } from '../store/actions/game';
import { refresh } from '../store/actions/user';

export const AppModalPlay = ({ modalVisible, setModalVisible }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const selectDesk = useSelector((state) => state.user.selectDesk);
    const desk = selectDesk === 'STANDARD BLACK' ? cardsBlack : cards;

    const [player, setPlayer] = useState({
        bet: 0,
        money: user.money,
        cardsPlayer: [],
        count: 0,
    });

    const [game, setGame] = useState({
        result: '',
        bet: 0,
        countEnemy: 0,
        countPlayer: 0,
        raiting: 0,
        ready: false,
    });

    const [bet, setBet] = useState(false);
    const [play, setPlay] = useState(false);

    const [enemy, setEnemy] = useState({
        cardsEnemy: [],
        count: 0,
    });

    const [focus, setFocus] = useState(false);
    const isLoadingGame = useSelector((state) => state.game.isLoadingGame);

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    const onFocusHandler = () => {
        LayoutAnimation.spring();
        setFocus(true);
    };

    const onEndFocus = () => {
        LayoutAnimation.spring();
        setFocus(false);
    };

    const getCard = () => {
        const randomCardPlayer = desk[getRandomInt(desk.length)];
        if (player.count + randomCardPlayer.count === 21 && player.cardsPlayer.length == 2) {
            setPlayer({
                ...player,
                cardsPlayer: [...player.cardsPlayer, randomCardPlayer],
                count: +player.count + +randomCardPlayer.count,
                money: user.money,
            });
            setTimeout(async () => {
                Alert.alert('Выиграли', '', [
                    {
                        text: 'Понятно',
                        onPress: () => setBet(false),
                    },
                ]);
                game.result = 'win';
                game.bet = player.bet;
                game.countPlayer = +player.count + +randomCardPlayer.count;
                game.countEnemy = enemy.count;
                game.raiting = getRandomInt(50);
                game.ready = true;

                player.money = +user.money + +game.bet;

                await saveGameHandler();
            }, 1000);
        } else if (player.count + randomCardPlayer.count <= 21) {
            setPlayer({
                ...player,
                cardsPlayer: [...player.cardsPlayer, randomCardPlayer],
                count: +player.count + +randomCardPlayer.count,
                money: user.money,
            });
            setPlay(true);
        } else {
            setPlayer({
                ...player,
                cardsPlayer: [...player.cardsPlayer, randomCardPlayer],
                count: +player.count + +randomCardPlayer.count,
                money: user.money,
            });
            setTimeout(async () => {
                Alert.alert('Проиграли', '', [
                    {
                        text: 'Понятно',
                        onPress: () => setBet(false),
                    },
                ]);
                game.result = 'lose';
                game.bet = player.bet;
                game.countPlayer = +player.count + +randomCardPlayer.count;
                game.countEnemy = enemy.count;
                game.raiting = getRandomInt(25);
                game.ready = true;

                player.money = +user.money - +game.bet;

                await saveGameHandler();
            }, 1000);
        }
    };

    const stopGame = async () => {
        const array = enemy.cardsEnemy;
        const arrayNumbers = [];

        for (let i = 0; i < player.cardsPlayer.length - 1; i++) {
            const card = desk[getRandomInt(desk.length)];
            array.push(card);
        }

        array.forEach((e) => arrayNumbers.push(e.count));
        const counts = arrayNumbers.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);

        setEnemy({
            count: counts,
            cardsEnemy: [...enemy.cardsEnemy, array],
        });

        enemy.count = counts;
        setTimeout(async () => {
            if (player.count > enemy.count && player.count <= 21) {
                Alert.alert('Выиграли', '', [
                    {
                        text: 'Понятно',
                        onPress: () => setBet(false),
                    },
                ]);
                game.result = 'win';
                game.bet = player.bet;
                game.countPlayer = player.count;
                game.countEnemy = enemy.count;
                game.raiting = getRandomInt(50);
                game.ready = true;

                player.money = +user.money + +game.bet;

                await saveGameHandler();
            } else if (player.count === enemy.count && player.count <= 21) {
                Alert.alert('Ничья', '', [
                    {
                        text: 'Понятно',
                        onPress: () => setBet(false),
                    },
                ]);
                game.result = 'draw';
                game.bet = player.bet;
                game.countPlayer = player.count;
                game.countEnemy = enemy.count;
                game.raiting = 0;
                game.ready = true;
                await saveGameHandler();
            } else if (player.count < enemy.count && enemy.count <= 21) {
                Alert.alert('Проиграли', '', [
                    {
                        text: 'Понятно',
                        onPress: () => setBet(false),
                    },
                ]);
                game.result = 'lose';
                game.bet = player.bet;
                game.countPlayer = player.count;
                game.countEnemy = enemy.count;
                game.raiting = getRandomInt(25);
                game.ready = true;

                player.money = +user.money - +game.bet;

                await saveGameHandler();
            } else if (player.count < enemy.count && enemy.count > 21) {
                Alert.alert('Выиграли', '', [
                    {
                        text: 'Понятно',
                        onPress: () => setBet(false),
                    },
                ]);
                game.result = 'win';
                game.bet = player.bet;
                game.countPlayer = player.count;
                game.countEnemy = enemy.count;
                game.raiting = getRandomInt(50);
                game.ready = true;

                player.money = +user.money + +game.bet;

                await saveGameHandler();
            }
        }, 1000);
    };

    const saveGameHandler = async () => {
        if (game.ready) {
            dispatch(saveGame(game));

            setPlayer({
                bet: 0,
                cardsPlayer: [],
                count: 0,
                money: player.money,
            });

            setEnemy({
                cardsEnemy: [],
                count: 0,
            });

            setPlay(false);
            setBet(false);

            if (isLoadingGame) {
                setGame({});
                refreshHandler();
            }
        }
    };

    const refreshHandler = () => {
        dispatch(refresh());
    };

    const playHandler = () => {
        const randomCardPlayer = desk[getRandomInt(desk.length)];
        const randomCardEnemy = desk[getRandomInt(desk.length)];

        if (!+player.bet) {
            Alert.alert('Ошибка', 'Поставьте ставку!');
        } else if (+player.bet <= +player.money) {
            setPlayer({
                ...player,
                cardsPlayer: [randomCardPlayer],
                count: randomCardPlayer.count,
                money: +player.money - +player.bet,
            });
            setEnemy({
                cardsEnemy: [randomCardEnemy],
                count: randomCardEnemy.count,
            });
            setBet(true);
            onEndFocus();
        } else if (+player.bet >= +player.money) {
            Alert.alert('Ошибка', 'Недостаточно средств!');
        }
    };

    const closeBet = () => {
        setBet(false);
        setPlayer({
            ...player,
            bet: 0,
            money: +player.money + +player.bet,
            cardsPlayer: [],
            count: 0,
        });
    };

    const style = {
        marginTop: focus ? -200 : 0,
        paddingTop: focus ? 20 : 0,
    };

    console.log(Dimensions.get('window').height);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.screen}>
                        <View style={styles.goBack}>
                            <Button
                                title="Назад"
                                disabled={bet}
                                color={THEME.MAIN_COLOR}
                                onPress={() => setModalVisible(!modalVisible)}
                            />
                        </View>
                        {bet ? (
                            <View style={styles.playDesk}>
                                <AppPlayTable
                                    player="Диллер"
                                    count={enemy.count}
                                    cards={enemy.cardsEnemy}
                                />
                                <AppPlayTable
                                    player={user.login}
                                    count={player.count}
                                    cards={player.cardsPlayer}
                                />
                            </View>
                        ) : (
                            <Image
                                style={styles.image}
                                source={require('../../assets/images/main_logo.png')}
                            />
                        )}
                        <View style={{ ...styles.buttons, ...style }}>
                            {bet ? (
                                <>
                                    <View style={styles.buttonsPlay}>
                                        <AppButton
                                            style={styles.buttonPlay}
                                            styleButton={styles.buttonPlay}
                                            title="Взять"
                                            onPress={getCard}
                                        />
                                        <AppButton
                                            style={styles.buttonPlay}
                                            styleButton={styles.buttonPlay}
                                            title="Стоп"
                                            onPress={stopGame}
                                        />
                                    </View>
                                    <AppButton
                                        title="Отменить ставку"
                                        style={styles.closeBet}
                                        styleButton={styles.closeBet}
                                        onPress={closeBet}
                                        disabled={play}
                                    />
                                </>
                            ) : null}
                            {!bet ? (
                                <View style={styles.betBlock}>
                                    <AppTextInput
                                        type="numeric"
                                        name="bet"
                                        title="Ставка"
                                        onEndEditing={onEndFocus}
                                        onFocus={onFocusHandler}
                                        styleInput={styles.betInput}
                                        form={player}
                                        setForm={setPlayer}
                                    />
                                    <AppButton
                                        title="Сделать ставку"
                                        style={styles.buttonPlay}
                                        styleButton={styles.buttonPlay}
                                        onPress={playHandler}
                                    />
                                </View>
                            ) : null}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
    buttonsPlay: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Dimensions.get('window').width - 15,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    buttonPlay: {
        width: Dimensions.get('window').width - 20,
        paddingVertical: Dimensions.get('window').height <= 600 ? 2 : 5,
        fontSize: Dimensions.get('window').height <= 600 ? 18 : 20,
        marginBottom: 5,
        paddingLeft: 'auto',
        paddingRight: 'auto',
        borderRadius: 5,
    },
    betBlock: {
        width: Dimensions.get('window').width - 15,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    betInput: {
        width: Dimensions.get('window').width - 20,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 5,
        fontSize: 20,
        marginBottom: 10,
    },
    closeBet: {
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        paddingVertical: Dimensions.get('window').height <= 600 ? 2 : 5,
        fontSize: Dimensions.get('window').height <= 600 ? 18 : 20,
        width: Dimensions.get('window').width - 20,
        marginBottom: 5,
        paddingLeft: 'auto',
        paddingRight: 'auto',
    },
    buttons: {
        flex: 2,
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: 'flex-end',
        width: '100%',
    },
    image: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 25,
        width: 200,
        height: 200,
    },
});
