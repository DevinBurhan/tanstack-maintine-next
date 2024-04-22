import { getDummyJsonAPI } from "@/state/Dummy/dummy.api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import styles from "./page.module.css";
import HomeComponent from "@/AppPages/HomeComponent/HomeComponent";
import { Navbar } from "@/AppPages/Navbar/Navbar";

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
      {/* <HomeComponent /> */}
      <Navbar />
    </main>
  );
}
