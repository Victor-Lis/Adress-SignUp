import { FinanceType } from "@/@types/FinanceType";

export default async function FinanceComponent() {
  async function getDatas() {
    const url =
    'https://real-time-finance-data.p.rapidapi.com/market-trends?trend_type=CURRENCIES&country=br&language=pt_br';
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

  return <div></div>;
}
