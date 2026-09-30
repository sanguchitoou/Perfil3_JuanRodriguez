import React from "react";

import { View, ActivityIndicator, StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Login";
import Register from "../screens/Register";
import Dashboard from "../screens/Dashboard";
import Profile from "../screens/Profile";
import Planets from "../screens/Planets";

import { useAuth } from "../hooks/useAuth";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { user, loadingAuth } = useAuth();

  if (loadingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,

          headerStyle: {
            backgroundColor: "#FFFFFF",
          },

          headerTintColor: "#0F172A",

          headerTitleStyle: {
            fontWeight: "700",
          },
        }}
      >
        {user ? (
          <>
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                title: "",
              }}
            />

            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                title: "",
              }}
            />

            <Stack.Screen
              name="Planets"
              component={Planets}
              options={{
                title: "Planetas",
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: "",
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                title: "",
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
  },
});
