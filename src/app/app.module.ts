import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { ChartModule } from "primeng/chart";
import { CheckboxModule } from "primeng/checkbox";
import { ToastModule } from "primeng/toast";
import { MenuModule } from "primeng/menu";
import { PasswordModule } from "primeng/password";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { DividerModule } from "primeng/divider";
import { InputMaskModule } from "primeng/inputmask";
import { DropdownModule } from "primeng/dropdown";
import { EditorModule } from "primeng/editor";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputSwitchModule } from "primeng/inputswitch";
import { ChipsModule } from "primeng/chips";
import { FileUploadModule } from "primeng/fileupload";
import { SelectButtonModule } from "primeng/selectbutton";
import { SplitButtonModule } from "primeng/splitbutton";
import { StepsModule } from "primeng/steps";
import { CardModule } from "primeng/card";
import { TableModule } from "primeng/table";
import { ToggleButtonModule } from "primeng/togglebutton";
import { CarouselModule } from "primeng/carousel";
import { ImageModule } from "primeng/image";
import { DialogModule } from "primeng/dialog";
import { MultiSelectModule } from "primeng/multiselect";
import { DialogService, DynamicDialogModule } from "primeng/dynamicdialog";
import { TabViewModule } from "primeng/tabview";
import { TimelineModule } from "primeng/timeline";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { ListboxModule } from "primeng/listbox";
import { DataViewModule } from "primeng/dataview";
import { ConfirmPopupModule } from "primeng/confirmpopup";

import { AppComponent } from "./app.component";
import { AppTopBarComponent } from "./components/layout/topbar/app.topbar.component";
import { AppFooterComponent } from "./components/layout/footer/app.footer.component";
import { AppMenuComponent } from "./components/layout/menu/app.menu.component";
import { AppMenuitemComponent } from "./components/layout/menuitem/app.menuitem.component";

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EmptyComponent } from "./components/util/empty/empty.component";

import { MenuService } from "./service/app.menu.service";
import { LoginComponent } from "./components/auth/login/login.component";
import { ErrorComponent } from "./components/util/error/error.component";
import { NotfoundComponent } from "./components/util/notfound/notfound.component";
import { AccessComponent } from "./components/util/access/access.component";
import { AppMainComponent } from "./components/layout/main/app.main.component";
import { MessageService } from "primeng/api";
import { NgxCaptchaModule } from "ngx-captcha";
import { AlertifyService } from "./service/alertify.service";
import { AuthGuard } from "./security/auth.guard";
import { AuthenticationService } from "./security/authentication.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { StepsComponent } from "./components/steps/steps.component";
import { FinalComponent } from "./components/steps/final/final.component";
import { ErrorInterceptor } from "./security/authentication.interceptor";
import { JwtInterceptor } from "./security/jwt.interceptor";
import { ViewerDialogComponent } from "./components/viewer-dialog/viewer-dialog.component";
import { OnBilgilendirmeComponent } from "./components/steps/onbilgilendirme/onbilgilendirme.component";
import { LocalStorageModule } from "angular-2-local-storage-encrypt";
import { NgxDocViewerModule } from "ngx-doc-viewer";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { AnketSonucComponent } from "./components/odeme-ekrani/anket-sonuc.component";
import { NgxLoadingModule } from "ngx-loading";
import { InteractivePaycardModule } from "ngx-interactive-paycard";
import { EllipsisPipe } from "./pipes/ellipsis.pipe";
import { InfiniteTypeDeleteModule } from "ngx-sbz-type-delete";
import { InputNumberModule } from "primeng/inputnumber";
import { SplitPipe } from "./pipes/split.pipe";
import { TicketService } from "./service/ticket.service";

import { CodeInputModule } from "angular-code-input";

import { TieredMenuModule } from "primeng/tieredmenu";
import { SidebarModule } from "primeng/sidebar";
import { AnketOlusturComponent } from "./components/steps/anket-olustur/anket-olustur.component";
import { SpeedDialModule } from "primeng/speeddial";
import { KvkkComponent } from "./kvkk/kvkk.component";
import { HizmetKosullariComponent } from "./hizmet-kosullari/hizmet-kosullari.component";
import { GizlilikKosullariComponent } from "./gizlilik-kosullari/gizlilik-kosullari.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ProgressBarModule } from "angular-progress-bar";
import { AvatarModule } from "primeng/avatar";

@NgModule({
  imports: [
    LocalStorageModule.forRoot({
      prefix: "uyusmazlik",
      storageType: "localStorage",
      encryptionActive: true,
      encryptionOptions: {
        encryptionKey: "keyForEncriptHere",
        encryptionIv: "iVHere",
        encryptionSalt: "saltHere",
      },
    }),
    AvatarModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatTooltipModule,
    MatProgressBarModule,
    ProgressBarModule,
    CodeInputModule,
    SidebarModule,
    BrowserModule,
    SpeedDialModule,
    NgxLoadingModule.forRoot({}),
    BrowserModule,
    FormsModule,
    TieredMenuModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartModule,
    MenuModule,
    PasswordModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    DividerModule,
    NgxCaptchaModule,
    InputMaskModule,
    FontAwesomeModule,
    DropdownModule,
    EditorModule,
    RadioButtonModule,
    InputSwitchModule,
    ChipsModule,
    FileUploadModule,
    SelectButtonModule,
    SplitButtonModule,
    StepsModule,
    CardModule,
    TableModule,
    ToggleButtonModule,
    CarouselModule,
    ImageModule,
    DynamicDialogModule,
    MultiSelectModule,
    DialogModule,
    TabViewModule,
    TimelineModule,
    CheckboxModule,
    ConfirmDialogModule,
    ListboxModule,
    DataViewModule,
    NgxDocViewerModule,
    OverlayPanelModule,
    InteractivePaycardModule,
    InputNumberModule,
    ConfirmPopupModule,
    InfiniteTypeDeleteModule,
    CodeInputModule.forRoot({
      codeLength: 7,
      isCharsCode: true,
    }),
  ],
  declarations: [
    AppComponent,
    AppMainComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    DashboardComponent,
    EmptyComponent,
    LoginComponent,
    ErrorComponent,
    NotfoundComponent,
    AccessComponent,
    StepsComponent,
    FinalComponent,
    ViewerDialogComponent,
    OnBilgilendirmeComponent,
    AnketSonucComponent,
    SplitPipe,
    EllipsisPipe,
    AnketOlusturComponent,
    KvkkComponent,
    HizmetKosullariComponent,
    GizlilikKosullariComponent,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MenuService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AlertifyService,
    MessageService,
    TicketService,
    AuthGuard,
    AuthenticationService,
    DialogService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
