import { Pipe, PipeTransform } from '@angular/core';

// https://stackoverflow.com/questions/45081593/convert-minutes-to-hours-in-angular2-component-or-pipe
@Pipe({
    name: 'myTime'
})
export class MyTimePipe implements PipeTransform {

    /**
     * 
     * @param value value in seconds
     */
    transform(value: number): string {
        // console.log(value);

        if (value < 60) {
            return 'Now'
        }

        if (value < 3600) { // 1 hour
            return Math.round(value / 60) + 'm';
        }

        if (value < 24 * 3600) {    // 1 day
            return Math.round(value / 3600) + 'h';
        }

        if (value < 7 * 24 * 3600) {
            return Math.round(value / (24 * 3600)) + 'd';
        }

        if (value < 52 * 7 * 24 * 3600) {
            return Math.round(value / (7 * 24 * 3600)) + 'w';
        }

        // years
        return Math.round(value / (52 * 7 * 24 * 3600)) + 'y';
    }
}