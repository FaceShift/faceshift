import React from "react";
import PropTypes from "prop-types";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";

class DropDown extends React.Component {

  state = {
    value: 0,
  };

  static propTypes = {
    options: PropTypes.array,
    label: PropTypes.string,
    value: PropTypes.number,
    disabled: PropTypes.bool,
  };
  static defaultProps = {
    options: [],
    label: "",
    value: 0,
    disabled: false,
  };

  handleChange = (event, index, value) => {
    this.setState({value: value})
  };

  renderOptions = () => (
    this.props.options.map(
      (option, index) => {
        return <MenuItem key={index} value={index} primaryText={option}/>
      }
    )
  );

  render() {
    return (
      <div>
        <SelectField
          floatingLabelText={this.props.label}
          value={this.state.value}
          onChange={this.handleChange}
          disabled={this.props.disabled}
        >
          {this.renderOptions()}
        </SelectField>
      </div>
    )
  }
}

export default DropDown;
