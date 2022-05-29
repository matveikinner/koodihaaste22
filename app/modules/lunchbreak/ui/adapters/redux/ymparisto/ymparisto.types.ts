import { Meta } from "@core/domain/models";
import { Municipality } from "@lunchbreak/domain/models";

export type YmparistoState = {
  municipalities: Municipality[];
  meta: Meta;
};
