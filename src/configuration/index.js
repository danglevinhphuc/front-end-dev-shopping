import { combineReducers } from 'redux';
import {HomePageReducer} from '../components/HomePage/HomePageReducer';
import {ProductTypeReducer} from '../components/ProductTypePage/ProductTypeReducer';
import {ProducsReducer} from '../components/ProductListPage/ProductListReducer';
import {ChatPageReducer} from '../components/Chat/ChatPageReducer'
import {ConfigMenuReducer} from '../components/ConfigMenu/ConfigMenuReducer'
import {HistoryReducer} from '../components/History/HistoryReducer'
import {ConfigIconHeaderReducer} from '../components/ConfigIconHeader/ConfigIconHeaderReducer'
import {DashboardReducer} from '../components/Dashboard/DashboardReducer'
const appReducers = combineReducers({
    home: HomePageReducer,
    productType: ProductTypeReducer,
    products : ProducsReducer,
    chat: ChatPageReducer,
    configMenu : ConfigMenuReducer,
    history: HistoryReducer,
    configIconHeader: ConfigIconHeaderReducer,
    dashboard: DashboardReducer
});

export default appReducers;
