import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { ItemModelInterface } from "src/app/modules/item/models/itemModelInterface";
import { UserModel } from "../../models/userModel";

@Component({
  selector: "app-users",
  templateUrl: "./users.page.html",
  styleUrls: ["./users.page.scss"]
})
export class UsersPage implements OnInit {
  public usersList: Array<ItemModelInterface>;
  constructor(public service: UsersService) {}

  ngOnInit() {
    if (this.service.getEntitiesList()) {
      this.service.getEntitiesList().on("value", snapshot => {
        // console.log("distribuzioni", snapshot);
        this.usersList = [];
        snapshot.forEach(snap => {
          const user = new UserModel(undefined,snap.key, this.service);
          user.load();

          this.usersList.push(user);
        });
      });
    }
  }
}
