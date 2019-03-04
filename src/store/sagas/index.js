import WeatherSagas from "./Weather";
import ApiErrors from "./ApiErrors";
import LocationSagas from "./Location";

export default [...ApiErrors, ...WeatherSagas, ...LocationSagas];
