import React from "react";
import PropTypes from "prop-types";
import Slider from "material-ui/Slider";

class BasicSlider extends React.Component {

    static defaultProps = {
        stepSize: 0.10,
        currentValue: 0.50,
        onChange: () => {
        },
        disabled: false,
    };

    static propTypes = {
        stepSize: PropTypes.number,
        currentValue: PropTypes.number,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
    };

    render() {
        return (
            <Slider
                step={0.10} value={this.props.currentValue}
                onChange={(event, newValue) => this.props.onChange(newValue)}
                disabled={this.props.disabled}
            />
        );
    }
}

export default BasicSlider;
