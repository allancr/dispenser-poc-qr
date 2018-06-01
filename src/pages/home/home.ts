import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  qrContent: any;

  constructor(public navCtrl: NavController, private qrScanner: QRScanner, public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.qrScanner.prepare() // Solicita permissão para acesso aos recursos da câmera.
      .then((status: QRScannerStatus) => {
        if (status.authorized) { // Acesso concedido.
          let scanSub = this.qrScanner.scan().subscribe((text: string) => { // Inicio o scanner.
            this.qrContent = text; // A leitura foi efetuada com sucesso.
            
            let alert = this.alertCtrl.create({ // Manipulo o resultado exibindo em uma janela de alerta ao usuário.
              title: 'QR code',
              subTitle: this.qrContent,
              buttons: [
                {
                  text: 'OK!',
                  handler: () => {
                    this.navCtrl.setRoot(HomePage);
                  }
                }]
            });
            alert.present();

            this.qrScanner.hide(); // Escondo a preview da câmera.
            scanSub.unsubscribe(); // Paro o serviço de scanner.
          });

          this.qrScanner.show(); // Exibe a preview da câmera para o usuário.
        } else if (status.denied) {
          // O acesso à câmera foi negado, tratar fluxo alternativo.
        } else {
          // O acesso à câmera foi negado uma única execução, não permanentemente. Poderá ser solicitado novamente.
        }
      })
      .catch((e: any) => console.error('Erro inesperado!', e)); // Erro inesperado, tratar exceção.
  }

  ionViewDidLeave() {
    this.qrScanner.hide(); // Escondo a preview da câmera.
  }

}
