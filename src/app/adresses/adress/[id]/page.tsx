"use server";

import React from "react";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Button from "./components/Button";
import { WeatherType } from "@/@types/WeatherType";

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

  const firstLetterUpperCase = (string: string) =>
    string[0].toUpperCase() + string.slice(1, string.length).toLowerCase();

  return (
    <main className="w-full flex flex-col justify-start min-h-[calc(100vh-90px)] bg-zinc-900">
      <div className="w-11/12 mx-auto p-5">
        <header className="w-full flex items-center justify-start">
          <h2 className="text-blue-600 text-3xl py-2 px-5 bg-white rounded">
            {adress.cep}
          </h2>
        </header>
        <div
          style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
          className="flex justify-center items-center flex-wrap bg-white px-5 py-2 mt-2"
        >
          <div className="flex flex-col justify-center items-start mt-5 flex-1">
            <h3 className="text-items-start p-2 rounded"><strong>Logradouro </strong>{adress.logradouro}</h3>
            <h3 className="text-items-start p-2 rounded"><strong>Bairro </strong>{adress.bairro}</h3>
            <h3 className="text-items-start p-2 rounded"><strong>Localidade </strong>{adress.localidade}</h3>
            <h3 className="text-items-start p-2 rounded"><strong>Estado </strong>{adress.uf}</h3>
            <h3 className="text-items-start p-2 rounded"><strong>DDD </strong>{adress.ddd}</h3>
            <h3 className="text-items-start p-2 rounded"><strong>IBGE </strong>{adress.ibge}</h3>
            <h3 className="text-items-start p-2 rounded"><strong>SIAFI </strong>{adress.siafi}</h3>
          </div>
          <iframe
            className="flex-1 h-full min-h-[250px] max-[400px]:hidden border-black border-[1.5px]"
            id="gmap_canvas"
            src={`https://maps.google.com/maps?q=${adress.bairro}%2C+${adress.localidade}&t=&z=20&ie=UTF8&iwloc=&output=embed`}
          ></iframe>
        </div>
        <div
          style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
          className="flex justify-center items-center flex-wrap bg-white px-5 py-2"
        >
          <div className="flex flex-wrap justify-center items-start mt-5 flex-1">
            <h3 className="text-items-start p-2 rounded"><strong>Descrição </strong>{firstLetterUpperCase(weather?.weather[0].description as string)}</h3>
            <h3 className="text-items-start p-2 rounded"><strong>Temperatura Mínima </strong>{weather?.main.temp_min as number}°C</h3>
            <h3 className="text-items-start p-2 rounded"><strong>Temperatura </strong>{weather?.main.temp as number}°C</h3>
            <h3 className="text-items-start p-2 rounded"><strong>Temperatura Máxima </strong>{weather?.main.temp_max as number}°C</h3>
            <h3 className="text-items-start p-2 rounded"><strong>Sensação Térmica </strong>{weather?.main.feels_like as number}°C</h3>
          </div>
        </div>
        <Button id={params.id} />
      </div>
    </main>
  );
}
