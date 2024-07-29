import { COUNTER_TYPE } from "@Constants/enum.constants";

export interface CounterType extends Document {
  _id: COUNTER_TYPE;
  sequence_value: number;
}
