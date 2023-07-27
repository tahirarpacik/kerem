import { Injectable } from "@angular/core";
import { SurveySchema } from "../models/surveySchema.model";
import { SurveyResult } from "../models/surveyResult.model";

@Injectable({
  providedIn: "root",
})
export class TicketService {
  activePage = "onBilgilendirme";

  surveyIpInfo: { id: null | string }[] = [];

  surveyInfo = {
    surveyQuantity: null,
    surveySchema: null,
    surveyResult: null,
  };

  initialState() {
    // this.surveyIpInfo = [];

    this.surveyInfo = {
      surveyQuantity: new Number(),
      surveySchema: new SurveySchema(),
      surveyResult: new SurveyResult(),
    };
  }
}
