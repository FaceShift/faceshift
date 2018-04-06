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
    static defaultProps = {
        options: [],
        label: "",
        value: 0,
        disabled: false,
    };
    state = {
        value: 0,
    };
    handleChange = (event, index, value) => {
        console.log("new value", value);
        this.setState({value: value})
    };
    renderOptions = () => (
        this.props.options.map(
            (option, index) => {
                return <MenuItem key={index} value={index} primaryText={option}/>
            }
        )
    );

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
