import React, { Component } from 'react';
import './Filter.css';
import { Slider, Form, Button, Select } from 'antd';

const { Item } = Form;
const { Option } = Select;

class Filter extends Component {
  state = {
    location: "Select a location",
    ethnicity: "Select an ethnicity",
    duration: "Select a duration",
    gender: "Select a gender",
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

    return (
      <div className="filter__container">
        <div className="filter__title">Filter Options</div>
        <Form onSubmit={this.handleFilterSubmit}>
          <div className="filter__subtitle">Locations</div>
          <Item>
            <Select
              defaultValue={this.state.location}
              onChange={this.handleLocationChange}
            >
              {locationOptions.map(locationOption => <Option value={locationOption}>{locationOption}</Option>)}
            </Select>
          </Item>
          <div className="filter__subtitle">Ethnicities</div>
          <Item>
            <Select
              defaultValue={this.state.ethnicity}
              onChange={this.handleEthnicityChange}
            >
              {ethnicityOptions.map(ethnicityOption => <Option value={ethnicityOption}>{ethnicityOption}</Option>)}
            </Select>
          </Item>
          <div className="filter__subtitle">Durations</div>
          <Item>
            <Select
              defaultValue={this.state.duration}
              onChange={this.handleDurationChange}
            >
              {durationOptions.map(durationOption => <Option value={durationOption}>{durationOption}</Option>)}
            </Select>
          </Item>
          <div className="filter__subtitle">Genders</div>
          <Item>
            <Select
              defaultValue={this.state.gender}
              onChange={this.handleGenderChange}
            >
              {genderOptions.map(genderOption => <Option value={genderOption}>{genderOption}</Option>)}
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