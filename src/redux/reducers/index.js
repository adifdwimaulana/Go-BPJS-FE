import { combineReducers } from 'redux'
import reducer from '../../store/reducer'

import { fetchLogin } from './users/auth'
import { fetchCompany } from './companies/getCompanies'
import { fetchUser } from './users/getUsers'
import { fetchRole } from './roles/getRoles'
import { fetchFuel } from './fuel/getFuel'
import { fetchCstern } from './cstern/getCstern'
import { fetchShip } from './ship/getShip'
import { fetchVoyage } from './voyages/getVoyages'
import { fetchLocation } from './locations/getLocations'
import { fetchReport } from './report/getReport'
import { fetchRectangle } from './locations/getRectangle'
import { fetchMedicine } from './medicine/getMedicine'
import { fetchRequest } from './request/getRequest'

const rootReducers = combineReducers({
    reducerStore: reducer,
    loginStore: fetchLogin,
    companyStore: fetchCompany,
    userStore: fetchUser,
    roleStore: fetchRole,
    fuelStore: fetchFuel,
    csternStore: fetchCstern,
    shipStore: fetchShip,
    voyageStore: fetchVoyage,
    locationStore: fetchLocation,
    reportStore: fetchReport,
    rectangleStore: fetchRectangle,
    medicineStore: fetchMedicine,
    requestStore: fetchRequest,
})

export default rootReducers