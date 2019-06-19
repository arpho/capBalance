export class Value {
  label: string;
  value: string | Number | Boolean;

  constructor(args: { value: string | Number | Boolean; label: string }) {
    this.label = args.label;
    this.value = args.value;
  }
}
