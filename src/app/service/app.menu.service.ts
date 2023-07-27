import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Kullanici } from "../models/kullanici.model";
import { KullaniciTipi } from "../models/enum/kullaniciTipi.enum";

@Injectable()
export class MenuService {
  private menuSource = new Subject<string>();
  private resetSource = new Subject();

  menuSource$ = this.menuSource.asObservable();
  resetSource$ = this.resetSource.asObservable();

  onMenuStateChange(key: string) {
    this.menuSource.next(key);
  }

  reset() {
    this.resetSource.next(true);
  }

  getModel(userType): any[] {
    let model: any[] = [];
    if (userType == "STANDART") {
      return (model = [
        {
          items: [
            {
              label: "Anasayfa",
              icon: "pi pi-fw pi-home",
              routerLink: ["/"],
            },
            {
              label: "Başvurularım",
              icon: "pi pi-folder",
              routerLink: ["/basvurularim"],
            },
            {
              label: "Başvuru Ekranı",
              icon: "pi pi-plus",
              routerLink: ["/basvuru"],
            },
            {
              label: "Karşı Taraf",
              icon: "pi pi-briefcase",
              routerLink: ["/ktbasvurular"],
            },
          ],
        },
      ]);
    } else if (userType == "ADMIN") {
      return (model = [
        {
          items: [
            {
              label: "Yetkili Ekle",
              icon: "pi pi-user",
              routerLink: ["/hakemEkle", -1],
            },
            {
              label: "Hakem Listesi",
              icon: "pi pi-user",
              routerLink: ["/hakemListesi"],
            },
            {
              label: "Başvurular",
              icon: "pi pi-folder",
              routerLink: ["/basvurular"],
            },
            {
              label: "Kullanıcılar",
              icon: "pi pi-plus",
              routerLink: ["/kullanicilar"],
            },
            { label: "Trabis", icon: "pi pi-search", routerLink: ["/trabis"] },
            {
              label: "Mail",
              icon: "pi pi-send",
              routerLink: ["/mail-kontrol"],
            },
            {
              label: "Whois",
              icon: "pi pi-question",
              routerLink: ["/whois"],
            },
          ],
        },
      ]);
    } else if (userType == "PANEL_SORUMLUSU") {
      return (model = [
        {
          items: [
            {
              label: "Hakem Ekle",
              icon: "pi pi-user",
              routerLink: ["/hakemEkle", -1],
            },
            {
              label: "Hakem Listesi",
              icon: "pi pi-user",
              routerLink: ["/hakemListesi"],
            },
            {
              label: "Başvurular",
              icon: "pi pi-folder",
              routerLink: ["/basvurular"],
            },
            {
              label: "Kullanıcılar",
              icon: "pi pi-plus",
              routerLink: ["/kullanicilar"],
            },
            { label: "Trabis", icon: "pi pi-search", routerLink: ["/trabis"] },
            // {
            //   label: "Mail",
            //   icon: "pi pi-send",
            //   routerLink: ["/mail-kontrol"],
            // },
            {
              label: "Whois",
              icon: "pi pi-question",
              routerLink: ["/whois"],
            },
          ],
        },
      ]);
    } else if (userType == "HAKEM") {
      return (model = [
        {
          items: [
            {
              label: "Başvurular",
              icon: "pi pi-folder",
              routerLink: ["/hakem-basvurular"],
            },
            { label: "Trabis", icon: "pi pi-search", routerLink: ["/trabis"] },
            {
              label: "Whois",
              icon: "pi pi-question",
              routerLink: ["/whois"],
            },
          ],
        },
      ]);
    } else return null;
  }
}
