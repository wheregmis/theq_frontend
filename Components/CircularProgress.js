import React, { useState, useEffect } from "react";
import { View, Animated } from "react-native";
import { Circle, G, Svg } from "react-native-svg";

const CircularProgress = () => {
  const [spinValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg height="50" width="50" viewBox="0 0 32 32">
          <G transform="translate(16,16) rotate(-90)">
            <Circle
              cx="0"
              cy="0"
              r="12"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              strokeOpacity="0.2"
              stroke="white"
            />
            <Circle
              cx="0"
              cy="0"
              r="12"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              stroke="white"
              strokeDasharray="18.85 37.7" // You may need to adjust these values for different stroke widths and circle sizes
            />
          </G>
        </Svg>
      </Animated.View>
    </View>
  );
};

export default CircularProgress;
