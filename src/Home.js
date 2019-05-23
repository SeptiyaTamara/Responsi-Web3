import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }


  componentDidMount() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=Yogyakarta,id&mode=json&appid=7cbdd498aa0d6fce19b96d5f76762548&units=metric")
    .then(res => res.json())
    .then(parsedJSON => parsedJSON.results.map(data => (
      {
        dt_txt: `${data.dt_txt}`,
        temp: `${data.main.temp}`,
        temp_min: `${data.main.temp_min}`,
        temp_max: `${data.main.temp_max}`, 
        weather: `${data.weather.main}`,
      }
    )))
    .then(items => this.setState({
      items,
      isLoaded: false
    }))
    .catch(error => console.log('parsing failed', error))
  }

  render() {
    const {items} = this.state;
    return (
      <div className="boxWhite">
        {
          items.length > 0 ? items.map(item => {
            const {dt_txt, temp, temp_min, temp_max, weather} = item;
            return (
              <div key={dt_txt} className="tabel">
            
                <div>
                  {dt_txt}<td/> {temp}<td />
                  {temp_min}<td/>{temp_max}<td/>{weather}
                </div>

              </div>
            );
          }) : null
        }
      </div>
    );
  }
}

export default Home;