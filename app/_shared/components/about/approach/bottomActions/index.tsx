"use client";
import CustomButton from "components/common/customButton";
import { useRouter } from "next13-progressbar";
import { routeConstant } from "routes/constants";

const BottomActions = () => {
  const router = useRouter();

  return (
    <>
      <CustomButton
        title="Apply to be a Fellow"
        containerStyle="bg-blue"
        onClick={() => router.push(routeConstant.insights.path)}
      />
    </>
  );
};

export default BottomActions;
