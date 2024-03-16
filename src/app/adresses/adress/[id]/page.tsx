"use server";

import React from "react";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Button from "./components/Button";
import { WeatherType } from "@/@types/WeatherType";

import { MdOutlineSubtitles } from "react-icons/md";
import { FaTemperatureArrowDown, FaTemperatureArrowUp, FaTemperatureHalf } from "react-icons/fa6";
import Header from "./components/Header";
import { AdressType } from "@/@types/AdressType";
import AdressComponent from "./components/AdressComponent";
import WeatherComponent from "./components/WeatherComponent";

type Params = {
  id: string | undefined;
};

export default async function Adress({ params }: { params: Params }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !params.id) {
    redirect("/");
  }

  const adress = await prisma.endereco
    .findFirst({
      where: {
        uid: params.id,
      },
    })
    .then(async (endereco) => {
      if (!endereco) redirect("/adresses");
      return endereco;
    })
    .catch((e) => {
      redirect("/adresses");
    });

  async function getWeather({ city }: { city: string }) {
    let data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_KEY}&lang=pt_br&units=metric`
    ).then((res) => res.json());
    return data;
  }

  let weather: WeatherType | undefined = await getWeather({
    city: adress.localidade,
  });

  return (
    <main className="w-full flex flex-col justify-start min-h-[calc(100vh-90px)] bg-zinc-900">
      <div className="w-11/12 mx-auto p-5">
        <Header adress={adress as AdressType}/>
        <AdressComponent adress={adress as AdressType}/>
        <WeatherComponent weather={weather as WeatherType | undefined}/>
        <Button id={params.id} />
      </div>
    </main>
  );
}
