import { useState, useEffect } from "react";
import { organizationRouteURL } from "../constraints/urls";
import { useRecoilState } from "recoil";
import { organizationAtom, organizationsAtom } from "../state/atoms";
import { refreshInterval } from "../constraints/urls";

const useFetchOrganizations = () => {
  const [organizations, setOrganizations] = useRecoilState(organizationsAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        const response = await fetch(organizationRouteURL);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch organizations with status code: ${response.status}`
          );
        }

        const data = await response.json();
        setOrganizations(data.data);
      } catch (err) {
        alert("Error fetching organizations");
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();

    // Set interval to refresh organizations if refreshInterval is provided
    if (refreshInterval) {
      const interval = setInterval(fetchOrganizations, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval]);

  return { organizations, loading, error };
};

const useFetchOrganization = (organizationId) => {
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${organizationRouteURL}/${organizationId}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch organization with status code: ${response.status}`
          );
        }

        const data = await response.json();
        setOrganization(data.data);
      } catch (err) {
        alert("Error fetching organization");
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (organizationId) {
      // Set interval to refresh organizations if refreshInterval is provided
      if (refreshInterval) {
        const interval = setInterval(fetchOrganization, refreshInterval);
        return () => clearInterval(interval);
      }
    }
  }, [organizationId]);

  return { organization, loading, error };
};

export default useFetchOrganizations;
export { useFetchOrganization };
