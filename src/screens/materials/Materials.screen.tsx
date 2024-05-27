import * as DocumentPicker from "expo-document-picker";
import { addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import * as React from "react";
import { useState } from "react";
import { View, Text, Button, TextInput, ToastAndroid } from "react-native";
import { string } from "zod";

import { db, storage } from "../../../firebase";
import { useAppSelector } from "../../../hooks";
import ThemedView from "../../shared/components/themedView/ThemedView.component";
import { ThemedStyles } from "../../shared/styles/Themed.styles";
import { NavigationScreen } from "../../types/Navigator.types";

export default function MaterialsScreen({
  navigation,
}: NavigationScreen<"Materials">) {
  const isDarkTheme = useAppSelector((state) => state.isDarkTheme.value);
  const [file, setFile] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [progresspercent, setProgresspercent] = useState(0);
  const [folder, setFolder] = useState("");

  const selectDoc = async () => {
    const document = await DocumentPicker.getDocumentAsync({});
    if (!document.canceled) {
      setFile(document.assets[0].uri);
      const response = await fetch(document.assets[0].uri);
      const blob = await response.blob();
      const storageRef = ref(
        storage,
        `files/${folder}/` + new Date().getTime(),
      );
      const uploadTask = uploadBytesResumable(storageRef, blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            setImgUrl(downloadURL);
            await saveRec(downloadURL, new Date().toISOString(), folder);
            ToastAndroid.show(`Salvo em:files/${folder}`, ToastAndroid.CENTER);
          });
        },
      );
    }
  };

  async function saveRec(url: string, createdAt: string, folder: string) {
    const docRef = await addDoc(collection(db, "files"), {
      url,
      createdAt,
      folder,
    });
  }

  return (
    <ThemedView navigation={navigation}>
      <View
        style={{
          width: "100%",
          height: "93%",
          //padding: "1%",
        }}
      >
        <View
          style={{
            height: "10%",
            backgroundColor: "#050505",
            paddingTop: "6%",
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              textAlign: "center",
              margin: "2%",
              fontSize: 17,
              fontWeight: "700",
            }}
          >
            Materiais
          </Text>
        </View>

        <View style={{ margin: "1%" }}>
          <Text
            style={[
              ThemedStyles(isDarkTheme).text,
              {
                textAlign: "left",
                margin: "1%",
                fontSize: 20,
              },
            ]}
          >
            Destino
          </Text>
          <TextInput
            placeholder="Crie uma pasta.Ex: Aula01"
            placeholderTextColor={isDarkTheme ? "white" : "#050505"}
            style={[
              ThemedStyles(isDarkTheme).text,
              {
                borderColor: isDarkTheme ? "white" : "#050505",
                margin: "1%",
                borderWidth: 1,
                borderRadius: 40,
                paddingVertical: "1%",
                paddingLeft: "3%",
                fontSize: 20,
              },
            ]}
            onChangeText={(text) => setFolder(text)}
          />
        </View>
        <View style={{ margin: "1%" }}>
          <Button title="Upload" onPress={selectDoc} color="#050505" />
        </View>
      </View>
    </ThemedView>
  );
}
