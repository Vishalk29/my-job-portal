import { useSession } from "@clerk/clerk-react";
import React, { useState } from "react";

export const useFetch = (callbackfn, option = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const { session } = useSession();

  const fetchfn = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });
      const response = await callbackfn(supabaseAccessToken, option, ...args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { fetchfn, data, loading, error };
};
