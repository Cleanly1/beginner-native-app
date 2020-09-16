import { Text, View, ScrollView } from "react-native";
import React, { useEffect } from "react";
import styles from "./styles";
import TestImage from "../../assets/photo.jpeg";
import Images from "../../components/Image/Image";
import { HeaderBackButton } from "@react-navigation/stack";

export default function AboutScreen({ navigation }) {
	useEffect(() => {
		navigation.setOptions({
			headerLeft:
				Platform.OS === "ios"
					? () => (
							<HeaderBackButton
								onPress={() => {
									navigation.goBack();
								}}
							></HeaderBackButton>
					  )
					: null,
		});
	});
	return (
		<ScrollView>
			<View style={styles.wrapper}>
				<Images source={TestImage} />
				<View style={styles.textWrapper}>
					<Text style={styles.text}>This Is The Story About Us</Text>
					<Text>This is an very simple app</Text>
				</View>
			</View>
		</ScrollView>
	);
}
