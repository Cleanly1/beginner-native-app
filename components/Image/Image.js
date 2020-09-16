import { Image, View } from "react-native";
import React from "react";
import styles from "./styles";

const Images = ({ source }) => {
	return (
		<View style={styles.imgWrapper}>
			<Image style={styles.image} source={source} />
		</View>
	);
};

export default Images;
