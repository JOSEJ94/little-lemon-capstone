import { ONBOARDING_COMPLETED_STORAGE_KEY } from "@/constants/Keys";
import { useStorageValue } from "@/hooks/useStorageValue";
import { Redirect, SplashScreen } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const [onboardingCompleted, loading] = useStorageValue(
    ONBOARDING_COMPLETED_STORAGE_KEY
  );

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) return null;
  return <Redirect href={onboardingCompleted ? "/Profile" : "/Onboarding"} />;
}
