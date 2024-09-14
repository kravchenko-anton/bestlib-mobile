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
   <Title className='mt-4' center size='md'>
      You can see statistics here in the future
   </Title>
    </>
  );
};

export default Profile;
