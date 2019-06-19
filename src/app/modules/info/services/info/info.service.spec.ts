import { TestBed } from "@angular/core/testing";
import { IonicStorageModule } from "@ionic/storage";

import { InfoService } from "./info.service";
import { HttpClientModule } from "@angular/common/http";

describe("InfoService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule, IonicStorageModule.forRoot()]
    })
  );

  it("should be created", () => {
    const service: InfoService = TestBed.get(InfoService);
    expect(service).toBeTruthy();
    expect(service.getPackage()).toBeTruthy();
    // service.setActualVersion4Test("0.10.0.1")
  });
  it("should be createdconvert version to number", () => {
    const service: InfoService = TestBed.get(InfoService);
    expect(service).toBeTruthy();
    expect(service.getPackage()).toBeTruthy();
    // service.setActualVersion4Test("0.10.0.1")
    expect(service.version2Number("1.0.0.1")).toBe(1.001);
    expect(
      service.version2Number("1.0.0.1") < service.version2Number("1.0.0.2")
    ).toBeTruthy;
    expect(service.version2Number(undefined)).toBe(0);
  });
});
