import { useLayoutEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import PrimaryButton from "../components/ui/Button";
import { RootStackParamList } from "../types";
import { Colors } from "../styles/colors";

function DetailsPlaceScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "detailsPlace">>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { image, address, location, title } = route.params.place;

  function selectMapHandler() {
    navigation.navigate("mapView", {
      latitude: location.latitude,
      longitude: location.longitude,
    });
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [navigation]);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.info}>
        <Text style={styles.address}>{address}</Text>
        <PrimaryButton type="fit" iconName="map" onPress={selectMapHandler}>
          View On Map
        </PrimaryButton>
      </View>
    </ScrollView>
  );
}

export default DetailsPlaceScreen;

const styles = StyleSheet.create({
  image: {
    height: "30%",
    minHeight: 300,
    width: "100%",
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 24,
  },
  address: {
    color: Colors.primary500,
    fontWeight: "bold",
    fontSize: 16,
  },
});
