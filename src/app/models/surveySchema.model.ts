import { Base } from "./base";
import { AnketTipi } from "./enum/AnketTipi.enum";
import { SurveyResult } from "./surveyResult.model";

export class SurveySchema implements Base {
  constructor(
    public name?: String,
    public olusturan?: String,
    public content?: string,
    public description?: String,
    public base64Image?: string,
    public email_verification?: Boolean,
    public phone_verification?: Boolean,
    public ip_verification?: Boolean,
    public sonuclari_goster?: Boolean,
    public ankettipi?: AnketTipi,
    public shareCode?: String,
    public surveyResults?: SurveyResult[],
    public surveyResultQuantity?: Number
  ) {}
  id: string;
}
