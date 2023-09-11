import mongoose, { models, Schema } from 'mongoose';

// Auto Increment를 구현하기 위한 코드

export const CounterSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
});

const Counter = models?.Counter || mongoose.model('Counter', CounterSchema);

export enum AdjustTypes {
  Increment = 'INC',
  Decrement = 'DEC',
}

export async function adjustSequenceValue(
  sequenceName: string,
  adjustTypes: AdjustTypes
) {
  let sequenceDocument;

  switch (adjustTypes) {
    case AdjustTypes.Increment:
      sequenceDocument = await Counter.findByIdAndUpdate(
        sequenceName,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      break;
    case AdjustTypes.Decrement:
      sequenceDocument = await Counter.findByIdAndUpdate(
        sequenceName,
        { $inc: { seq: -1 } },
        { new: true, upsert: true }
      );
      break;
  }

  return sequenceDocument.seq;
}

export async function backSequenceValue(sequenceName: string) {
  const sequenceDocument = await Counter.findByIdAndUpdate(
    sequenceName,
    { $inc: { seq: -1 } },
    { new: true, upsert: true }
  );

  return sequenceDocument.seq;
}

export default Counter;
