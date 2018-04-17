# FaceShift
An electron app that uses facial tracking to move your mouse cursor.

## Pre-requisites
Prerequisites can be installed via the install script in this repository which is the recommended way for installing FaceShift.
This script will only help installation on mac. Windows will require manual installation of these tools.
If you have not yet cloned the repository, download just the 'install-faceshift-clone.sh' file. Place it where you want to install faceshift on your system. Now run the following command:

```
bash ./install-faceshift-clone.sh
```

If you have already cloned the repository, run the following command:

```
bash ./install-faceshift.sh
```

Note: The script only set the SnowBoy environment variable temporarily. If you terminate the terminal session, it will no longer be set. Setting it permanently will be dependent on your operating system and your preferred way of setting it. The API key for snowboy can be found in the install script.

If you do not want to run the script or are on Windows, you will need to install the following components manually.

* Git

* Node

* [Yarn](https://yarnpkg.com/lang/en/docs/install/ )

* Electron
```
$ yarn global add electron
```

* SoX
Install SoX for voice commands [http://sox.sourceforge.net/](http://sox.sourceforge.net/)

* Python 2.7.x

* Get an Api key from Snowboy
API token can be obtained by logging into [https://snowboy.kitt.ai](https://snowboy.kitt.ai), click on 'Profile settings'

* Create an environment variable. This process differs for Windows and Mac
```
SNOWBOY_API = [your api key]
```

## Run the project
1. Build the project

```
$ cd faceshift
$ yarn
$ yarn watch
```

2. Run the project (open a different terminal/command window)

```
Mac $ yarn start-mac
Windows $ yarn start-win
```


