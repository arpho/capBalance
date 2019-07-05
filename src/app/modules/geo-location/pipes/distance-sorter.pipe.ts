import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'distanceSorter'
})
export class DistanceSorterPipe implements PipeTransform {

  public distance(lat1, lon1, lat2, lon2) {
    const p = 0.017453292519943295;    // Math.PI / 180
    const c = Math.cos;
    const a = 0.5 - c((lat2 - lat1) * p) / 2 +
      c(lat1 * p) * c(lat2 * p) *
      (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }


  transform(value: [any], location: { longitude: number, latitude: number }) { // uso any per renderlo riutilizzabile
    if (value && location) {
      return value.sort((a: any, b: { longitude: number, latitude: number }) => {
        return this.distance(a.latitude, a.longitude, location.latitude, location.longitude) -
          this.distance(b.latitude, b.longitude, location.latitude, location.longitude);
      });
    } else {
      return value;
    }
  }
}



