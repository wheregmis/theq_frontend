import { useState } from "react";
import axios from "axios";
import { queueRouteURL } from "../constraints/urls";

function joinInQueue() {
  const [queueData, setQueueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const joinQueue = async (queueData) => {
    setLoading(true);
    try {
      const response = await axios.post(queueRouteURL, {
        user: queueData.user,
        organization: queueData.organization,
      });
      if (response.status === 200) {
        setQueueData(response.data);
        setLoading(false);
      }
      // todo: Store the token in the local storage
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return [queueData, loading, error, joinQueue];
}

export default joinInQueue;
