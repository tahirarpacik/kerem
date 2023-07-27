import { Component, OnInit } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: "app-pdf-viewer-dialog",
  templateUrl: "./viewer-dialog.component.html",
  styleUrls: ["./viewer-dialog.component.scss"],
})
export class ViewerDialogComponent implements OnInit {
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}
  content: any;
  type: any;
  url: any;

  ngOnInit(): void {
    this.content = this.config.data.content;
    this.type = this.config.data.type;
    // response.data -> response data base64 encoded
    // decoding the data via atob()
    const byteArray = new Uint8Array(
      atob(this.content)
        .split("")
        .map(char => char.charCodeAt(0))
    );
    let blob = new Blob([byteArray], { type: this.type });

    // Here is your URL you can use
    this.url = window.URL.createObjectURL(blob);

    // i.e. display the PDF content via iframe
    // document.querySelector("iframe").src = url;
  }
}
