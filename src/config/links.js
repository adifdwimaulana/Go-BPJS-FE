// const BASE_URL = 'http://localhost:8000/api' // Development
const BASE_URL = 'http://147.139.172.60/api' // Production
// const BASE_URL = 'http://192.168.43.106/api' // Local
// const BASE_URL = 'http://149.129.238.75/api' // SAR BE

// User
const USER_URL = BASE_URL + '/user'
const USER_LIST_URL = USER_URL +'/list'
const USER_ADD_URL = USER_URL +'/add'
const USER_UPDATE_URL = USER_URL +'/update'
const USER_DELETE_URL = USER_URL +'/delete'
const USER_CHANGE_PASSWORD_URL = USER_URL + '/change-password'
const USER_PHOTO_URL = USER_URL + '/picture'
const USER_PHOTO_UPLOAD_URL = USER_PHOTO_URL + '/upload'
const USER_PHOTO_LIST_URL = USER_PHOTO_URL + '/get'
const USER_PHOTO_UPDATE_URL = USER_PHOTO_URL + '/update'

const LOGIN_URL = BASE_URL + '/login'
const LOGOUT_URL = BASE_URL + '/logout'

// Menu
const MENU_URL = BASE_URL + '/menu'
const MENU_LIST_URL = MENU_URL + '/list'

// Role
const ROLE_URL = BASE_URL + '/role'
const ROLE_LIST_URL = ROLE_URL +'/list'
const ROLE_ADD_URL = ROLE_URL +'/add'
const ROLE_UPDATE_URL = ROLE_URL +'/update'
const ROLE_DELETE_URL = ROLE_URL +'/delete'

// Company
const COMPANY_URL = BASE_URL + '/company'
const COMPANY_LIST_URL = COMPANY_URL + '/list'
const COMPANY_ADD_URL = COMPANY_URL + '/add'
const COMPANY_UPDATE_URL = COMPANY_URL + '/update'
const COMPANY_DELETE_URL = COMPANY_URL + '/delete'

// Fuel
const FUEL_URL = BASE_URL + '/fuel'
const FUEL_LIST_URL = FUEL_URL + '/list'

// Cstern
const CSTERN_URL = BASE_URL + '/cstern'
const CSTERN_LIST_URL = CSTERN_URL + '/list'

// Ship
const SHIP_URL = BASE_URL + '/ship'
const SHIP_LIST_URL = SHIP_URL + '/list'
const SHIP_ADD_URL = SHIP_URL + '/add'
const SHIP_UPDATE_URL = SHIP_URL + '/update'
const SHIP_DELETE_URL = SHIP_URL + '/delete'

// Voyage
const VOYAGE_URL = BASE_URL + '/voyage'
const VOYAGE_LIST_URL = VOYAGE_URL + '/list'
const VOYAGE_ADD_URL = VOYAGE_URL + '/add'
const VOYAGE_UPDATE_URL = VOYAGE_URL + '/update'
const VOYAGE_DELETE_URL = VOYAGE_URL + '/delete'

// Location
const LOCATION_URL = BASE_URL + '/location'
const LOCATION_LIST_URL = LOCATION_URL + '/list-all'
const LOCATION_ADD_URL = LOCATION_URL + '/add'
const LOCATION_UPDATE_URL = LOCATION_URL + '/update'
const LOCATION_DELETE_URL = LOCATION_URL + '/delete'
const LOCATION_RECTANGLE_URL = LOCATION_URL + '/rectangle'

// Report
const REPORT_URL = BASE_URL + '/report'

// Medicine
const MEDICINE_URL = BASE_URL + '/medicine'
const MEDICINE_LIST_URL = MEDICINE_URL + '/list'
const MEDICINE_ADD_URL = MEDICINE_URL + '/add'
const MEDICINE_UPDATE_URL = MEDICINE_URL + '/update'
const MEDICINE_DELETE_URL = MEDICINE_URL + '/delete'

export {
    BASE_URL,

    USER_URL,
    USER_LIST_URL,
    USER_ADD_URL,
    USER_UPDATE_URL,
    USER_DELETE_URL,
    USER_CHANGE_PASSWORD_URL,
    USER_PHOTO_URL,
    USER_PHOTO_LIST_URL,
    USER_PHOTO_UPDATE_URL,
    USER_PHOTO_UPLOAD_URL,

    LOGIN_URL,
    LOGOUT_URL,
    
    MENU_URL,
    MENU_LIST_URL,

    ROLE_URL,
    ROLE_LIST_URL,
    ROLE_ADD_URL,
    ROLE_UPDATE_URL,
    ROLE_DELETE_URL,

    COMPANY_URL,
    COMPANY_LIST_URL,
    COMPANY_ADD_URL,
    COMPANY_UPDATE_URL,
    COMPANY_DELETE_URL,

    FUEL_URL,
    FUEL_LIST_URL,

    CSTERN_URL,
    CSTERN_LIST_URL,

    SHIP_URL,
    SHIP_LIST_URL,
    SHIP_ADD_URL,
    SHIP_UPDATE_URL,
    SHIP_DELETE_URL,

    VOYAGE_URL,
    VOYAGE_LIST_URL,
    VOYAGE_ADD_URL,
    VOYAGE_UPDATE_URL,
    VOYAGE_DELETE_URL,

    LOCATION_URL,
    LOCATION_LIST_URL,
    LOCATION_ADD_URL,
    LOCATION_UPDATE_URL,
    LOCATION_DELETE_URL,
    LOCATION_RECTANGLE_URL,

    REPORT_URL,

    MEDICINE_URL,
    MEDICINE_LIST_URL,
    MEDICINE_ADD_URL,
    MEDICINE_UPDATE_URL,
    MEDICINE_DELETE_URL
}