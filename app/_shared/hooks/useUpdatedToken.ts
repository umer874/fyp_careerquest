"use client";
import { useCallback, useEffect } from "react";
import { resetRedux, setTokens } from "utils/helper";
import { RefreshToken } from "_shared/types/auth";

export default function useUpdateToken(
  token: RefreshToken,
  effect: any,
  dependencies: string[]
) {
  let callback = () => {};
  if (effect) {
    callback = useCallback(effect, dependencies);
  }
  useEffect(() => {
    if (token?.status === 401) {
      resetRedux();
    } else if (token?.status === 200 && token?.is_token_updated) {
      setTokens(token?.token, token?.refreshToken);
      callback();
    } else {
      callback();
    }
  }, [callback]);
}
