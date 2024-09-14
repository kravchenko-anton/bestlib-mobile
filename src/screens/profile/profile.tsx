import { useTypedNavigation } from "@/hooks";
import { Settings as SettingsIcon } from "@/icons";
import { GoalSelectModal } from "@/screens/profile/goal-select";
import { useStatisticsWithSync } from "@/screens/profile/useStatisticsWithSync";
import { Button, Loader, ScrollLayout, Title } from "@/ui";
import * as Header from "@/ui/header/header";
import { CircularProgressBar } from "@/ui/progress-bar/circular-progress-bar";
import { cn } from "@/utils";
import { Color } from "@/utils/colors";
import { fromMsToMinutes } from "@/utils/numberConvertor";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { RefreshControl, View } from "react-native";

const Profile = () => {
  const sheetReference = useRef<BottomSheetModal>(null);
  const { statistic, refetch } = useStatisticsWithSync();
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
      {statistic ? (
        <ScrollLayout
          className="px-2"
          refreshControl={
            <RefreshControl
              refreshing={false}
              colors={[Color.white]}
              progressBackgroundColor={Color.transparent}
              onRefresh={() => refetch()}
            />
          }
        >
          <GoalSelectModal
            sheetRef={sheetReference}
            currentGoal={statistic.goalMinutes || 10}
            refetch={() => refetch()}
          />
          <View className="bg-foreground border-bordered mt-4 rounded-lg border-[1px] p-2">
            <View className="mx-2 mb-6">
              <Title center weight="bold" color={Color.white} size="xxl">
                Daily goal
              </Title>
              <Title
                center
                numberOfLines={2}
                weight="bold"
                color={Color.gray}
                size="sm"
              >
                Read at least {statistic.goalMinutes || 10} minutes a day to
                keep your progress
              </Title>
            </View>
            <View className="mx-auto -mb-8">
              <CircularProgressBar
                size={200}
                width={7}
                backgroundWidth={7}
                tintColor={Color.success}
                fillLineCap="round"
                lineCap="round"
                backgroundColor={Color.bordered}
                arcSweepAngle={240}
                rotation={240}
                fill={
                  statistic.progressByCurrentWeek?.find(
                    (item) => item.isCurrentDay,
                  )?.dayProgress || 0
                }
              >
                {() => (
                  <View className=" -mt-10">
                    <Title
                      center
                      weight="bold"
                      color={Color.white}
                      size="xxxl"
                      className="mb-0.5"
                    >
                      {
                        // to clock format

                        fromMsToMinutes(
                          statistic.progressByCurrentWeek?.find(
                            (item) => item.isCurrentDay,
                          )?.readingTimeMs || 0,
                        ).toFixed(2)
                      }
                    </Title>
                    <Title center weight="bold" color={Color.gray} size="sm">
                      of {statistic.goalMinutes || 10} minutes goal
                    </Title>
                  </View>
                )}
              </CircularProgressBar>
            </View>

            <View className="flex-row items-center justify-between gap-2">
              {statistic.progressByCurrentWeek?.map((item) => {
                console.log("item", item);
                const isDayCompleted = item.dayProgress >= 100;
                return (
                  <View key={item.day}>
                    {item.isCurrentDay ? (
                      <View className="border-b-2 border-white pb-2 pt-2">
                        <CircularProgressBar
                          size={32}
                          fill={item.dayProgress}
                          width={2}
                          fillLineCap="round"
                          backgroundWidth={2}
                          lineCap="round"
                          rotation={-90}
                          tintColor={
                            isDayCompleted ? Color.success : Color.white
                          }
                          backgroundColor={
                            isDayCompleted ? Color.transparent : Color.bordered
                          }
                          style={{
                            borderRadius: 1000,
                            backgroundColor: isDayCompleted
                              ? Color.success
                              : Color.transparent,
                          }}
                        >
                          {() => (
                            <Title
                              weight="bold"
                              color="white"
                              size="sm"
                              className="mb-0.5"
                            >
                              {item.day.slice(0, 1)}
                            </Title>
                          )}
                        </CircularProgressBar>
                      </View>
                    ) : (
                      <View
                        className={cn(
                          ` h-[32px] w-[32px] flex-row items-center  justify-center rounded-full`,
                          isDayCompleted ? "bg-success" : "bg-bordered",
                        )}
                      >
                        <Title
                          className="mb-0.5"
                          weight="bold"
                          color={Color.white}
                          size="sm"
                        >
                          {item.day.slice(0, 1)}
                        </Title>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
            {/*TODO: добавить позднее*/}
            {/*<Title*/}
            {/*	weight='bold'*/}
            {/*	color={Color.gray}*/}
            {/*	numberOfLines={2}*/}
            {/*	size='sm'*/}
            {/*	className='mx-auto mt-2'>*/}
            {/*	your steak: {statistic.userSteak} days*/}
            {/*</Title>*/}
            <View className="mb-4 pt-4">
              <Title
                weight="bold"
                color={Color.gray}
                numberOfLines={2}
                size="sm"
                className="border-l-bordered border-l-2 pl-2 "
              >
                bob: “ {statistic.pepTalk} ”
              </Title>
            </View>

            <View className="flex-row justify-center">
              <Button
                variant="foreground"
                className="mb-2"
                size={"sm"}
                onPress={() => sheetReference.current?.present()}
              >
                Adjust goal
              </Button>
            </View>
          </View>
        </ScrollLayout>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Profile;
