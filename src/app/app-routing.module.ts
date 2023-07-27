import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { ErrorComponent } from "./components/util/error/error.component";
import { NotfoundComponent } from "./components/util/notfound/notfound.component";
import { AccessComponent } from "./components/util/access/access.component";
import { AppMainComponent } from "./components/layout/main/app.main.component";
import { AuthGuard } from "./security/auth.guard";
import { StepsComponent } from "./components/steps/steps.component";

import { FinalComponent } from "./components/steps/final/final.component";
import { OnBilgilendirmeComponent } from "./components/steps/onbilgilendirme/onbilgilendirme.component";
import { AnketSonucComponent } from "./components/odeme-ekrani/anket-sonuc.component";

// survey components
import { AnketOlusturComponent } from "./components/steps/anket-olustur/anket-olustur.component";
import { KvkkComponent } from "./kvkk/kvkk.component";
import { GizlilikKosullariComponent } from "./gizlilik-kosullari/gizlilik-kosullari.component";
import { HizmetKosullariComponent } from "./hizmet-kosullari/hizmet-kosullari.component";
// @ts-ignore
@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: "",
          component: AppMainComponent,
          children: [
            { path: "", redirectTo: "/", pathMatch: "full" },
            {
              path: "",
              component: DashboardComponent,
            },
            {
              path: "kvkk",
              component: KvkkComponent,
            },
            {
              path: "gizlilik-kosullari",
              component: GizlilikKosullariComponent,
            },
            {
              path: "hizmet-kosullari",
              component: HizmetKosullariComponent,
            },
            {
              path: "anketSonuc",
              component: AnketSonucComponent,
              canActivate: [AuthGuard],
            },
            {
              path: "anketOlustur",
              component: StepsComponent,
              children: [
                {
                  path: "",
                  redirectTo: "onBilgilendirme",
                  pathMatch: "full",
                },
                {
                  path: "onBilgilendirme",
                  component: OnBilgilendirmeComponent,
                },
                {
                  path: "creator",
                  component: AnketOlusturComponent,
                },
                {
                  path: "final",
                  component: FinalComponent,
                },
              ],
              data: { role: "STANDART-ADMIN" },
              canActivate: [AuthGuard],
            },
          ],
        },
        { path: "", redirectTo: "", pathMatch: "full" },
        { path: "dashboard", redirectTo: "/", pathMatch: "full" },
        { path: "login", component: LoginComponent },
        { path: "error", component: ErrorComponent },
        { path: "notfound", component: NotfoundComponent },
        { path: "access", component: AccessComponent },
        { path: "**", redirectTo: "notfound" },
      ],
      {
        scrollPositionRestoration: "enabled",
        anchorScrolling: "enabled",
        useHash: false,
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
