import * as DocumentPicker from "expo-document-picker";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import * as React from "react";
import { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

import { db, storage } from "../../../firebase";
import BottomBar from "../../shared/components/bottombar/BottomBar.component";
import { NavigationScreen } from "../../types/Navigator.types";

export default function ChatScreen({ navigation }: NavigationScreen<"Chat">) {
  const [file, setFile] = useState("");
  const [blobFile, setBlobFile] = useState(null);
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
    <View style={{ width: "100%", height: "100%" }}>
      <View
        style={{
          width: "100%",
          height: "93%",
          backgroundColor: "#ffffff",
          //padding: "1%",
        }}
      >
        <View
          style={{
            height: "10%",
            backgroundColor: "#ADD9D8",
            paddingTop: "6%",
          }}
        >
          <Text
            style={{
              color: "rgb(18,84,136)",
              textAlign: "center",
              margin: "2%",
              fontSize: 17,
            }}
          >
            Materiais
          </Text>
        </View>

        <View style={{ margin: "1%" }}>
          <Text
            style={{
              color: "rgb(18,84,136)",
              textAlign: "left",
              margin: "1%",
              fontSize: 20,
            }}
          >
            Destino
          </Text>
          <TextInput
            placeholder="Crie uma pasta"
            style={styles.input}
            onChangeText={(text) => setFolder(text)}
          />
        </View>
        <View style={{ margin: "1%" }}>
          <Button title="Selecionar" onPress={selectDoc} color="#2A93D5" />
        </View>
      </View>
      <BottomBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "#2A93D5",
    margin: "1%",
    borderWidth: 1,
    borderRadius: 40,
    paddingVertical: "1%",
    paddingLeft: "3%",
    fontSize: 20,
  },
});
