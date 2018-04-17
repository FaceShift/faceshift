/**
 * Component that renders the main buttons for FaceShift
 * Includes the Microphone, Webcam toggle as well as the Radio Buttons
 */
import React from "react";
import FlatButton from "material-ui/FlatButton";

import MicOnIcon from "material-ui/svg-icons/av/mic";
import MicOffIcon from "material-ui/svg-icons/av/mic-off";
import WebcamOnIcon from "material-ui/svg-icons/av/videocam";
import WebcamOffIcon from "material-ui/svg-icons/av/videocam-off"
import {RadioButton, RadioButtonGroup} from "material-ui/RadioButton";

import {Modes, MouseModes} from "../../utils/constants/constants";
import "./styles.css";

import * as controller from "../../modules/controller/controller_pref";
import preferencesJSON from "../../utils/preferences/preferences.json";

let io = require("socket.io-client");
let socket = io("http://localhost:6767");

const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
};

class EnableButtons extends React.Component {

    state = {
        isMicOn: true,
        isWebcamOn: true,
    };

    onHotwordReceived = (hotword) => {
        switch (hotword) {
            case "toggle":
                this.onCameraButtonClicked();
                break;
            case "switch":
                this.onRadioButtonToggle();
                break;
            default:
                break;
        }
    };

    // Modifies the tracking boolean to the opposite
    onCameraButtonClicked = () => {
        controller.setTrackBool(!this.state.isWebcamOn);
        this.setState({isWebcamOn: !this.state.isWebcamOn});
    };

    // Called when the radio buttons are clicked on
    onRadioButtonToggle = () => {
        const currentMode = this.state.modeValue;
        // Switches the Mode to the next valid Mode
        // Mouse -> Scroll
        // Scroll -> Drag
        // Drag -> Mouse
        switch (currentMode) {
            case MouseModes.scroll:
                this.setState({modeValue: MouseModes.drag}, () => controller.enterDragMode());
                controller.enterDragMode();
                break;
            case MouseModes.mouse:
                this.setState({modeValue: MouseModes.scroll}, () => controller.enterScrollMode());
                break;
            case MouseModes.drag:
                this.setState({modeValue: MouseModes.mouse}, () => controller.enterMouseMode());
                break;
            default:
                break;
        }
    };

    // Sends a message over Socket.io when clicked
    onMicrophoneButtonClicked = () => {
        socket.emit("microphone", !this.state.isMicOn, () => {
            this.setState({isMicOn: !this.state.isMicOn});
        });
    };

    renderMicrophoneButton = () => (
        <FlatButton
            icon={this.state.isMicOn ? <MicOnIcon/> : <MicOffIcon/>}
            onClick={this.onMicrophoneButtonClicked}
        />
    );

    renderCameraButton = () => (
        <FlatButton
            icon={this.state.isWebcamOn ? <WebcamOnIcon/> : <WebcamOffIcon/>}
            onClick={this.onCameraButtonClicked}
        />
    );

    // When radio button is clicked, switch to the respective mode
    onRadioButtonClick = (value) => {
        switch (value) {
            case MouseModes.drag:
                controller.enterDragMode();
                this.setState({modeValue: MouseModes.drag});
                break;
            case MouseModes.mouse:
                controller.enterMouseMode();
                this.setState({modeValue: MouseModes.mouse});
                break;
            case MouseModes.scroll:
                controller.enterScrollMode();
                this.setState({modeValue: MouseModes.scroll});
                break;
            default:
                break;
        }
    };

    // Render the radio button as a group
    renderMouseModeButton = () => {
        return (
            <RadioButtonGroup valueSelected={this.state.modeValue}>
                {this.renderMouseModeOptions(Modes)}
            </RadioButtonGroup>
        )
    };

    // Render the different Mouse Mode options
    renderMouseModeOptions = (options) => options.map(
        (option) => {
            return <RadioButton label={option.label} styles={styles.radioButton} value={option.value} key={option.label}
                                onClick={() => this.onRadioButtonClick(option.value)}/>
        }
    );

    // Called when the component is about to mount
    componentWillMount() {
        // Adds a listener for Socket.io that listens to a hot-word
        socket.on("hotword", (hotword) => {
            this.onHotwordReceived(hotword);
        });

        // Gets the preferences from the JSON and sets the mode to that
        const preferences = JSON.parse(preferencesJSON);
        const modeValue = preferences["mode"];
        this.setState({
            modeValue: modeValue,
        })
    }

    render() {
        return (
            <div className="container">
                <div className="toggleButton">
                    <div>
                        {this.renderMicrophoneButton()}
                    </div>
                    <div>
                        {this.renderCameraButton()}
                    </div>
                </div>
                <div>
                    <div style={{width: 200}}>
                        {this.renderMouseModeButton()}
                    </div>
                </div>
            </div>
        )
    }
}

export default EnableButtons;
