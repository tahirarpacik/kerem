import { Base } from "./base";

export class Trigger implements Base {
  constructor(
    public name?: String,
    public cronExpression?: String,
    public loopCount?: Number,
    public running?: Boolean,
    public jsonResult?: {},
    public schemaId?: String
  ) {}
  id: string;
}
