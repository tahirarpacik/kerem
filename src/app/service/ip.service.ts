import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class IpService {
  constructor(private http: HttpClient) {}

  getIp() {
    return this.http.get("https://api.ipify.org/?format=json");
  }
}
