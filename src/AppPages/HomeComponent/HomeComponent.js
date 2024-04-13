"use client";
import { useDummyJsonHook } from "@/state/Dummy/dummy.hook";
import styles from "./HomeComponent.module.css";
import { Button } from "@mantine/core";
import { useState } from "react";

const HomeComponent = () => {
  // const { data: dummyData, isLoading } = useDummyJsonHook();
  // console.log("🚀 ~ HomeComponent ~ dummyData:", dummyData);
  const [load, setLoad] = useState(false);

  return (
    <>
      <Button loading={load} color="ocean-blue">
        Home
      </Button>
      <Button color="ocean-blue" onClick={() => setLoad(!load)}>
        Loading
      </Button>
    </>
  );
};

export default HomeComponent;
