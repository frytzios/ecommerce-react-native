import { useState } from 'react';
import { Alert } from 'react-native';
import { useSSO } from '@clerk/clerk-expo';

type SocialStrategy = 'oauth_google' | 'oauth_apple';

function useSocialAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (strategy: SocialStrategy) => {
    setIsLoading(true);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
      });

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
      }
    } catch (error) {
      console.log('Error in social auth:', error);

      const provider = strategy === 'oauth_google' ? 'Google' : 'Apple';
      Alert.alert(
        'Error',
        `Failed to sign in with ${provider}. Please try again.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleSocialAuth };
}

export default useSocialAuth;
