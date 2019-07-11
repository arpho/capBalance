export class DateModel {
  day: number;
  month: number;
  year: number;
  constructor(d?: any) {
    if (d["day"] && d["year"] && d["month"]) {
      this.day = d["day"];
      this.month = d["month"];
      this.year = d["year"];
    } else {
      try {
        const data = new Date(d);
        this.day = data.getDate();
        this.year = data.getFullYear();
        this.month = data.getMonth();
      } catch (e) {}
    }
  }
  formatDate() {
    const mm = this.month + 1;
    const dd = this.day;
    return [this.year, (mm > 9 ? "" : "0") + mm, (dd > 9 ? "" : "0") + dd].join(
      "-"
    );
  }

  loadFromDate(d: Date) {
    this.year = d.getFullYear();
    this.month = d.getMonth();
    this.day = d.getDay();
  }
  serialize() {
    return { year: this.year, month: this.month, day: this.day };
  }
}
