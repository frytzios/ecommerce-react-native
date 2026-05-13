import SafeScreen from "@/components/SafeScreen";
import { Ionicons } from "@expo/vector-icons";
import { View , Text, ScrollView, TouchableOpacity } from "react-native";

const ShopScreen = () => {
    return (
        <SafeScreen>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ padding: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* header*/}
                <View className="px-6 pb-4 pt-6">
                    <View className="flex-row items-center justify-between mb-6">
                        <View>
                            <Text className="bg-white text-text-primary text-3xl font-bold tracking-tight">Shop</Text>
                            <Text className="bg-white text-text-secondary text-sm mt-1" >Buscar todos los productos</Text>
                        </View>
                    </View>
                    
                    <TouchableOpacity className="bg-surface/50 p-3 rounded-full">
                        <Ionicons name="options-outline" size={22} color={"#fff"}/>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </SafeScreen>
    );
};

export default ShopScreen;