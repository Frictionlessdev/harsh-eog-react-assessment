import * as actions from "../actions";

const initialState = {
    loading: false,
    data: {},
    temp: {}
};

const startLoading = (state, action) => {
    return { ...state, loading: true };
};

const droneLocationReceived = (state, action) => {
    const {data} = action.data;
    const location = data[data.length - 1];
    
    return {...state, 
        loading: false,
        data: location
    };
}

const fetchDroneLocationWeather = (state, action) => {
    return {...state};
}

const handlers = {
    [actions.FETCH_DRONE_LOCATION]: startLoading,
    [actions.DRONE_LOCATION_RECEIVED]: droneLocationReceived,
    [actions.FETCH_DRONE_LOCATION_WEATHER]: fetchDroneLocationWeather
};

export default (state = initialState, action) => {
    const handler = handlers[action.type];
    if (typeof handler === "undefined") return state;
    return handler(state, action);
};