import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { ChakraProvider } from "@chakra-ui/react";

import "./home.css"

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <ChakraProvider>

        <Feed />
        </ChakraProvider>

        <Rightbar pageType="home" />
      </div>
    </>
  );
}