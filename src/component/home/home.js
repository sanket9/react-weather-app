import React, { Component, Fragment } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Row } from 'reactstrap';
import './home.css';
import ScriptTag from 'react-script-tag';

import Headers from '../header/header'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            loading: undefined,
            temp: undefined,
            humidity: undefined,
            name: undefined,
            country: undefined,
            weather: undefined,
            weather_icon: undefined,
        };
        this.changeValue = this.changeValue.bind(this);
        this.getWeather = this.getWeather.bind(this);
    }
    getWeather(e) {
        e.preventDefault();
        this.setState({loading : true});
        const APP_KEY = 'c02a8ac947999e382330611c5f2c508b';
        var input = document.getElementById('location_search').value;
        this.setState({value : input});
        var res = input.split(", ");

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${res[0]}&appid=${APP_KEY}`)
        .then(resp=> resp.json()).then(data=>{
            console.log(data);
            let orgTemp = parseInt(data.main.temp) - 273.15;
            this.setState({
                value: input,
                loading: false,
                temp: Math.round(orgTemp),
                humidity: data.main.humidity,
                name: data.name,
                country: data.sys.country,
                weather: data.weather[0].main,
                weather_icon: data.weather[0].icon,

            })
            console.log(this.state);
            
        },err=>{
            console.log(err);            
        })
        
    }
    changeValue(e){
        this.setState({value: e.target.value})
    }
    render() {
      return (
        <div className="container">
            <Headers/>
            <Form className="margin-left" onSubmit={this.getWeather}>
                <Row>
                    <FormGroup className="col-md-8 margin-top">
                        <Input type="text" name="location" id="location_search" 
                        onChange={this.changeValue} 
                        value={this.state.value}
                        placeholder="Search With your Location" />
                    </FormGroup>
                </Row>
                <Button onClick={this.getWeather}>Get Weather</Button>
            </Form>
            {this.state.loading == true ? <img src="https://camo.githubusercontent.com/a1a81b0529517027d364ee8432cf9a8bd309542a/687474703a2f2f692e696d6775722e636f6d2f56446449444f522e676966" />: ''}
            <Row>
                <Col xs="6">    
                    {this.state.name && this.state.country && <p>location:{this.state.name}, {this.state.country} </p>}
                </Col>
            </Row>        
            <ScriptTag type="text/javascript">
                var input = document.getElementById('location_search');
                var autocomplete = new google.maps.places.Autocomplete(input);
            </ScriptTag>
        </div>
      )
    }
}
export default Home;
