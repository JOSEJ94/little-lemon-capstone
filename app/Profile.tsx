import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import TextInput from "@/components/TextInput";
import Checkbox from "@/components/Checkbox";
import Button from "@/components/Button";
import { AppColors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  EMAIL_STORAGE_KEY,
  FIRST_NAME_STORAGE_KEY,
  LAST_NAME_STORAGE_KEY,
  NEWSLETTERS_STORAGE_KEY,
  ONBOARDING_COMPLETED_STORAGE_KEY,
  ORDER_STATUSES_STORAGE_KEY,
  PASSWORD_CHANGES_STORAGE_KEY,
  PHONE_NUMBER_STORAGE_KEY,
  PROFILE_IMG_STORAGE_KEY,
  SPECIAL_OFFERS_STORAGE_KEY,
} from "@/constants/Keys";
import { useRouter } from "expo-router";
import Avatar from "@/components/Avatar";

const Profile = () => {
  const router = useRouter();
  const styles = useMemo(() => createStyles(), []);
  const [profileImage, setProfileImage] = useState("");
  const [receiveOrderStatuses, setReceiveOrderStatuses] =
    useState<boolean>(false);
  const [receivePasswordChanges, setReceivePasswordChanges] =
    useState<boolean>(false);
  const [receiveSpecialOffers, setReceiveSpecialOffers] =
    useState<boolean>(false);
  const [receiveNewsletters, setReceiveNewsletters] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const onPickImagePress = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.3,
        selectionLimit: 1,
      });
      if (result.assets) {
        setProfileImage(result?.assets[0].uri);
      }
    } catch (error) {
      console.error(
        "There was an error while picking the image from the device."
      );
    }
  };

  const onRemoveProfileImage = async () => {
    setProfileImage("");
  };

  const onLogOutPress = async () => {
    setSubmitting(true);
    try {
      await AsyncStorage.multiSet([
        [ONBOARDING_COMPLETED_STORAGE_KEY, "false"],
        [FIRST_NAME_STORAGE_KEY, ""],
        [LAST_NAME_STORAGE_KEY, ""],
        [EMAIL_STORAGE_KEY, ""],
        [PHONE_NUMBER_STORAGE_KEY, ""],
        [PROFILE_IMG_STORAGE_KEY, ""],
        [ORDER_STATUSES_STORAGE_KEY, "true"],
        [PASSWORD_CHANGES_STORAGE_KEY, "true"],
        [SPECIAL_OFFERS_STORAGE_KEY, "true"],
        [NEWSLETTERS_STORAGE_KEY, "true"],
      ]);
      router.replace("/Onboarding");
    } catch (error) {
      console.error("OnLogout call crashed and couldn't complete");
    } finally {
      setSubmitting(false);
    }
  };

  const onDiscardChangesPress = async () => {
    setSubmitting(true);
    try {
      const [
        localEmail,
        localFirstName,
        localLastName,
        localNewsletter,
        localOrderStatuses,
        localPasswordChanges,
        localPhoneNumber,
        localSpecialOffers,
        localProfileImage,
      ] = await AsyncStorage.multiGet([
        EMAIL_STORAGE_KEY,
        FIRST_NAME_STORAGE_KEY,
        LAST_NAME_STORAGE_KEY,
        NEWSLETTERS_STORAGE_KEY,
        ORDER_STATUSES_STORAGE_KEY,
        PASSWORD_CHANGES_STORAGE_KEY,
        PHONE_NUMBER_STORAGE_KEY,
        SPECIAL_OFFERS_STORAGE_KEY,
        PROFILE_IMG_STORAGE_KEY,
      ]);
      setFirstName(localFirstName[1] || "");
      setLastName(localLastName[1] || "");
      setEmail(localEmail[1] || "");
      setPhoneNumber(localPhoneNumber[1] || "");
      if (localNewsletter.length && localNewsletter[1] !== null) {
        setReceiveNewsletters(JSON.parse(localNewsletter[1]));
      }
      if (localOrderStatuses.length && localOrderStatuses[1] !== null) {
        setReceiveOrderStatuses(JSON.parse(localOrderStatuses[1]));
      }
      if (localPasswordChanges.length && localPasswordChanges[1] !== null) {
        setReceivePasswordChanges(JSON.parse(localPasswordChanges[1]));
      }
      if (localSpecialOffers.length && localSpecialOffers[1] !== null) {
        setReceiveSpecialOffers(JSON.parse(localSpecialOffers[1]));
      }
      setProfileImage(localProfileImage[1] || "");
    } catch (error) {
      console.error(
        "Error while discarding changes. Operation could not complete"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const onSaveChangesPress = async () => {
    setSubmitting(true);
    try {
      await AsyncStorage.multiSet([
        [EMAIL_STORAGE_KEY, email],
        [FIRST_NAME_STORAGE_KEY, firstName],
        [LAST_NAME_STORAGE_KEY, lastName],
        [PROFILE_IMG_STORAGE_KEY, profileImage],
        [NEWSLETTERS_STORAGE_KEY, `${receiveNewsletters}`],
        [ORDER_STATUSES_STORAGE_KEY, `${receiveOrderStatuses}`],
        [PASSWORD_CHANGES_STORAGE_KEY, `${receivePasswordChanges}`],
        [PHONE_NUMBER_STORAGE_KEY, phoneNumber],
        [SPECIAL_OFFERS_STORAGE_KEY, `${receiveSpecialOffers}`],
      ]);
    } catch (error) {
      console.error("Error while saving data. Operation could not complete");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    onDiscardChangesPress();
  }, []);

  const avatarName =
    `${firstName.substring(0, 1)}${lastName.substring(0, 1)}` || "You";
  return (
    <ScrollView style={styles.scrollviewContainer}>
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>Personal Information</Text>
        <View style={styles.profileImgButtonContainer}>
          <Avatar name={avatarName} imageUri={profileImage} />
          <Button
            title="Change"
            style={styles.photoButton}
            onPress={onPickImagePress}
          />
          <Button
            title="Remove"
            style={[styles.discardBtn, styles.photoButton]}
            textStyle={styles.discardButtonTxt}
            onPress={onRemoveProfileImage}
            loading={submitting}
          />
        </View>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          label="First name"
          placeholder="First Name"
          containerStyle={styles.input}
        />
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          label="Last name"
          placeholder="Last Name"
          containerStyle={styles.input}
        />
        <TextInput
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          label="Email"
          placeholder="Email"
          containerStyle={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          label="Phone number"
          placeholder="Phone number"
          containerStyle={styles.input}
          keyboardType="phone-pad"
        />
        <Text style={styles.secondTitle}>Email notifications</Text>
        <Checkbox
          containerStyle={styles.checkBox}
          label="Order statuses"
          value={receiveOrderStatuses}
          onValueChange={setReceiveOrderStatuses}
        />
        <Checkbox
          containerStyle={styles.checkBox}
          label="Password changes"
          value={receivePasswordChanges}
          onValueChange={setReceivePasswordChanges}
        />
        <Checkbox
          containerStyle={styles.checkBox}
          label="Special offers"
          value={receiveSpecialOffers}
          onValueChange={setReceiveSpecialOffers}
        />
        <Checkbox
          containerStyle={styles.checkBox}
          label="Newsletter"
          value={receiveNewsletters}
          onValueChange={setReceiveNewsletters}
        />
        <Button
          title="Log out"
          onPress={onLogOutPress}
          style={styles.fullWidthBtn}
          textStyle={styles.fullWidthButtonTxt}
          loading={submitting}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Discard changes"
            style={styles.discardBtn}
            textStyle={styles.discardButtonTxt}
            onPress={onDiscardChangesPress}
            loading={submitting}
          />
          <Button
            title="Save changes"
            onPress={onSaveChangesPress}
            loading={submitting}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Profile;

const createStyles = () =>
  StyleSheet.create({
    scrollviewContainer: {
      backgroundColor: "white",
    },
    container: {
      margin: 12,
      padding: 12,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: "lightgray",
      backgroundColor: "white",
    },
    buttonContainer: {
      marginVertical: 32,
      justifyContent: "space-evenly",
      flexDirection: "row",
    },
    profileImgButtonContainer: {
      marginVertical: 8,
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      fontFamily: "Monospace",
      fontWeight: "600",
      fontSize: 18,
    },
    input: {
      marginVertical: 12,
    },
    secondTitle: {
      marginTop: 10,
      fontFamily: "Monospace",
      fontWeight: "600",
      fontSize: 18,
    },
    checkBox: {
      marginVertical: 12,
    },
    fullWidthButtonTxt: {
      color: "black",
    },
    discardButtonTxt: {
      color: AppColors.highlight2,
    },
    discardBtn: {
      borderWidth: 1,
      borderColor: AppColors.primary1,
      backgroundColor: "white",
    },
    fullWidthBtn: {
      borderWidth: 1,
      borderColor: AppColors.secondary1,
      backgroundColor: AppColors.primary2,
      alignSelf: "stretch",
    },
    photoButton: {
      marginLeft: 24,
      minWidth: 80,
      paddingHorizontal: 8,
      alignSelf: "center",
    },
  });
