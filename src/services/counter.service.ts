import { COUNTER_TYPE } from "@Constants/enum.constants";
import { Counter } from "@Models/counter.model";

class CounterServiceClass {
  // Function to generate the next sequence value with the desired format
  getNextSequenceValue = async (
    counterName: COUNTER_TYPE,
    customMiddlePrefix?: string,
  ): Promise<string> => {
    const sequenceDocument = await Counter.findOneAndUpdate(
      { _id: counterName },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true },
    );

    const sequenceValue = sequenceDocument.sequence_value.toString();
    const sequenceLength = sequenceValue.length;
    const paddedSequenceValue = sequenceValue.padStart(Math.max(7 - sequenceLength, 0), "0");
    const formattedSequenceValue = `U${paddedSequenceValue.slice(0, 3)}${
      customMiddlePrefix || "p"
    }${paddedSequenceValue.slice(3)}`;

    return formattedSequenceValue;
  };
}

export const CounterService = new CounterServiceClass();
