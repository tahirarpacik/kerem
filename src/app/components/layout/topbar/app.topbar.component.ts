import { Component, OnDestroy } from "@angular/core";
import { MenuItem } from "primeng/api";
import { AppMainComponent } from "../main/app.main.component";
import { LocalStorageServiceEncrypt } from "angular-2-local-storage-encrypt";
import { UserService } from "src/app/service/user.service";
import { Platform } from "@ionic/angular";
import { Kullanici } from "src/app/models/kullanici.model";
import { KullaniciTipi } from "src/app/models/enum/kullaniciTipi.enum";
import { AuthenticationService } from "src/app/security/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-topbar",
  templateUrl: "./app.topbar.component.html",
  styleUrls: ["./app.topbar.component.scss"],
})
export class AppTopBarComponent {
  items: MenuItem[];
  currentUser: Kullanici;
  currentPage: any;
  menuVisible: boolean;
  menuItems: MenuItem[] = [
    {
      label: "Anasayfa",
      routerLink: "/",
    },
    {
      label: "Anketlerim",
      routerLink: "/anketlerim",
    },
    {
      label: "Bir Anket Başlat",
      routerLink: "/basvuru",
    },
  ];
  standartKullanici: any;
  adminKullanici: any;
  constructor(
    private platform: Platform,
    public appMain: AppMainComponent,
    private localStorageService: LocalStorageServiceEncrypt,
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.menuVisible = false;

    this.currentUser = JSON.parse(this.localStorageService.get("currentUser"));
    if (this.currentUser?.id) {
      userService.getById(this.currentUser.id).subscribe((res) => {
        this.currentUser = res;
      });
    }
    this.standartKullanici = KullaniciTipi[KullaniciTipi.STANDART];
    this.adminKullanici = KullaniciTipi[KullaniciTipi.ADMIN];

    this.items = [
      { label: "Profil", icon: "pi pi-user", routerLink: ["/profil"] },

      {
        label: "Çıkış Yap",
        icon: "pi pi-times",
        style: "",
        command: () => this.logout(),
      },
    ];
  }
  logout() {
    this.authService.logout();
  }
  changeVisibleMenu() {
    this.menuVisible = !this.menuVisible;
  }
  isMobile(): boolean {
    return this.platform.width() < 768; // mobil cihazlarda genellikle ekran boyutu 768 pikselden küçüktür
  }
}
