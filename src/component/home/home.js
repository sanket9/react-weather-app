import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, Row, Card } from 'reactstrap';
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
            <Card className="wrapper">
                <Row>
                    <Col md="6" className="center-align"> 
                        <Form style={{ padding: 10 }} onSubmit={this.getWeather}>
                            <FormGroup className="margin-top">
                                <Input type="text" name="location" id="location_search" 
                                onChange={this.changeValue} 
                                value={this.state.value}
                                placeholder="Search With your Location" />
                            </FormGroup>
                            <Button onClick={this.getWeather}>Get Weather</Button>
                        </Form> 
                        {this.state.temp && this.state.weather && <p className="text-center">
                            <img className="img-weather" src={`http://openweathermap.org/img/w/${this.state.weather_icon}.png`}/>
                            <span className="temp">{this.state.temp}° <small className="temp-in">C </small></span>
                        </p>}
                        {this.state.name && this.state.country &&<p className="text-center">
                            <span className="country-name">{this.state.name}, {this.state.country}</span>
                        </p>}
                        
                    </Col>            
                
                </Row>
            
            </Card>
                   
            <ScriptTag type="text/javascript">
                var input = document.getElementById('location_search');
                var autocomplete = new google.maps.places.Autocomplete(input);
            </ScriptTag>
        </div>
      )
    }
}
export default Home;
