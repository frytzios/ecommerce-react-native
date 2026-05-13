import { Tabs } from 'expo-router';
import {View , Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@clerk/clerk-expo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

const TabsLayout = () => {
    const  { isSignedIn, isLoaded } = useAuth();
    const insets = useSafeAreaInsets();
    if (!isLoaded) return null;
    if (!isSignedIn) return <Redirect href={"/(auth)"} />;
     
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#1db954',
                tabBarInactiveTintColor: '#b3b3b3',
                tabBarStyle:{
                    position:'absolute',
                    backgroundColor:'#transparent',
                    borderTopWidth:0,
                    height: 60 + insets.bottom,
                    paddingTop:10,
                    marginHorizontal: 100,
                    marginBottom: insets.bottom, 
                    borderRadius: 30,
                    overflow: 'hidden',
                },
                tabBarBackground: () => (
                    <BlurView 
                        intensity={80} 
                        tint="dark" 
                        style={{position:"absolute"}} />
                ),
                tabBarLabelStyle:{
                    fontSize:12,
                    fontWeight:600,

                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title:'Shop',
                    tabBarIcon: ({color , size}) => <Ionicons name="grid" size={size} color={color} />,

                }}
            />
            <Tabs.Screen
                name='cart'
                options={{
                    title:'Cart',
                    tabBarIcon: ({color , size}) => <Ionicons name="cart" size={size} color={color} />,

                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title:'Profile',
                    tabBarIcon: ({color , size}) => <Ionicons name="person" size={size} color={color} />,

                }}
            />
        </Tabs>
    )
}

export default TabsLayout;