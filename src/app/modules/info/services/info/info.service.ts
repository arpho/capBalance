import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root"
})
export class InfoService {
  actualVersion: string;

  constructor(public http: HttpClient, public storage: Storage) {
    this.getPackage().subscribe(data => {
      this.actualVersion = data["version"];
    });
  }

  setActualVersion4Test(v: string) {
    this.actualVersion = v;
  }
  version2Number(version: string): number | string {
    return version
      ? version
          .split(".")
          .reduce((acc, v, index) => acc + Number(v) / Math.pow(10, index), 0)
      : 0;
  }

  getPackage() {
    return this.http.get("assets/version.json");
  }
  async setActualVersion(version: string = this.actualVersion) {
    return this.storage.set("version", version);
  }
  async areThereNews() {
    const previous_version = await this.storage.get("version");
    if (!previous_version) {
      return 1; // first installation
    }
    if (
      this.version2Number(previous_version) <
      this.version2Number(this.actualVersion)
    ) {
      return 2; // new version
    }

    return 0; // no updates
  }

  async navigateTo() {
    const anyNews = await this.areThereNews();
    return anyNews > 0 ? "info/release" : "home";
  }
}
