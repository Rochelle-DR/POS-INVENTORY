   import { View, Text } from "react-native";
   import Appheader from "../../../components/appheader";
   import { useRouter } from "expo-router";


    export default function Product() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log out",
        style: "destructive",
        onPress: async () => {
          try {
            await clearSession();
            router.replace("/login");
          } catch (error) {
            console.error("Logout error:", error);
            Alert.alert(
              "Error",
              "Unable to log out. Please try again."
            );
          }
        },
      },
    ]);
  };
     return (
       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
         <Text>Product</Text>
       </View>
     );
   }

