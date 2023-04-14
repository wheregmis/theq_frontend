import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Button,
} from "react-native";
import Header from "../Components/Header";
import SearchComponent from "../Components/SearchComponent";
import OrganizationList from "../Components/OrganizationList";
import YourQueueComponent from "../Components/YourQueue";
import { CameraIcon } from "react-native-heroicons/outline";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import QRCode from "react-native-qrcode-svg";
import { useRecoilState } from "recoil";
import { organizationsAtom } from "../state/atoms";

export default function Dashboard() {
  const [orgId, setOrgId] = useState("123");
  const [showScanner, setShowScanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [organizations, setOrganizations] = useRecoilState(organizationsAtom);

  const handleScannerResult = ({ type, data }) => {
    setScannedData(data);
    setShowScanner(false);
  };

  function getOrganization(scannedData) {
    const organization = JSON.parse(scannedData);
    console.log(organization);
    if (organization.organization) {
      return organizations.find((org) => org._id == organization.organization);
    } else {
      return organization.user;
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
    })();
  }, []);
  return (
    <ScrollView>
      <View className="flex flex-col items-center justify-center">
        <Header />
        <SearchComponent />
        <View className="flex flex-row items-center justify-center">
          <Text className="text-md font-bold text-start mt-5">
            Nearby Organizations
          </Text>
          <Pressable
            className="mt-4 ml-3"
            onPress={() => {
              setScannedData(null);
              setShowModal(true);
            }}
          >
            <CameraIcon className="h-6 w-6 text-green-700" />
          </Pressable>
        </View>
        <OrganizationList />

        <View>
          <Text className="text-md font-bold text-start mt-5">
            Your Current Queue
          </Text>
          <YourQueueComponent />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={{ marginTop: 50 }}>
          <View className="mt-10">
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <>
                <QRCode
                  value={orgId}
                  size={200}
                  backgroundColor="white"
                  color="black"
                  logoSize={50}
                  logoBackgroundColor="transparent"
                />
                <Button
                  className="mt-10"
                  title="Scan QR code To Swap Queue"
                  onPress={() => setShowScanner(true)}
                />
              </>

              <BarCodeScanner
                onBarCodeScanned={handleScannerResult}
                className="h-96 w-96 mt-8"
              />

              <>
                <Text style={{ fontSize: 16, marginVertical: 10 }}>
                  {scannedData
                    ? `Join the Queue for the following: ${
                        getOrganization(scannedData)?.name
                          ? getOrganization(scannedData).name
                          : "Swap with User with userId " +
                            getOrganization(scannedData)
                      }`
                    : ""}
                </Text>
              </>
            </View>

            <TouchableHighlight
              onPress={() => {
                setShowModal(!showModal);
              }}
            >
              <Text className="text-center text-3xl text-blue-400 mt-8">
                Hide Modal
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
