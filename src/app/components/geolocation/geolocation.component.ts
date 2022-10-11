import { Component, OnInit, ViewChild } from '@angular/core';
import NavigatorHelper from 'src/app/libs/helpers/navigator.helper';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss']
})
export class GeolocationComponent implements OnInit {

  position: any = {}
  err: any = {}
  time: any = ''

  constructor() { }

  ngOnInit(): void {
    NavigatorHelper.getDevices()
  }

  getLocation(){
    // NavigatorHelper.getLocation().then(res => {
    //   console.log('Position: ', res);
      
    // }).catch(err => {
    //   console.error('Error: ', err);
      
    // })

    NavigatorHelper.getLocationC((pos) => {
      console.log('Position: ', pos);
      this.position = {
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
        time: pos.timestamp
      }
      this.time = new Date(pos.timestamp).toLocaleDateString()
      console.log(pos.timestamp);
      
      
    }, (err) => {
      console.error('Error: ', err);
      this.err = err
    })
  }

  startVideo(el: HTMLVideoElement, btn: HTMLElement){
    NavigatorHelper.startRecord(el, btn)
  }

  startAudio(el: HTMLAudioElement, btn: HTMLElement){
    NavigatorHelper.startAudio(el, btn)
  }



}
