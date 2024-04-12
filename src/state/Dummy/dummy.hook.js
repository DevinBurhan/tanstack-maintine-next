import { useQuery } from "@tanstack/react-query";
import { getDummyJsonAPI } from "./dummy.api";

export const useDummyJsonHook = () => {
  return useQuery({
    queryKey: ["dummyJson"],
    queryFn: () => getDummyJsonAPI("dummyJson"),
  });
};
