import React, {useState} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import { initializeApp } from "firebase/app";
import axios from 'axios'
import { getDatabase } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import Header from './Header/Header'
import Home from './Home/Home'
import Weather from './Weather/Weather'
import SignUp from './Authentication/SignUp'
import SignIn from './Authentication/SignIn'
import Footer from './Footer/Footer'

const firebaseConfig = {
  apiKey: "AIzaSyBkI0YXIRzecjedHKH_NpOdSrPkwLI1d-4",
  authDomain: "weather-app-cae8d.firebaseapp.com",
  projectId: "weather-app-cae8d",
  storageBucket: "weather-app-cae8d.appspot.com",
  messagingSenderId: "845015718924",
  appId: "1:845015718924:web:8436a9be319df74883a229"
};

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth(app)
const API_KEY = `dbfc62a01b77ba07cba90fa114bb2d87`

export default function Container() {

const navigate = useNavigate()

const [weather, setWeather] = useState (
  {
    latitude : "",
    longitude : "",
    city : "",
    weatherData : null
  }
)

const [loading, setLoading] = useState(false)

const changeHandler = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  if (name === 'city') {
    setWeather(prevWeather => ({
      ...prevWeather,
      city: value
    }));
  }
  else if (name === 'latitude') {
    setWeather(prevWeather => ({
      ...prevWeather,
      latitude: value
    }));
  }
  else if (name === 'longitude') {
    setWeather(prevWeather => ({
      ...prevWeather,
      longitude: value
    }));
  }
};

const getLocation = () => {
  setLoading(true)
  setWeather(prevWeather => ({
    ...prevWeather,
    latitude : "",
    longitude : "",
    city : "",
    weatherData : null
  }))
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition (
      (result) => {
        console.log(result)
        setTimeout(() => {
          setWeather(prevWeather => ({
            ...prevWeather,
            latitude : result.coords.latitude,
            longitude : result.coords.longitude,
          }))
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${result.coords.latitude}&lon=${result.coords.longitude}&appid=${API_KEY}`)
          .then((result) => {
            console.log(result)
            setWeather(prevWeather => ({
              ...prevWeather,
              city : result.data.name,
              weatherData : result.data
            }))
            setLoading(false)
          })
          .catch((error) => {
            console.log(error)
            setLoading(false)
          })
        }, 500)
      },
      (error) => {
        console.log(error)
        setLoading(false)
      }
    )
  }
  else {
    console.log("Location is not Supported")
  }
}

const searchHandler = () => {
  setLoading(true)
  const { latitude, longitude } = weather;
  if (latitude && longitude) {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
      .then((result) => {
        setWeather(prevWeather => ({
          ...prevWeather,
          city : result.data.name,
          weatherData: result.data
        }));
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      });
  } else {
    setLoading(false)
  }
};

const searchByCity = () => {
  setLoading(true)
  const {city} = weather
  if (city) {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    .then((result) => {
      setWeather(prevWeather => ({
        ...prevWeather,
        weatherData : result.data
      }))
      setLoading(false)
    })
    .catch((error) => {
      setLoading(false)
    })
  }
}

const [state, setState] = useState({
  message : ""
})

const signUpUser = (e) => {
  e.preventDefault()
  const email = e.target.email.value
  const password = e.target.password.value
  const confirmPassword = e.target.confirmPassword.value
  if(password !== confirmPassword) {
    setState((prevState) => ({
      ...prevState,
      message : "Password does not match. Please check your Password and Try Again"
    }))
    return
  }
createUserWithEmailAndPassword(auth, email, password)
  .then((data) => {
    navigate("/")
  })
  .catch((error) => {
    setState((prevState) => ({
      ...prevState,
      message : error.message
    }))
  })
}

const signInUser = (e) => {
  e.preventDefault()
  const email = e.target.email.value
  const password = e.target.password.value
  signInWithEmailAndPassword(auth, email, password)
  .then((data) => {
    navigate("/")
  })
  .catch((error) => {
    setState((prevState) => ({
      ...prevState,
      message : error.message,
    }))
    e.target.email.value = ""
    e.target.password.value = ""
  })
}

const signOutUser = () => {
  const auth = getAuth()
  signOut(auth)
  .then(() => {
    navigate ('/sign-in')
  })
  .catch(() => {

  })
}
  return (
    <>
    <Header signOutUser={signOutUser} />
    <Routes>
    <Route path='/' element={ <Home />} />
    <Route path='/weather' element={ <Weather latitude={weather.latitude} longitude={weather.longitude} city={weather.city} weatherData={weather.weatherData} changeHandler={changeHandler} getLocation={getLocation} searchHandler={searchHandler} searchByCity={searchByCity} loading={loading} />} />
    <Route path='/sign-up' element={ <SignUp signUpUser={signUpUser} message={state.message} />} />
    <Route path='/sign-in' element={ <SignIn signInUser={signInUser} message={state.message} />} />
    </Routes>
    <Footer />/
    </>
  )
}
