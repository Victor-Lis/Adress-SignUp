import { AdressType } from "@/@types/AdressType";
import { FinanceType } from "@/@types/FinanceType";
import { RiMoneyDollarBoxFill, RiMoneyEuroBoxFill } from "react-icons/ri";

export default async function FinanceComponent({adress}:{adress: AdressType}) {
  async function getDatas() {
    const url =
    `https://real-time-finance-data.p.rapidapi.com/market-trends?trend_type=CURRENCIES&country=br&language=pt_br`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b7c4441c2emsh836178972adaec9p19716djsnde3452a6651c",
        "X-RapidAPI-Host": "real-time-finance-data.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(url, options);
      const result: FinanceType = await response.json();
      result.data.trends = result?.data.trends.filter((trend) => trend.from_symbol === 'USD' || trend.from_symbol === 'EUR');
      return result
    } catch (error) {
      console.error(error);
    }
  }

  const result = await getDatas();

  return (
  <div
      style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
      className="flex flex-col bg-white px-5 py-3 justify-center items-start flex-1"
    >
      <h1 className="text-3xl text-bold text-items-start rounded px-2">Finanças</h1>
      <div className="flex justify-center items-center flex-wrap">
        <div className="flex flex-wrap justify-center items-start flex-1">
          <div className="flex items-center justify-center mx-2">
            <RiMoneyDollarBoxFill size={35} color="#128312"/>
            <h2 className="mr-2 font-bold ">Real para Dollar</h2>
            <h4 className="">R${result?.data.trends.find(trend => trend.from_symbol === 'USD')?.previous_close}</h4>
          </div>
          <div className="flex items-center justify-center mx-2">
            <RiMoneyEuroBoxFill size={35} color="#128312"/>
            <h2 className="mr-2 font-bold ">Real para Euro</h2>
            <h4 className="">R${result?.data.trends.find(trend => trend.from_symbol === 'EUR')?.previous_close}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}
