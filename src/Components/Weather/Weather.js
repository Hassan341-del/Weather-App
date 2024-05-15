import React, {useEffect} from 'react'
import Loader from '../Loader/Loader'
import './Weather.css'

export default function Weather(props) {
  
  // console.log(props.weatherData)
  const KelvinToCelcius = (k) => {
    return (k-273.15).toFixed(2) + "C"
  }
  return (
    <>
      <div className='d-flex justify-content-center container-sm mt-5 mb-5'>
        <div className='w-75'>
          <span className='label'>Type City Name</span>
          <input class="form-control mt-2" type="text" placeholder="City" name='city' id='city' value={props.city} onChange={props.changeHandler} />
        </div>
        <div className='w-100'>
          <span className='ms-5 label'>Get Co-Ordinates</span>
          <button className='btn fa fa-crosshairs ms-2 p-0' onClick={props.getLocation}></button>
          <div className='d-flex w-100'>
          <input class="form-control ms-5 me-2 mt-2" type="number" placeholder="Latitude" name='latitude' id='latitude' value={props.latitude} onChange={props.changeHandler} />
          <input class="form-control mt-2" type="number" placeholder="Longitude" name='longitude' id='longitude' value={props.longitude} onChange={props.changeHandler} />
          <button className='btn btn-primary fa fa-search ms-3' onClick={() => {
            props.searchByCity();
            props.searchHandler();
          }} />
          </div>
        </div>
        </div>
        {props.loading && <div className="loader"> {<Loader />} </div>}
        {
          props.weatherData && (
            <div className='container-sm mb-5'>
              <table  className='table table-hover'>
                <tbody>
                  <tr>
                    <th scope='row'>1</th>
                    <td>Country</td>
                    <td>{props.weatherData.sys.country}</td>
                  </tr>
                  <tr>
                    <th scope='row'>2</th>
                    <td>City</td>
                    <td>{props.weatherData.name}</td>
                  </tr>
                  <tr>
                    <th scope='row'>3</th>
                    <td>Temperature</td>
                    <td>{KelvinToCelcius(props.weatherData.main.temp)}</td>
                  </tr>
                  <tr>
                    <th scope='row'>4</th>
                    <td>Description</td>
                    <td>{props.weatherData.weather[0].description} <img src={`http://openweathermap.org/img/wn/${props.weatherData.weather[0].icon}@2x.png`} alt="" /> </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        }
    </>
  )
}
