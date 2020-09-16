import { Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import Button from "../../components/Button/Button";
import TestImage from "../../assets/photo.jpeg";
import Images from "../../components/Image/Image";
import { HeaderBackButton } from "@react-navigation/stack";

export default function ModalScreen({ navigation }) {
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
	const [fact, setFact] = useState("");

	const getCatFact = () => {
		fetch("https://cat-fact.herokuapp.com/facts/random?animal_type=cat")
			.then((res) => res.json())
			.then((res) => {
				setFact(res.text);
			});
	};
	return (
		<ScrollView>
			<View style={styles.wrapper}>
				<Images source={TestImage} />
				<View style={styles.textWrapper}>
					<Text style={styles.title}>Random Cat Fact!!</Text>
					<Text style={styles.text}>{fact}</Text>
					<Button
						onPress={() => getCatFact()}
						text="Press for fact"
					/>
				</View>
			</View>
		</ScrollView>
	);
}
