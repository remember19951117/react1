import * as fetchs from './utils/fetch';
import * as auth from './utils/auth';
import { getMessage } from './utils/utils';

export function storeNumber(number){
    return{
        type:"YIYUAN_number",
        data: number
    }
}