import { useState, useEffect } from "react";
import { messageUrl, ratingUrl } from "../constraints/urls";

import { refreshInterval } from "../constraints/urls";

const useFetchRatings = (organizationId) => {
  const [ratings, setRatings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${ratingUrl}/${organizationId}`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch messages with status code: ${response.status}`
          );
        }

        const data = await response.json();
        setRatings(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();

    // Set interval to refresh organizations if refreshInterval is provided
    if (refreshInterval) {
      const interval = setInterval(fetchRatings, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval]);

  return { ratings, loading, error };
};

export default useFetchRatings;
