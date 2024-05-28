import Feather from "@expo/vector-icons/Feather";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
} from "firebase/storage";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  ToastAndroid,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { storage } from "../../../firebase";
import { useAppSelector } from "../../../hooks";
import ThemedView from "../../shared/components/themedView/ThemedView.component";
import { ThemedStyles } from "../../shared/styles/Themed.styles";
import { NavigationScreen } from "../../types/Navigator.types";

interface Item {
  name: string;
  isFolder: boolean;
  fullPath: string;
}

export default function MaterialsScreen({
  navigation,
}: NavigationScreen<"Materials">) {
  const isDarkTheme = useAppSelector((state) => state.isDarkTheme.value);
  const [file, setFile] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>("");
  const [progresspercent, setProgresspercent] = useState<number>(0);
  const [folder, setFolder] = useState<string>("");
  const [currentFolder, setCurrentFolder] = useState<string>("files/");
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async (folder: string) => {
    const folderRef = ref(storage, folder);
    const res = await listAll(folderRef);
    const itemsArray: Item[] = res.prefixes
      .map((prefix) => ({
        name: prefix.name,
        isFolder: true,
        fullPath: prefix.fullPath,
      }))
      .concat(
        res.items.map((item) => ({
          name: item.name,
          isFolder: false,
          fullPath: item.fullPath,
        })),
      );

    if (folder !== "files/") {
      itemsArray.unshift({
        name: "..",
        isFolder: true,
        fullPath: folder,
      });
    }

    setItems(itemsArray);
  };

  useEffect(() => {
    fetchItems(currentFolder);
  }, [currentFolder]);

  const selectDoc = async () => {
    const document = await DocumentPicker.getDocumentAsync({});
    if (!document.canceled) {
      setFile(document.assets[0].uri);
      const response = await fetch(document.assets[0].uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `${currentFolder}${folder}/` + fileName);
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
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL);
            ToastAndroid.show(
              `Salvo em: ${currentFolder}${folder}`,
              ToastAndroid.CENTER,
            );
            fetchItems(currentFolder);
          });
        },
      );
    }
  };

  const navigateFolder = (folderName: string) => {
    if (folderName === "..") {
      navigateBack();
    } else {
      setCurrentFolder(currentFolder + folderName + "/");
    }
  };

  const navigateBack = () => {
    const pathParts = currentFolder.split("/").filter(Boolean);
    if (pathParts.length > 1) {
      pathParts.pop();
      setCurrentFolder(pathParts.join("/") + "/");
    } else {
      setCurrentFolder("files/");
    }
  };

  const downloadFile = async (fullPath: string) => {
    const fileRef = ref(storage, fullPath);
    const url = await getDownloadURL(fileRef);
    const fileUri = FileSystem.documentDirectory! + fullPath.split("/").pop();
    const { uri } = await FileSystem.downloadAsync(url, fileUri);
    ToastAndroid.show(`Baixado em: ${uri}`, ToastAndroid.CENTER);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        item.isFolder ? navigateFolder(item.name) : downloadFile(item.fullPath)
      }
    >
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Feather
          name={item.isFolder ? "folder" : "file"}
          color={isDarkTheme ? "white" : "#050505"}
          size={24}
        />
        <Text style={[ThemedStyles(isDarkTheme).text, { marginLeft: 10 }]}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView navigation={navigation}>
      <View
        style={{
          width: "100%",
          height: "93%",
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
            placeholder="Crie uma pasta. Ex: Aula01"
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
            Nome do Arquivo
          </Text>
          <TextInput
            placeholder="Digite o nome do arquivo"
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
            onChangeText={(text) => setFileName(text)}
          />
        </View>

        <View style={{ margin: "1%" }}>
          <Button title="Upload" onPress={selectDoc} color="#050505" />
        </View>

        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.fullPath}
          style={{ margin: "1%" }}
        />
      </View>
    </ThemedView>
  );
}
