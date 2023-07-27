import { Component, OnInit } from "@angular/core";
import { MenuService } from "src/app/service/app.menu.service";
import { AppMainComponent } from "../main/app.main.component";
import { LocalStorageServiceEncrypt } from "angular-2-local-storage-encrypt";

@Component({
  selector: "app-menu",
  template: `
    <div class="layout-menu-container">
      <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
        <li
          app-menu
          class="layout-menuitem-category"
          *ngFor="let item of model; let i = index"
          [item]="item"
          [index]="i"
          [root]="true"
          role="none"
        >
          <div class="layout-menuitem-root-text" [attr.aria-label]="item.label">
            {{ item.label }}
          </div>
          <ul role="menu">
            <li
              app-menuitem
              *ngFor="let child of item.items"
              [item]="child"
              [index]="i"
              role="none"
            ></li>
          </ul>
        </li>
      </ul>
    </div>
  `,
})
export class AppMenuComponent implements OnInit {
  model: any[];

  constructor(
    public appMain: AppMainComponent,
    private menuService: MenuService,
    private localStorageService: LocalStorageServiceEncrypt
  ) {}

  ngOnInit() {
    let currentUser = JSON.parse(this.localStorageService.get("currentUser"));
    this.model = this.menuService.getModel(
      currentUser.kullaniciTipi.toString()
    );
  }

  onKeydown(event: KeyboardEvent) {
    const nodeElement = <HTMLDivElement>event.target;
    if (event.code === "Enter" || event.code === "Space") {
      nodeElement.click();
      event.preventDefault();
    }
  }
}
