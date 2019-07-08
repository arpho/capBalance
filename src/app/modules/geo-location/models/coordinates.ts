export class Coordinates {
    public latitude: number;
    public longitude: number;
    public address: string;


    constructor(v?: { latitude: number, longitude: number, address: string }) {
        if (v) {
            this.latitude = v.latitude;
            this.longitude = v.longitude;
            this.address = v.address || ' to be implemented';
        }
    }

    public clone(address) {
        // tslint:disable: semicolon
        this.address = address.address
        this.latitude = address.latitude
        this.longitude = address.longitude
        return this
    }

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
}
