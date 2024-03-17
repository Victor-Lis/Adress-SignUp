import { TrendsType } from "./TrendsType"

export type FinanceType = {
  status: string,
  request_id: string,
  data: {
    trends: TrendsType[],
  }
}