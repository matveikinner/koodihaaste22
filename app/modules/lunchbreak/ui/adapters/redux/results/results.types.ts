import { Meta } from "@core/domain/models";
import { Result } from "@lunchbreak/domain/models";

export type ResultsState = {
  results: { date: string; results: Result[] }[];
  meta: Meta;
};
