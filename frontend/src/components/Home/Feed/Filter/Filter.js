import React, { Component } from 'react';
import './Filter.css';
import { Slider, Form, Button, Select } from 'antd';
import { defaultFilterMessages } from '../../../../constants';

const { Item } = Form;
const { Option } = Select;
const {
  location: defaultLocation,
  ethnicity: defaultEthnicity,
  duration: defaultDuration,
  gender: defaultGender
} = defaultFilterMessages;

class Filter extends Component {
  state = {
    location: defaultLocation,
    ethnicity: defaultEthnicity,
    duration: defaultDuration,
    gender: defaultGender,
    priceMin: this.props.priceMin,
    priceMax: this.props.priceMax
  }

  handleFilterPriceRangeChange = values => {
    this.setState({
      priceMin: values[0],
      priceMax: values[1]
    });
  }

  handleFilterSubmit = e => {
    e.preventDefault();

    const { location, ethnicity, duration, gender, priceMin, priceMax } = this.state;
    const selectedOptions = { location, ethnicity, duration, gender, priceMin: priceMin.toString(), priceMax: priceMax.toString() };

    console.log("Sending selectedOptions", selectedOptions)
    
    this.props.handleFilterSubmit(selectedOptions);
  }

  handleLocationChange = location => this.setState({ location });

  handleEthnicityChange = ethnicity => this.setState({ ethnicity });

  handleDurationChange = duration => this.setState({ duration });

  handleGenderChange = gender => this.setState({ gender });

  render() {
    const { locationOptions, ethnicityOptions, genderOptions, durationOptions } = this.props;

    const updatedLocationOptions = [...locationOptions];
    updatedLocationOptions.unshift(defaultLocation);

    const updatedEthnicityOptions = [...ethnicityOptions];
    updatedEthnicityOptions.unshift(defaultEthnicity);

    const updatedGenderOptions = [...genderOptions];
    updatedGenderOptions.unshift(defaultGender);

    const updatedDurationOptions = [...durationOptions];
    updatedDurationOptions.unshift(defaultDuration);

    return (
      <div className="filter__container">
        <div className="filter__title">Filter Options</div>
        <Form onSubmit={this.handleFilterSubmit}>
          <div className="filter__subtitle">Locations</div>
          <Item>
            <Select
              defaultValue={updatedLocationOptions[0]}
              onChange={this.handleLocationChange}
            >
              {updatedLocationOptions.map(locationOption => <Option value={locationOption}>{locationOption}</Option>)}
            </Select>
          </Item>
          <div className="filter__subtitle">Ethnicities</div>
          <Item>
            <Select
              defaultValue={updatedEthnicityOptions[0]}
              onChange={this.handleEthnicityChange}
            >
              {updatedEthnicityOptions.map(ethnicityOption => <Option value={ethnicityOption}>{ethnicityOption}</Option>)}
            </Select>
          </Item>
          <div className="filter__subtitle">Durations</div>
          <Item>
            <Select
              defaultValue={updatedDurationOptions[0]}
              onChange={this.handleDurationChange}
            >
              {updatedDurationOptions.map(durationOption => <Option value={durationOption}>{durationOption}</Option>)}
            </Select>
          </Item>
          <div className="filter__subtitle">Genders</div>
          <Item>
            <Select
              defaultValue={updatedGenderOptions[0]}
              onChange={this.handleGenderChange}
            >
              {updatedGenderOptions.map(genderOption => <Option value={genderOption}>{genderOption}</Option>)}
            </Select>
          </Item>
          <div className="filter__subtitle">Price Range</div>
          <Item>
            <Slider
              range
              min={this.props.priceMin}
              max={this.props.priceMax}
              step={100}
              defaultValue={[this.state.priceMin, this.state.priceMax]}
              onChange={this.handleFilterPriceRangeChange}
            />
          </Item>
          <Item>
            <Button
              className="filter__submit"
              type="primary"
              htmlType="submit"
            >
              SUBMIT
            </Button>
          </Item>
        </Form>
      </div>
    )
  }
}

export default Filter;