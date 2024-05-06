import { Alert, Button, View } from "react-native";
import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";

function ImagePicker() {
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

  async function verifyPermission() {
    if (cameraPermissionInfo?.status === PermissionStatus.GRANTED) {
      const responsePermission = await requestPermission();

      return responsePermission.granted;
    }
    if (cameraPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission!",
        "You need to grant camera permission to use this app."
      );  
      return false;
    }
    return true;
  }

  async function pickImageHandler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    console.log(image);
  }
  return (
    <View>
      <View></View>
      <Button title="Pick an image" onPress={pickImageHandler} />
    </View>
  );
}

export default ImagePicker;
