import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, Switch, Pressable, View, Image } from "react-native";
import { ZodError } from "zod";

import { auth } from "../../../firebase";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { signOutAsync } from "../../services/Authentication.service";
import {
  downloadImageAsync,
  uploadImage,
} from "../../services/Storage.service";
import ErrorModal from "../../shared/components/errorModal/ErrorModal.component";
import Loading from "../../shared/components/loading/Loading.component";
import { setAvatar } from "../../shared/reducers/Avatar.reducer";
import { toggle } from "../../shared/reducers/Theme.reducer";
import { ThemedStyles } from "../../shared/styles/Themed.styles";

const userIconsPath = "userIcons/";

export default function UserScreen() {
  const isDarkTheme = useAppSelector((state) => state.isDarkTheme.value);
  const userAvatar = useAppSelector((state) => state.avatar.value);
  const dispatch = useAppDispatch();

  const [modalError, setModalError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  useEffect(() => {
    downloadStorageAvatarAsync();
  }, []);

  const openLoading = (message: string) => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const openModal = (message: string) => {
    setIsLoading(false);
    setModalError(message);
    setModalOpen(true);
  };

  const toggleTheme = () => {
    dispatch(toggle());
  };

  const signOutUserAsync = () => {
    signOutAsync();
  };

  const uploadAvatarAsync = async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsMultipleSelection: false,
      });

      if (!image.canceled) {
        const { uri } = image.assets[0];

        const fileName = auth.currentUser?.displayName + "_avatar";

        openLoading("Realizando upload");

        const fetchResponse = await fetch(uri);
        const blob = await fetchResponse.blob();

        const response = uploadImage({
          data: {
            content: blob,
            name: fileName,
          },
          path: userIconsPath,
        });

        response.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setLoadingMessage(progress.toFixed(2) + "%");
          },
          () => {
            openModal("Ocorreu um erro durante o upload");
          },
          () => {
            getDownloadURL(response.snapshot.ref).then(async (url) => {
              dispatch(setAvatar(url));
              setIsLoading(false);
            });
          },
        );
      }
    } catch (error) {
      if (error instanceof ZodError) {
        openModal("Conteúdo de upload inválido");
      } else {
        openModal("Ocorreu um erro inesperado ao realizar o upload");
      }
    }
  };

  const downloadStorageAvatarAsync = async () => {
    try {
      openLoading("Carregando configurações");

      const fileName = auth.currentUser?.displayName + "_avatar";

      const avatar =
        (await downloadImageAsync({
          name: fileName,
          path: userIconsPath,
        })) ?? userAvatar;

      if (avatar) {
        dispatch(setAvatar(avatar));
      }
    } catch (error) {
      dispatch(setAvatar(""));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, ThemedStyles(isDarkTheme).view]}>
      {isLoading && <Loading loadingContent={loadingMessage} />}
      <ErrorModal
        modalOpen={modalOpen}
        modalError={modalError}
        setModalOpen={setModalOpen}
        setModalError={setModalError}
      />
      <View style={styles.userContainer}>
        <Pressable style={styles.userIcon} onPress={uploadAvatarAsync}>
          {userAvatar && (
            <Image style={styles.avatar} source={{ uri: userAvatar }} />
          )}
          {!userAvatar && <Feather name="user" size={120} color="black" />}
        </Pressable>
      </View>
      <Pressable style={[styles.option]} onPress={toggleTheme}>
        <Text style={[styles.label, ThemedStyles(isDarkTheme).text]}>
          Trocar tema de fundo
        </Text>
        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
          trackColor={{ false: "#ccc", true: "#333" }}
        />
      </Pressable>
      <Pressable style={[styles.option]} onPress={signOutUserAsync}>
        <Text style={[styles.label, ThemedStyles(isDarkTheme).text]}>
          Sair da conta
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    height: 50,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  userIcon: {
    padding: 5,
    borderRadius: 80,
    backgroundColor: "white",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 80,
  },
});
