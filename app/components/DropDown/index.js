/**
 * Custom React Component to render the Dropdown option
 */
import React from "react";
import PropTypes from "prop-types";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";

class DropDown extends React.Component {

    static propTypes = {
        options: PropTypes.array,
        label: PropTypes.string,
        value: PropTypes.number,
        disabled: PropTypes.bool,
    };

    // If the prop is not passed, these values are used
    static defaultProps = {
        options: [],
        label: "",
        value: 0,
        disabled: false,
    };

    state = {
        value: 0,
    };

    // Call when the dropdown is changed
    handleChange = (event, index, value) => {
        this.setState({value: value})
    };

    // Renders the options inside the Dropdown component
    // Iterate through the array and uses the values to create MenuItem components
    renderOptions = () => (
        this.props.options.map(
            (option, index) => {
                return <MenuItem key={index} value={index} primaryText={option}/>
            }
        )
    );

    // Called while the component is being rendered
    componentWillMount() {
        this.setState({
            value: this.props.value,
        })
    };

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
