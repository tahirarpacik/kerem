import { Base } from "./base";
import { SurveySchema } from "./surveySchema.model";

export class SurveyResult implements Base {
  constructor(public content?: {}, public surveysSchemas?: SurveySchema) {}
  id: string;
}
