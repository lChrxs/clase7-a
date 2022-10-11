export default class NavigatorHelper{

  static getLocation(): Promise<any>{
    let options: PositionOptions = {
      timeout: 7
    }

    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(pos => {
        // console.log('Posicion: ', pos);
        resolve(pos)
         
      }, (err => {
            // console.error('Error: ', err);
            reject(err)
  
        })
      )
    })

  }

  static getLocationC(success: (position: any)=>void, error: (err: any)=>void): void {
    navigator.geolocation.getCurrentPosition(pos => {
      success(pos)
    }, err => {
      error(err)
    })
  }

  static startRecord(video: HTMLVideoElement, btn: HTMLElement){
    let usrMediaOpts: MediaStreamConstraints = {
      video: {
        width: 800, 
        height: 600,
        deviceId: {
          exact: 'c45292aded49506a38739739ba19d3fc4b671d56c69ea6e461110dc3aa328ec9'
        }
      },
      // audio: true
    }

    let mediaRecorderOpts: MediaRecorderOptions = {
      mimeType: 'video/webm',
      
    }

    navigator.mediaDevices.getUserMedia(usrMediaOpts).then(mediaStr => {
      console.log(mediaStr);
      video.srcObject = mediaStr

      video.onloadedmetadata = () => {

        video.play()
        let data: any[] = []
        const redcorder = new MediaRecorder(mediaStr, mediaRecorderOpts)

        redcorder.ondataavailable = (e) => {
          console.log('onDataAvaliable')
          data.push(e.data)
        }

        redcorder.onstop = () => {
          console.log('onStop');
          const blob = new Blob(data, {type: 'video/webm'})
          //const file = new FileReader()
          //file.readAsDataURL(blob)
          
          //file.onloadend = () => {
            //console.log('File: ', file.result);
            
          //}
          const url = URL.createObjectURL(blob)
          const elA = document.createElement("a")
          document.body.appendChild(elA)
          elA.href = url
          elA.download = "video.webm"
          elA.click()
          console.log(URL.createObjectURL(blob));
        }
        
        setTimeout(() => {
          console.log('onStart');
          redcorder.start()
        }, 10);

        btn.addEventListener('click', () => {

          console.log('Record stopped');
          redcorder.stop()
        })

      }
    })
  }


  static getDevices(){
    console.log(navigator.mediaDevices.enumerateDevices());
    navigator.mediaDevices.enumerateDevices().then(res => {
      res.forEach(item => {

        if(item.kind === 'videoinput') console.log(item);
        
      })
    })
  }


  static startAudio(el: HTMLAudioElement, btn: HTMLElement){
    let usrMediaOpts: MediaStreamConstraints = {
      video: false,
      audio: true
    }

    navigator.mediaDevices.getUserMedia(usrMediaOpts).then(mediaStr => {
      let data: any[] = []

      el.srcObject = mediaStr
      el.onloadedmetadata = (res) => {
        el.play()
        const record = new MediaRecorder(mediaStr, {mimeType: 'audio/webm'})
        
        record.ondataavailable = (e) => {
          data.push(e.data)
        }

        record.onstop = (e) => {
          const blob = new Blob(data, {type: 'audio/webm'})
          const url = URL.createObjectURL(blob)
          const elA = document.createElement("a")
          document.body.appendChild(elA)
          elA.href = url
          elA.download = "audio.webm"
          elA.click()
          console.log(URL.createObjectURL(blob));
        }

        setTimeout(() => {
          console.log('onStart');
          record.start()
        }, 10);

        btn.addEventListener('click', () => {

          console.log('Record stopped');
          record.stop()
        })

      }
    })
  }

}