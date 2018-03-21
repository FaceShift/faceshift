import React from "react";
import PropTypes from "prop-types";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";

class DropDown extends React.Component {

  state = {
    value: 0,
  };


  static propTypes = {
    options: PropTypes.array,
    label: PropTypes.string,
    value: PropTypes.number,
  };
  static defaultProps = {
    options: [],
    label: "",
    value: 0,
  };

  renderOptions = () => (
    this.props.options.map(
      (option, index) => (
        <div>
          <MenuItem key={index} value={index} primaryText={option}/>
        </div>
      )
    )
  );

  render() {
    return (
      <div>
        {this.props.label === "" ? <div/> : this.props.label}
        <DropDownMenu value={this.props.value}>
          {this.renderOptions()}
        </DropDownMenu>
      </div>
    )
  }
}

export default DropDown;
