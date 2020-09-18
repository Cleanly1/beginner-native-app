import { StyleSheet, Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: "#fff",
		width: deviceWidth,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f2f2f2",
		overflow: "scroll",
	},

	camera: { height: deviceHeight - deviceHeight * 0.3, width: deviceWidth },
	textWrapper: {
		justifyContent: "center",
		alignItems: "center",
	},
});

export default styles;
