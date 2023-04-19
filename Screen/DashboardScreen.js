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
import OrganizationInfoCard from "../Components/OrganizationInfoCard";
import joinInQueue from "../controller/queue.controller";
import { getCurrentUser } from "../controller/user_controller";
import axios from "axios";
import { swapQueueUrl } from "../constraints/urls";

export default function Dashboard() {
  const [orgId, setOrgId] = useState("123");
  const [showScanner, setShowScanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [organizations, setOrganizations] = useRecoilState(organizationsAtom);
  const [queueData, joinQueueLoading, joinQueueError, joinQueue] =
    joinInQueue();
  const [currentUser, setCurrentUser] = useState(null);

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

      async function fetchCurrentUser() {
        try {
          const user = await getCurrentUser();
          setCurrentUser(user.data);
        } catch (err) {
          alert("Error fetching current user");
          console.log(err);
        }
      }

      fetchCurrentUser();
    })();
  }, []);

  async function SwapQueue(swapWith) {
    try {
      console.log(`${swapQueueUrl}/${currentUser._id}/${swapWith}`);
      const response = await axios.put(
        `${swapQueueUrl}/${currentUser._id}/${swapWith}`
      );
      console.log(response);
    } catch (err) {
      alert("Error swapping queue");
      console.log(err);
    }
  }

  const handleJoinQueue = (organizationId) => {
    const queueData = {
      organization: organizationId,
      user: currentUser._id,
    };

    joinQueue(queueData);
  };

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
        <View className=" bg-gray-200">
          <View className="mt-10">
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {scannedData ? (
                getOrganization(scannedData)?.name ? (
                  // Condition when the qr is scanned and the data is an organization
                  <View className="">
                    <Header />

                    <View className="mt-10">
                      <OrganizationInfoCard
                        organizationId={getOrganization(scannedData)._id}
                        loading={false}
                      />
                    </View>

                    <Pressable
                      className="h-12 w-40 bg-black rounded-md mx-auto flex flex-row justify-center items-center px-6 mt-4"
                      onPress={() =>
                        handleJoinQueue(getOrganization(scannedData)._id, "123")
                      }
                    >
                      <View className="flex-1 flex items-center">
                        <Text className="text-white text-base font-medium">
                          Join in Queue
                        </Text>
                      </View>
                    </Pressable>

                    <Pressable
                      className="h-12 w-40 bg-black rounded-md mx-auto flex flex-row justify-center items-center px-6 mt-4"
                      onPress={() => {
                        setScannedData(null);
                        setShowScanner(true);
                      }}
                    >
                      <View className="flex-1 flex items-center">
                        <Text className="text-white text-base font-medium">
                          Scan Again
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                ) : (
                  // Condition when the qr is scanned and the data is a user
                  <View className="">
                    <Header />

                    <View className="mt-10">
                      <Text>
                        Swap Your Queue with {getOrganization(scannedData)}
                      </Text>
                    </View>

                    <Pressable
                      className="h-12 w-40 bg-black rounded-md mx-auto flex flex-row justify-center items-center px-6 mt-4"
                      onPress={() => SwapQueue(getOrganization(scannedData))}
                    >
                      <View className="flex-1 flex items-center">
                        <Text className="text-white text-base font-medium">
                          Swap Queue
                        </Text>
                      </View>
                    </Pressable>

                    <Pressable
                      className="h-12 w-40 bg-black rounded-md mx-auto flex flex-row justify-center items-center px-6 mt-4"
                      onPress={() => {
                        setScannedData(null);
                        setShowScanner(true);
                      }}
                    >
                      <View className="flex-1 flex items-center">
                        <Text className="text-white text-base font-medium">
                          Scan Again
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                )
              ) : (
                <BarCodeScanner
                  onBarCodeScanned={handleScannerResult}
                  className="h-96 w-96 mt-8"
                />
              )}
            </View>

            <TouchableHighlight
              onPress={() => {
                setShowScanner(false);
                setShowModal(!showModal);
              }}
            >
              <Text className="text-center text-xl text-blue-500 mt-28">
                Hide Modal
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
