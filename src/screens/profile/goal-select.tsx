import api from "@/api";
import { Button } from "@/ui";
import { Color } from "@/utils/colors";
import { MutationKeys } from "@/utils/query-keys";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useMutation } from "@tanstack/react-query";
import type { FC, RefObject } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

//TODO: доделать adjust goals и сделать нормально
interface GoalSelectModalProperties {
  sheetRef: RefObject<BottomSheetModal>;
  currentGoal: number;
  refetch: () => void;
}

const allowedGoals = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 150, 180];

export const GoalSelectModal: FC<GoalSelectModalProperties> = ({
  sheetRef,
  currentGoal,
  refetch,
}) => {
  const { mutateAsync: updateGoal, isPending: updateGoalLoading } = useMutation(
    {
      mutationKey: MutationKeys.user.adjustGoal,
      mutationFn: (goal: number) => api.user.adjustGoal(goal),
      onSuccess: () => {
        refetch();
      },
    },
  );
  return (
    <BottomSheetModal
      enableContentPanningGesture
      enableHandlePanningGesture
      enablePanDownToClose
      enableOverDrag
      ref={sheetRef}
      snapPoints={[100]}
      handleIndicatorStyle={{ backgroundColor: Color.gray }}
      backgroundStyle={{
        backgroundColor: Color.foreground,
      }}
      style={{
        borderColor: Color.bordered,
        borderWidth: 1,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}
      backdropComponent={(backdropProperties) => (
        <BottomSheetBackdrop
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          {...backdropProperties}
          enableTouchThrough
        />
      )}
    >
      <View className="mt-3">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={allowedGoals}
          renderItem={({ item: goal }) => (
            <Button
              size="md"
              variant={goal === currentGoal ? "primary" : "muted"}
              key={goal}
              disabled={updateGoalLoading}
              className="mb-2 mr-3 rounded-lg px-6"
              onPress={() => {
                updateGoal(goal).then(() => {
                  sheetRef.current?.close();
                });
              }}
            >
              {goal}
            </Button>
          )}
        />
      </View>
    </BottomSheetModal>
  );
};
