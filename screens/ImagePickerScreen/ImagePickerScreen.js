import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { API_KEY } from "@env";

import { Text, View, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import TestImage from "../../assets/photo.jpeg";
import Images from "../../components/Image/Image";
import { HeaderBackButton } from "@react-navigation/stack";
import Button from "../../components/Button/Button";

export default function ImagePickerScreen({ navigation }) {
	const [response, setResponse] = useState(null);
	const [loadMessage, setLoadMessage] = useState("Pick an image");
	const [image, setImage] = useState(null);

	const handleClick = async () => {
		let result = await ImagePicker.requestCameraRollPermissionsAsync();

		if (result.granted === false) {
			alert("Need permisson to Camera Roll for this to work");
			return;
		}
		const options = { base64: true };

		let pickedImage = await ImagePicker.launchImageLibraryAsync(options);

		if (pickedImage.cancelled === true) {
			return;
		}

		setImage(pickedImage);
		callGoogleApi(pickedImage.base64);
	};

	const handleCameraClick = async () => {
		if (await Camera.isAvailableAsync()) {
			let result = await Camera.requestPermissionsAsync();

			if (result.granted === false) {
				alert("Need permisson to Camera for this to work");
				return;
			}

			const options = { base64: true };
		}
	};

	const callGoogleApi = async (base64) => {
		setResponse(null);
		setLoadMessage("Loading...");
		try {
			await fetch(
				`https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
				{
					method: "POST",
					body: JSON.stringify({
						requests: [
							{
								image: {
									content: base64,
								},
								features: [
									{
										type: "OBJECT_LOCALIZATION",
										maxResults: 1,
									},
								],
							},
						],
					}),
				}
			)
				.then((res) => res.json())
				.then((res) => {
					setResponse(res.responses[0].localizedObjectAnnotations[0]);
					console.log(res);
				});
		} catch (e) {
			console.log(e);
			setLoadMessage("Google counldn´t process the image");
		}
	};
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
					<Text style={styles.text}>Google Vision API</Text>
					<Text>Google will try to guess what's in your image</Text>
					{response && (
						<View style={styles.imgWrapper}>
							<Image
								style={styles.image}
								source={{
									uri: `data:image/png;base64,${image.base64}`,
								}}
							/>
						</View>
					)}
					{(response && (
						<Text style={styles.nameText}>
							Your image contained: {response.name}
						</Text>
					)) || <Text style={styles.loadingText}>{loadMessage}</Text>}
					{response && (
						<Text style={styles.scoreText}>
							Google is: {response.score * 100}% sure
						</Text>
					)}

					<Button
						text="Choose an Image"
						style={styles.button}
						onPress={handleClick}
					/>
					<Button
						text="Snap a Picture"
						style={styles.button}
						onPress={handleCameraClick}
					/>
				</View>
			</View>
		</ScrollView>
	);
}
