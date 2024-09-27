import { useTypedNavigation } from '@/hooks'
import { Settings as SettingsIcon } from '@/icons'
import { useStatisticsWithSync } from '@/screens/profile/useStatisticsWithSync'
import { ScrollLayout, Title } from '@/ui'
import * as Header from '@/ui/header/header'
import { cn } from '@/utils'
import { Color } from '@/utils/colors'
import dayjs from 'dayjs'
import { RefreshControl, View } from 'react-native'

const Profile = () => {
  const { navigate } = useTypedNavigation();
  const {isLoading,refetch,syncHistory, statistic} = useStatisticsWithSync();
  const lastMonthDatesArray = Array.from({ length: dayjs().daysInMonth() }, (_, i) => {
    const date = dayjs().date(i + 1).format('DD');
    const number = dayjs().date(i + 1).format('D');
    const totalReadingTime = statistic?.find(stat => dayjs(stat.date).format('DD') === date)?.totalReadingTime
    return { date, totalReadingTime,number };
  });
  return (
    <>
      <Header.Head>
        <Header.HeaderTitle title='Profile' />
        <Header.Icon
          className="pr-2"
          icon={SettingsIcon}
          onPress={() => navigate("Settings")}
        />
    
      </Header.Head>
      <ScrollLayout
        className=''
        refreshControl={
          <RefreshControl
            refreshing={false}
            colors={[Color.white]}
            progressBackgroundColor={Color.transparent}
            onRefresh={() => {
              refetch();
              syncHistory();
            }}
          />
        }
      >
        
        <View className='rounded-xl mx-2 mt-4 bg-foreground p-2 pb-6'>
         <View className='flex-row justify-between items-center px-2'>
           <Title className="mb-2" color={Color.white} weight='bold' size='xxxl'>
             Statistic
           </Title>
           <View>
             <Title color={Color.white} weight='light' size='xl'>
               30 days
             </Title>
             
           </View>
         </View>
          <View className='flex gap-2 flex-wrap flex-row justify-center'>
        {
          lastMonthDatesArray.map((date) => {
            return (
              <View key={date.date}
                className={cn('border-2 justify-center items-center border-bordered w-[14%] h-[55px]  rounded-md', {
                'bg-primary border-0': date.totalReadingTime
              })}>
                <Title key={date.number} size='xl' className="text-center mb-1">
                  {date.number}
                </Title>
                <Title key={date.totalReadingTime} color={Color.gray} size='ssm' className="text-center absolute bottom-1">
                  {date.totalReadingTime}
                </Title>
              </View>
            )
          })
        }
          </View>
        </View>
      </ScrollLayout>
    </>
  );
};

export default Profile;
