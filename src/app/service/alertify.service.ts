import { Injectable } from "@angular/core";

import { MessageService } from "primeng/api";

// declare let alertify: any;

@Injectable({
  providedIn: "root",
})
export class AlertifyService {
  constructor(private messageService: MessageService) {}

  success(message: string) {
    this.messageService.add({
      severity: "success",
      summary: "Başarılı",
      detail: message,
    });
  }

  error(message: string) {
    this.messageService.add({
      severity: "error",
      summary: "Hata",
      detail: message,
    });
  }

  info(message: string) {
    this.messageService.add({
      severity: "info",
      summary: "İnfo",
      detail: message,
    });
  }

  warning(message: string) {
    this.messageService.add({
      severity: "warn",
      summary: "Uyarı",
      detail: message,
    });
  }

  custom(summary: string, message: string) {
    this.messageService.add({
      severity: "custom",
      summary: summary,
      detail: message,
    });
  }
  stickyInfo(message: string) {
    this.messageService.add({
      severity: "info",
      summary: "Info",
      detail: message,
      sticky: true,
    });
  }
  stickySuccess(message: string) {
    this.messageService.add({
      severity: "success",
      summary: "Başarılı",
      detail: message,
      sticky: true,
    });
  }
  stickyError(message: string) {
    this.messageService.add({
      severity: "error",
      summary: "Hata",
      detail: message,
      sticky: true,
    });
  }
}
