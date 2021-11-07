## Rest Azzure!! Azure Hack for Wellness

## Project setup

```
npm install
```

### Run on the browser - development

```
npm run serve
```

## Design

![alt text](/design.png "Logo Title Text 1")

## Native

Using [Capacitor](https://capacitorjs.com/docs/getting-started) for native builds

## Prepare native builds

### iOS testing and distribution

1. Download the latest Xcode
2. `npm run build`
3. `npx cap add ios`
4. `npx cap copy`
5. `npx cap open ios` Xcode takes a few seconds to index the files; keep an eye at the top of Xcode's window for progress.

[Not compulsory] For sanity check click on the play button in the top left. This will prepare and run the app in a simulator, if all goes well you should be able to run the app and click around. If not, create an issue 🤷 and I will have a look.

### Android testing and distribution

1. Download the latest Android Studio
2. `npm run build`
3. `npx cap add android`
4. `npx cap copy`
5. `npx cap open android` Android Studio takes a few seconds to index the files, keep an eye at the bottom of Android Studio for progress.
6. Testing - When indexing is complete, look for a green play button. Click the play button and it will launch the app in an emulator ([See here to setup Emulator](https://developer.android.com/studio/run/managing-avds)) or on the phone, if a phone is connected via USB.

## Official Docs

- [Getting started](https://ionicframework.com/vue)

## Resources

## Contact

- []
