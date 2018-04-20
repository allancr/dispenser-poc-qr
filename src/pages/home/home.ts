import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  qrContent: any;

  constructor(public navCtrl: NavController, navParams: NavParams, private qrScanner: QRScanner, public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            this.qrContent = text;
            
            let alert = this.alertCtrl.create({
              title: 'QR code',
              subTitle: this.qrContent,
              buttons: [
                {
                  text: 'OK!',
                  handler: () => {
                    console.log('Disagree clicked');
                    this.navCtrl.setRoot(HomePage);
                  }
                }]
            });
            alert.present();

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

          // show camera preview
          this.qrScanner.show();

          // wait for user to scan something, then the observable callback will be called
        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.error('Error is', e));
  }

  ionViewDidLeave() {
    this.qrScanner.hide(); // hide camera preview
  }

}
