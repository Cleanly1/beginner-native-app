import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { Dimensions } from "react-native";

import { API_KEY } from "@env";

import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import styles from "./styles";
import Images from "../../components/Image/Image";
import { HeaderBackButton } from "@react-navigation/stack";
import Button from "../../components/Button/Button";

export default function CameraScreen({ navigation }) {
	const cam = useRef();
	const [hasPermission, setHasPermission] = useState("");
	const [type, setType] = useState(Camera.Constants.Type.back);
	const deviceWidth = Dimensions.get("window").width;
	const deviceHeight = Dimensions.get("window").height;
	const options = {
		height: deviceHeight * (deviceHeight * 0.3),
		width: deviceWidth,
	};
	const takePicture = async () => {
		if (hasPermission === null) {
			return;
		}
		if (hasPermission === false) {
			return;
		}

		let photo = await cam.current.takePictureAsync(options);
		console.log(photo);
	};
	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			console.log(status);
			setHasPermission(status === "granted");
		})();
	}, []);

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
				<Camera ref={cam} style={styles.camera} type={type}>
					<Button
						text="Snap"
						style={{
							flex: 0.1,
							alignSelf: "flex-end",
							alignItems: "center",
						}}
						onPress={takePicture}
					/>
				</Camera>
				<View
					style={{
						backgroundColor: "transparent",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<Button
						text="Flip"
						style={{
							flex: 0.1,
							alignSelf: "flex-end",
							alignItems: "center",
						}}
						onPress={() => {
							setType(
								type === Camera.Constants.Type.back
									? Camera.Constants.Type.front
									: Camera.Constants.Type.back
							);
						}}
					/>
				</View>
			</View>
		</ScrollView>
	);
}
