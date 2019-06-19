export class Coordinates {
    public latitude: number;
    public longitude: number;
    public address: string;

    public getLatitude() {
        return this.latitude;
    }
    public getLongitude() {
        return this.longitude;
    }
    setLatitude(latitude: string | number) {
        this.latitude = Number(latitude);
    }

    setLongitude(longitude: string | number) {
        this.longitude = Number(longitude);
    }
    getAddress(): string {
        return this.address;
    }
    constructor(v: { latitude: number, longitude: number, address: string }) {
        this.latitude = v.latitude;
        this.longitude = v.longitude;
        this.address = v.address || ' to be implemented';
    }
}
