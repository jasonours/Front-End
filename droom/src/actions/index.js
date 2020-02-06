import axios from 'axios'
import history from '../utils/history'
import axiosWithAuth from '../utils/axiosWithAuth'
export const FETCHING_START = 'FETCHING_START';
export const FETCHING_ERROR = 'FETCHING_ERROR';
export const NEW_EMPLOYEE = 'NEW_EMPLOYEE';
export const LOGIN = 'LOGIN';
export const NEW_EMPLOYER = 'NEW_EMPLOYER';
export const FETCHING_COMPANYARRAY_SUCCESS = 'FETCHING_COMPANYARRAY_SUCCESS'
export const FETCHING_USERARRAY_SUCCESS = 'FETCHING_USERARRAY_SUCCESS';

export const newEmployee = (thing) => dispatch => {
    dispatch({ type: FETCHING_START })
    
    axios.post('https://dry-mesa-00229.herokuapp.com/api/register/user', thing)
        .then(res => {
            dispatch ({ type: NEW_EMPLOYEE, payload: res.data })
            history.push(`/users/${res.data.id}`)
            
        })
        .catch(err => {
            dispatch ({ type: FETCHING_ERROR, payload: err.data })
           
        })
}
export const newEmployer = (thing) => dispatch => {
    dispatch({ type: FETCHING_START })
    axios.post('https://dry-mesa-00229.herokuapp.com/api/register/company', thing)
        .then(res => {
            dispatch ({ type: NEW_EMPLOYER, payload: res.data })
            history.push(`/companies/${res.data.id}`)
           
        })
        .catch(err => {
            dispatch ({ type: FETCHING_ERROR, payload: err.data })
          
        })
}
 export const login = (thing) => dispatch => {
     dispatch ({ type: FETCHING_START })
     axios.post('https://dry-mesa-00229.herokuapp.com/api/login', thing)
        .then(res => {
            dispatch({ type: LOGIN, payload: res.data})
            localStorage.setItem('token', res.data.token)
            res.data.user.user_type ? history.push(`users/${res.data.user.id}`) : history.push(`/companies/${res.data.company.id}`)
        })
        .catch(err => {
            dispatch({ type: FETCHING_ERROR, payload: err.data })
        })
 }
 export const fetchUser = (id) => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
    .get(`https://dry-mesa-00229.herokuapp.com/api/users/${id}`)
        .then(res => {
            dispatch({ type: NEW_EMPLOYEE, payload: res.data})
        })
        .catch(err => {
            dispatch ({ type: FETCHING_ERROR, payload: err.response})
        })
}

export const fetchCompany= (company) => dispatch => {
    dispatch({ type: FETCHING_START})
    axios.get(`https://dry-mesa-00229.herokuapp.com/api/companies/${company.id}`)
        .then(res => {
            
            dispatch({ type: NEW_EMPLOYER, payload: res.data})
        })
        .catch(err => {
            dispatch ({ type: FETCHING_ERROR, payload: err.response})
        })
}

export const fetchCompanyArray = () => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
    .get(`/api/companies`)
        .then(res => {
          
            dispatch({ type: FETCHING_COMPANYARRAY_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch ({ type: FETCHING_ERROR, payload: err.response})
        })
}

export const fetchUserArray = () => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .get(`/api/users`)
            .then(res => {
               
                dispatch({ type: FETCHING_USERARRAY_SUCCESS, payload: res.data})
            })
            .catch(err => {
                dispatch ({ type: FETCHING_ERROR, payload: err.response})
            })
}

export const editUser = (user, id) => dispatch => {
    dispatch({ type: FETCHING_START })
    console.log("EDIT USER, user", user)
    axiosWithAuth()
        .put(`/api/users/${id}`, user)
            .then( res => {
                console.log(res)
                dispatch({ type: NEW_EMPLOYEE, payload: res.data})
            })
            .catch(err => {
                dispatch ({ type: FETCHING_ERROR, payload: err.response})
            })
}

export const deleteUser = (id) => dispatch => {
    dispatch({ type: FETCHING_START})
    axiosWithAuth()
    .delete(`/api/users/${id}`)
    .then( res => {
        history.push('/')
        localStorage.clear('token')
    })
    .catch(err => {
        dispatch ({ type: FETCHING_ERROR, payload: err.response})
    })
} 