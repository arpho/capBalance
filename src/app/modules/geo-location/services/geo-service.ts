import { Injectable } from '@angular/core';
import { Plugins, GeolocationOptions, GeolocationPosition } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { configs } from '../../../configs/credentials';

const { Geolocation } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  private timeoutExpired: boolean;
  private oldLocation: GeolocationPosition;


  constructor(public http: HttpClient) {
    this.timeoutExpired = true;
  }


  makeUrl(lat, long) {
    return 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
      .concat(lat).concat(',').concat(long).concat('&key=').concat(configs.google.api_key);
  }

  inverseGeoLocation(lat, long) {
    const url = this.makeUrl(lat, long);
    return this.http.get(url);
  }
  /**
   *set a timeout
   @param t: number timeout in millisecs
   @boolean: returns true when   the timeout is set, otherwise return false
   *
   * @param {number} t
   * @returns
   * @memberof GeoService
   */
  setTimeout(t: number) {

    if (this.timeoutExpired) {
      setTimeout(() => {
        this.timeoutExpired = true;
      }, t);
      this.timeoutExpired = false;
      return true;
    } else {
      return false;
    }


  }

  async getPosition() {

    const options: GeolocationOptions = {};
    options.enableHighAccuracy = true;
    if (this.setTimeout(300000)) {
      this.oldLocation = await Geolocation.getCurrentPosition(options);
      return this.oldLocation;
    } else {
      return this.oldLocation;
    }
  }
}
