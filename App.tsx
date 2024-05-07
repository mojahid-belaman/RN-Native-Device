import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import NewPlaceScreen from "./screens/NewPlace";
import DetailsPlaceScreen from "./screens/DetailsPlace";
import FavoritePlacesScreen from "./screens/FavoritePlaces";
import { RootStackParamList } from "./types/screens";
import { styleScreens } from "./styles/screens";
import IconBtn from "./components/ui/IconBtn";
import { StatusBar } from "expo-status-bar";
import MapScreen from "./screens/Map";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="favoritePlace"
          screenOptions={{
            ...styleScreens,
          }}
        >
          <Stack.Screen
            name="favoritePlace"
            component={FavoritePlacesScreen}
            options={({ navigation }) => ({
              title: "Your Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconBtn
                  name="add"
                  color={tintColor}
                  size={24}
                  onPress={() => navigation.navigate("newPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="newPlace"
            component={NewPlaceScreen}
            options={{
              title: "Add a new place",
            }}
          />
          <Stack.Screen name="detailsPlace" component={DetailsPlaceScreen} />
          <Stack.Screen name="mapView" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
