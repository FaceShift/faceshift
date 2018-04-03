# FaceShift
An electron app that uses facial tracking to move your mouse cursor.

## Pre-requisites 

* Node

* [Yarn](https://yarnpkg.com/lang/en/docs/install/ )

* Electron 
```
$ yarn global add electron
```

## Run the project
1. Clone the project
```
$ git clone https://github.com/FaceShift/faceshift.git
```
2. Build the project
```
$ cd faceshift
$ yarn
$ yarn watch
```

3. Install SoX for voice commands [http://sox.sourceforge.net/](http://sox.sourceforge.net/)

4. Get an Api key from Snowboy 
API token can be obtained by logging into [https://snowboy.kitt.ai](https://snowboy.kitt.ai), click on “Profile settings”:
Create an environtment variable
```
SNOWBOY_API = [your api key]
```

5. Run the project (open a different terminal/command window)

```
Mac $ yarn start-mac
Windows $ yarn start-win
```
