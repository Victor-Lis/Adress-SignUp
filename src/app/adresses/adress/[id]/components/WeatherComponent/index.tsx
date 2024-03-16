import { MdOutlineSubtitles } from "react-icons/md";
import { FaTemperatureArrowDown, FaTemperatureArrowUp, FaTemperatureHalf } from "react-icons/fa6";
import { WeatherType } from "@/@types/WeatherType";
import { firstLetterUpperCase } from "@/app/utils/firstLetterUpperCase";

export default function WeatherComponent({ weather }: { weather: WeatherType | undefined }) {
  return (
    <div
      style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
      className="flex justify-center items-center flex-wrap bg-white px-5 py-2"
    >
      <div className="flex flex-wrap justify-center items-start mt-5 flex-1">
        <div className="flex items-center justify-center mx-2">
          <MdOutlineSubtitles size={25} color="#3b3b3b" className="mx-1" />
          <h3 className="text-items-start py-2 rounded">
            <strong>Descrição </strong>
            {firstLetterUpperCase(weather?.weather[0].description as string)}
          </h3>
        </div>
        <div className="flex items-center justify-center mx-2">
          <FaTemperatureArrowDown size={25} color="#5552df" className="mx-1" />
          <h3 className="text-items-start py-2 rounded">
            <strong>Temperatura Mínima </strong>
            {weather?.main.temp_min as number}°C
          </h3>
        </div>
        <div className="flex items-center justify-center mx-2">
          <FaTemperatureArrowUp size={25} color="#e0be70" className="mx-1" />
          <h3 className="text-items-start py-2 rounded">
            <strong>Temperatura Máxima </strong>
            {weather?.main.temp_max as number}°C
          </h3>
        </div>
        <div className="flex items-center justify-center mx-2">
          <FaTemperatureHalf size={25} color="#ff0000" />
          <h3 className="text-items-start py-2 rounded">
            <strong>Temperatura </strong>
            {weather?.main.temp as number}°C
          </h3>
        </div>
        <div className="flex items-center justify-center mx-2">
          <FaTemperatureHalf size={25} color="#7fc8a8" className="mx-1" />
          <h3 className="text-items-start py-2 rounded">
            <strong>Sensação Térmica </strong>
            {weather?.main.feels_like as number}°C
          </h3>
        </div>
      </div>
    </div>
  );
}
