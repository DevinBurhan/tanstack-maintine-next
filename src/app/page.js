import HomeComponent from "@/components/HomeComponent/HomeComponent";

import { getDummyJsonAPI } from "@/state/Dummy/dummy.api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import styles from "./page.module.css";

export default async function page() {
  // PREFECTH CODE
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ["dummyJson"],
  //   queryFn: () => getDummyJsonAPI("dummyJson"),
  // });
  return (
    // <main className={styles.main}>
    //   <HydrationBoundary state={dehydrate(queryClient)}>
    //     <HomeComponent />
    //   </HydrationBoundary>
    // </main>
    <main>
      <HomeComponent />
    </main>
  );
}
