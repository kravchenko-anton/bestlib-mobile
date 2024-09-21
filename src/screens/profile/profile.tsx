import { useTypedNavigation } from '@/hooks'
import { Settings as SettingsIcon } from '@/icons'
import { Title } from '@/ui'
import * as Header from '@/ui/header/header'


const Profile = () => {
  const { navigate } = useTypedNavigation();
  return (
    <>
      <Header.Head>
        <Header.Logo className="pl-2" />
        <Header.Icon
          className="pr-2"
          icon={SettingsIcon}
          onPress={() => navigate("Settings")}
        />
      </Header.Head>
   <Title className='mt-4' center size='md'>
      You can see statistics here in the future
   </Title>
    </>
  );
};

export default Profile;
