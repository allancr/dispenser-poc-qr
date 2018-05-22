# Dispenser - PoC - Leitor OCR
Projeto para experimentar e demonstrar a leitura de códigos QR com projeto híbrido para smartphones com Ionic 3.

## Debugando a aplicação em um dispositivo com Android
```
$ git clone https://github.com/allancr/dispenser-poc-qr.git
$ cd dispenser-poc-qr
$ ionic cordova run android --device -lc
```

## Gerando um instalador APK
```
$ ionic cordova build android --prod #--release
```
O pacote estará disponível em platforms/android/app/build/outputs/apk/debug/app-debug.apk.

## Fontes
* [Ionic Framework](https://ionicframework.com/docs/)
* [Ionic - Native QR Scanner](https://ionicframework.com/docs/native/qr-scanner/)
* [Problem with showing Camera Preview @ionic-native/qr-scanner](https://forum.ionicframework.com/t/problem-with-showing-camera-preview-ionic-native-qr-scanner/107694)
