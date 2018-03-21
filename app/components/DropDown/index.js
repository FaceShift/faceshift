import React from "react";
import PropTypes from "prop-types";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";

class DropDown extends React.Component {

  static propTypes = {
    options: PropTypes.array,
  };
  static defaultProps = {
    options: [],
  };

  renderOptions = () => (
    this.props.options.map(
      (option, index) => <MenuItem key={index} value={index} primaryText={option}/>
    )
  );

  render() {
    return (
      <DropDownMenu>
        {this.renderOptions()}
      </DropDownMenu>
    )
  }
}

export default DropDown;
