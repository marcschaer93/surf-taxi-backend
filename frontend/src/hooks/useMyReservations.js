import { useState, useEffect } from "react";

import * as UserApi from "../api/services/UserApi";
import { useAuthContext } from "../context/authProvider";

export const useMyReservations = () => {
  const { user } = useAuthContext();
  const [myReservations, setMyReservations] = useState([]);
  const [loadingMyReservations, setLoadingMyReservations] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myReservationsData = await UserApi.getAllUserReservations(
          user.username
        );
        setMyReservations(myReservationsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingMyReservations(false);
      }
    };

    fetchData();
  }, [user]);

  return {
    myReservations,
    setMyReservations,
    loadingMyReservations,
  };
};
