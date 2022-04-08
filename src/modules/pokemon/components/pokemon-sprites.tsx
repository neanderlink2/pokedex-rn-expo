/*
Inspiration: https://dribbble.com/shots/3894781-Urbanears-Headphones
Twitter: http://twitter.com/mironcatalin
GitHub: http://github.com/catalinmiron
Video Tutorial: https://youtu.be/cGTD4yYgEHc
Link to example: https://github.com/catalinmiron/react-native-headphones-carousel
*/

import React from 'react';
import {
    Animated, Dimensions, StyleSheet,
    Text,
    View
} from 'react-native';
import PagerView, { PagerViewOnPageScrollEventData } from 'react-native-pager-view';

type SpritesData = {
    type: string;
    imageUri: string;
    key: string;
    color: string
}

type PokemonSpritesProps = {
    data: SpritesData[]
}

const { width, height } = Dimensions.get('window');
const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;
const DOT_SIZE = 40;
const TICKER_HEIGHT = 40;
const CIRCLE_SIZE = width * 0.7;

const Circle = ({
    data,
    scrollOffsetAnimatedValue,
}: {
    data: SpritesData[]
    scrollOffsetAnimatedValue: Animated.Value;
}) => {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
            {data.map(({ color }, index) => {
                const inputRange = [0, 0.5, 0.99];
                const inputRangeOpacity = [0, 0.5, 0.99];
                const scale = scrollOffsetAnimatedValue.interpolate({
                    inputRange,
                    outputRange: [1, 0, 1],
                    extrapolate: 'clamp',
                });

                const opacity = scrollOffsetAnimatedValue.interpolate({
                    inputRange: inputRangeOpacity,
                    outputRange: [0.2, 0, 0.2],
                });

                return (
                    <Animated.View
                        key={index}
                        style={[
                            styles.circle,
                            {
                                backgroundColor: color,
                                opacity,
                                transform: [{ scale }],
                            },
                        ]}
                    />
                );
            })}
        </View>
    );
};

const Ticker = ({
    data,
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
}: {
    data: SpritesData[]
    scrollOffsetAnimatedValue: Animated.Value;
    positionAnimatedValue: Animated.Value;
}) => {
    const inputRange = [0, data.length];
    const translateY = Animated.add(
        scrollOffsetAnimatedValue,
        positionAnimatedValue
    ).interpolate({
        inputRange,
        outputRange: [0, data.length * -TICKER_HEIGHT],
    });
    return (
        <View style={styles.tickerContainer}>
            <Animated.View style={{ transform: [{ translateY }] }}>
                {data.map(({ type }, index) => {
                    return (
                        <Text key={index} style={styles.tickerText}>
                            {type}
                        </Text>
                    );
                })}
            </Animated.View>
        </View>
    );
};

const Item = ({
    imageUri,
    heading,
    description,
    scrollOffsetAnimatedValue,
}: {
    imageUri: string;
    description: string;
    heading: string;
    scrollOffsetAnimatedValue: Animated.Value;
    positionAnimatedValue: Animated.Value;
}) => {
    const inputRange = [0, 0.5, 0.99];
    const inputRangeOpacity = [0, 0.5, 0.99];
    const scale = scrollOffsetAnimatedValue.interpolate({
        inputRange,
        outputRange: [1, 0, 1],
    });

    const opacity = scrollOffsetAnimatedValue.interpolate({
        inputRange: inputRangeOpacity,
        outputRange: [1, 0, 1],
    });

    return (
        <View style={styles.itemStyle}>
            <Animated.Image
                source={{ uri: imageUri }}
                style={[
                    styles.imageStyle,
                    {
                        transform: [{ scale }],
                    },
                ]}
            />
            <View style={styles.textContainer}>
                <Animated.Text
                    style={[
                        styles.heading,
                        {
                            opacity,
                        },
                    ]}
                >
                    {heading}
                </Animated.Text>
                <Animated.Text
                    style={[
                        styles.description,
                        {
                            opacity,
                        },
                    ]}
                >
                    {description}
                </Animated.Text>
            </View>
        </View>
    );
};

const Pagination = ({
    data,
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
}: {
    data: SpritesData[]
    scrollOffsetAnimatedValue: Animated.Value;
    positionAnimatedValue: Animated.Value;
}) => {
    const inputRange = [0, data.length];
    const translateX = Animated.add(
        scrollOffsetAnimatedValue,
        positionAnimatedValue
    ).interpolate({
        inputRange,
        outputRange: [0, data.length * DOT_SIZE],
    });

    return (
        <View style={[styles.pagination]}>
            <Animated.View
                style={[
                    styles.paginationIndicator,
                    {
                        position: 'absolute',
                        transform: [{ translateX: translateX }],
                    },
                ]}
            />
            {data.map((item) => {
                return (
                    <View key={item.key} style={styles.paginationDotContainer}>
                        <View
                            style={[styles.paginationDot, { backgroundColor: item.color }]}
                        />
                    </View>
                );
            })}
        </View>
    );
};

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export default function PokemonSprites({
    data
}: PokemonSpritesProps) {
    const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
    const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.container}>
            <Circle data={data} scrollOffsetAnimatedValue={scrollOffsetAnimatedValue} />
            <AnimatedPagerView
                initialPage={0}
                style={{ width: '100%', height: '100%' }}
                onPageScroll={Animated.event<PagerViewOnPageScrollEventData>(
                    [
                        {
                            nativeEvent: {
                                offset: scrollOffsetAnimatedValue,
                                position: positionAnimatedValue,
                            },
                        },
                    ],
                    {
                        listener: ({ nativeEvent: { offset, position } }) => {
                            console.log(`Position: ${position} Offset: ${offset}`);
                        },
                        useNativeDriver: true,
                    }
                )}
            >
                {data.map((item, index) => (
                    <View collapsable={false} key={index}>
                        <Item
                            {...item}
                            scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
                            positionAnimatedValue={positionAnimatedValue}
                        />
                    </View>
                ))}
            </AnimatedPagerView>
            <Pagination
                data={data}
                scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
                positionAnimatedValue={positionAnimatedValue}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemStyle: {
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        width: width * 0.65,
        height: width * 0.75,
        resizeMode: 'contain',
        flex: 1,
    },
    textContainer: {
        alignItems: 'flex-start',
        alignSelf: 'flex-end',
        flex: 0.5,
    },
    heading: {
        color: '#444',
        textTransform: 'uppercase',
        fontSize: 24,
        fontWeight: '800',
        letterSpacing: 2,
        marginBottom: 5,
    },
    description: {
        color: '#ccc',
        fontWeight: '600',
        textAlign: 'left',
        width: width * 0.75,
        marginRight: 10,
        fontSize: 16,
        lineHeight: 16 * 1.5,
    },
    logo: {
        opacity: 0.9,
        height: LOGO_HEIGHT,
        width: LOGO_WIDTH,
        resizeMode: 'contain',
        position: 'absolute',
        left: 10,
        bottom: 10,
        transform: [
            { translateX: -LOGO_WIDTH / 2 },
            { translateY: -LOGO_HEIGHT / 2 },
            { rotateZ: '-90deg' },
            { translateX: LOGO_WIDTH / 2 },
            { translateY: LOGO_HEIGHT / 2 },
        ],
    },
    pagination: {
        position: 'absolute',
        right: 20,
        bottom: 40,
        flexDirection: 'row',
        height: DOT_SIZE,
    },
    paginationDot: {
        width: DOT_SIZE * 0.3,
        height: DOT_SIZE * 0.3,
        borderRadius: DOT_SIZE * 0.15,
    },
    paginationDotContainer: {
        width: DOT_SIZE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paginationIndicator: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    tickerContainer: {
        position: 'absolute',
        top: 40,
        left: 20,
        overflow: 'hidden',
        height: TICKER_HEIGHT,
    },
    tickerText: {
        fontSize: TICKER_HEIGHT,
        lineHeight: TICKER_HEIGHT,
        textTransform: 'uppercase',
        fontWeight: '800',
    },

    circleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        position: 'absolute',
        top: '15%',
    },
});