"use client"

import {Center, Button, Heading, Highlight} from "@chakra-ui/react"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";


export default function Home() {
  const router = useRouter();
  const [data, setData] = useState(null);
  useEffect(() => {
  fetch("/api/oauth/redirect")
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    })
    .then(data => setData(data.message))
    .catch(error => console.error("Error fetching data:", error));
}, []);
  const handleOauth = () => {
    router.push('/api/oauth/redirect'); 
  }
  return (
    <div>
      <Center>
        <Heading size="3xl" letterSpacing="tight">
        <Highlight query="Strava" styles={{ color: "orange.600" }}>
          Connect your Strava Runs to Notion
        </Highlight>
      </Heading>
      </Center>
      <Center> 
        <Button onClick={handleOauth}>Strava OAuth </Button>
      </Center>
      <Center> {data ? data : "Loading..."} </Center>
    </div>
  )
}
