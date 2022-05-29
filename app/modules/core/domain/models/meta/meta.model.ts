export enum MetaStatusEnum {
  IDLE = "IDLE",
  PENDING = "PENDING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
}

interface Meta {
  status: MetaStatusEnum;
  isError: boolean;
}

export default Meta;
