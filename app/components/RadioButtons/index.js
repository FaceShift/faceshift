import React from "react";
import PropTypes from "prop-types";
import {RadioButton, RadioButtonGroup} from "material-ui/RadioButton";

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

class RadioButtons extends React.Component {

  static propTypes = {
    options: PropTypes.array,
    name: PropTypes.string,
    onClick: PropTypes.func,
  };
  static defaultProps = {
    options: [{value: "Left Mode"}],
    name: "Pick an option",
    onClick: () => {},
  };

  renderOptions = () => (
    this.props.options.map(
      (option) => {
        return <RadioButton label={option.label} styles={styles.radioButton} value={option.value} key={option.label}
                            onClick={() => this.props.onClick(option.value)}/>
      }
    )
  );

  render() {
    return (
      <RadioButtonGroup name={this.props.name} defaultSelected={this.props.options[0].value}>
        {this.renderOptions()}
      </RadioButtonGroup>
    )
  }
}

export default RadioButtons;
