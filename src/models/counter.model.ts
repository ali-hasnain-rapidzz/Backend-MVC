import { COUNTER_TYPE } from "@Constants/enum.constants";
import { CounterType } from "@Types/counter.types";
import mongoose from "mongoose";

// Create a schema for the counter
const CounterSchema = new mongoose.Schema<CounterType>({
  _id: { type: String, enum: COUNTER_TYPE, required: true },
  sequence_value: { type: Number, default: 0 },
});

export const Counter = mongoose.model<CounterType>("Counter", CounterSchema);
