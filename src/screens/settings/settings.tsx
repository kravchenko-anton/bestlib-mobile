import { useTypedNavigation } from '@/hooks'
import { useAuthStore } from '@/store/auth/auth-store'
import Header from '@/ui/header/header'
import { Color } from '@/utils/colors'
import { Linking, View } from 'react-native'
import * as List from './settings-list'

const Settings = () => {
  const { navigate } = useTypedNavigation();
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <Header.Head>
        <Header.BackWithTitle title="Settings" />
      </Header.Head>

      <View className="h-full">
        <View className="pt-4">
          <List.Item
            borderColor={Color.primary}
            title="Community chat"
            onPress={() => Linking.openURL("https://t.me/boknex")}
          />
          <List.Item
            title="Contact us"
            onPress={() => Linking.openURL("mailto:anton.kravchenko.developer@gmail.com")}
          />
          <List.Item
            description={user?.email}
            title={`Sign out`}
            onPress={() => navigate("Logout")}
          />
        </View>
      </View>
    </>
  );
};
export default Settings;
