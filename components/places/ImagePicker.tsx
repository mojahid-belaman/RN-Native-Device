import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { launchCameraAsync, useCameraPermissions } from "expo-image-picker";

import { Colors } from "../../styles/colors";
import PrimaryButton from "../ui/Button";
import { verifyPermission } from "../../helper/verifyPermission";
import { enumFeature } from "../../types";

function ImagePicker() {
  const [pickedImage, setPickedImage] = useState<string>("");
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

  async function pickImageHandler() {
    const hasPermission = await verifyPermission(
      cameraPermissionInfo,
      requestPermission,
      enumFeature.CAMERA
    );

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    image.assets && setPickedImage(image.assets[0].uri);
  }

  let imagePrev = <Text>No Image Taken Yet!</Text>;

  if (pickedImage) {
    imagePrev = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.prevImage}>{imagePrev}</View>
      <PrimaryButton iconName="camera" onPress={pickImageHandler}>
        Take Image
      </PrimaryButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  prevImage: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary100,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
