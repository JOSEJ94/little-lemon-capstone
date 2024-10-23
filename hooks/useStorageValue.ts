import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStorageValue = (keyname: string) => {
  const [value, setValue] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getValue = async () => {
    setLoading(true);
    const res = await AsyncStorage.getItem(keyname);
    setValue(res);
    setLoading(false);
  };

  useEffect(() => {
    if (keyname) {
      getValue();
    }
  }, [keyname]);

  return [value, loading];
};
