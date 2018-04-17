#!/bin/sh

echo "[FACESHIFT] Installing faceshift pre-requisites"

echo "[FACESHIFT] Installing homebrew"
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

echo "[FACESHIFT] Installing git"
brew install git

echo "[FACESHIFT] Installing python"
brew install python2

echo "[FACESHIFT] Installing npm"
brew install npm

echo "[FACESHIFT] Installing yarn"
brew install yarn

echo "[FACESHIFT] Installing electron"
yarn global add electron

echo "[FACESHIFT] Installing sox"
brew install sox

echo "[FACESHIFT] Cloning faceshift from GitHub"
git clone https://github.com/FaceShift/faceshift.git
cd ./faceshift

echo "[FACESHIFT] Setting environment variables"
export SNOWBOY_API=27cacc0c071c70c76b61af43b514ec2453a3584a

echo "[FACESHIFT] Installing npm dependencies with yarn"
yarn

echo "[FACESHIFT] FaceShift installed! Run the command 'yarn watch' in terminal with the workign directory set to the installing folder of faceshift"
echo "[FACESHIFT] In another terminal window, navigate to the faceshift installation directory and run the command 'yarn start-mac'"