import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { MyItemComponent } from "../item/item.component";
import { AlertController, ModalController } from "@ionic/angular";
import { ItemModelInterface } from "../../models/itemModelInterface";
import { ItemServiceInterface } from "../../models/ItemServiceInterface";
import { QuickAction } from "../../models/QuickAction";
import { Router } from "@angular/router";

@Component({
  selector: "app-page-item",
  templateUrl: "./page-item.page.html",
  styleUrls: ["./page-item.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageItemComponent extends MyItemComponent implements OnInit {
  @Input() Item: ItemModelInterface;
  @Input() Service: ItemServiceInterface;

  constructor(public alertCtrl: AlertController, public router: Router, public ref: ChangeDetectorRef, public modal: ModalController) {
    super(alertCtrl);
  }

  ngOnInit() {
    if (this.Item) {
      const next = () => {
        this.ref.markForCheck()
      }
      // this.Item.load(next)
    }
  }
  doAction(action: QuickAction) {
    action.getAction()({
      alertCtrl: this.alertCtrl,
      router: this.router,
      Service: this.Service,
      modal: this.modal
    });
  }
}
