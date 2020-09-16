import { Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import Button from "../../components/Button/Button";
import TestImage from "../../assets/photo.jpeg";
import Images from "../../components/Image/Image";

export default function HomeScreen({ navigation }) {
	const [quote, setQuote] = useState("");

	useEffect(() => {
		getQuote();
	}, []);

	const getQuote = () => {
		fetch("https://api.kanye.rest")
			.then((res) => res.json())
			.then((res) => {
				setQuote(res.quote);
			});
	};

	return (
		<ScrollView>
			<View style={styles.wrapper}>
				<Images source={TestImage} />
				<View style={styles.textWrapper}>
					<Text style={styles.text}>Inspiring Quotes from Kanye</Text>
					<Text style={styles.quoteText}>{quote}</Text>
					<Button
						onPress={() => {
							getQuote();
						}}
						text="New Quote"
					/>
				</View>
				<Button
					style={styles.navButton}
					onPress={() => navigation.navigate("About")}
					text="To About US"
				/>
				<Button
					style={styles.navButton}
					onPress={() => navigation.navigate("Cat Fact")}
					text="To Cat Facts"
				/>
			</View>
		</ScrollView>
	);
}
