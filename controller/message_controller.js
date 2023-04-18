import { useState, useEffect } from "react";
import { messageUrl } from "../constraints/urls";

import { refreshInterval } from "../constraints/urls";

const useFetchMessage = (organizationId) => {
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${messageUrl}/${organizationId}`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch messages with status code: ${response.status}`
          );
        }

        const data = await response.json();
        setMessages(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Set interval to refresh organizations if refreshInterval is provided
    if (refreshInterval) {
      const interval = setInterval(fetchMessages, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval]);

  return { messages, loading, error };
};

export default useFetchMessage;
