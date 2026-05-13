import { View , Text , Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import useSocialAuth from '@/hooks/useSocialAuth';


const AuthScreen = () => {

    const { isLoading , handleSocialAuth } = useSocialAuth();

    return (

        <View className='px-8 flex-1 justify-center items-center bg-white'>
            {/*DEMO IMAGEN */}
            <Image 
            source={require("../../assets/images/auth6.png")}
            className="size-96"
            resizeMode="contain"
            />

            <View className='gap-2 mt-3'>
            {/* Boton de google */}
            <TouchableOpacity
                className='flex-row items-center justify-center bg-white border border-gray-300 rounded-full px-6 py-3 mt-5 mx-10'
                onPress={() => handleSocialAuth('oauth_google')}
                disabled={isLoading}
                style={{
                    shadowOffset: {width:0, height:1},
                    shadowOpacity:1,
                    elevation:2
                }}
            >
            { isLoading ? (
                <ActivityIndicator size={'small'} color={'#4285f4'}/>
            ) : (
                <View className='flex-row items-center justify-center'>
                    <Image 
                    source={require("../../assets/images/google-logo.png")}
                    className='size-10 mr-3'
                    resizeMode='contain'
                    />
                    <Text className='text-black font-medium text-base'>Continuar con Google</Text>

                </View>
            )}
            
            </TouchableOpacity>

            {/* Boton de Apple */}
            <TouchableOpacity
                className='flex-row items-center justify-center bg-white border border-gray-300 rounded-full px-6 py-3 mt-5 mx-10'
                onPress={() => handleSocialAuth('oauth_apple')}
                disabled={isLoading}
                style={{
                    shadowOffset: {width:0, height:1},
                    shadowOpacity:5,
                    elevation:2
                }}
            >
            { isLoading ? (
                <ActivityIndicator size={'small'} color={'#4285f4'}/>
            ) : (
                <View className='flex-row items-center justify-center'>
                    <Image 
                    source={require("../../assets/images/apple-logo.png")}
                    className='size-10 mr-3'
                    resizeMode='contain'
                    />
                    <Text className='text-black font-medium text-base'>Continuar con Apple</Text>

                </View>
            )}
            
            </TouchableOpacity>

        </View>

        <Text className='text-center text-gray-500 text-xs leading-4 mt-6 px-2'>
            By signing in, you agree to our 
            <Text className='text-blue-500'>Terms</Text> , {' '}
            <Text className='text-blue-500'>Privacy Policy
            </Text>, and <Text className='text-blue-500'>Cokkie Use</Text>.
        </Text>
    </View>

    );
};

export default AuthScreen; 