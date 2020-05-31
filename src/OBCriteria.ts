import OBRest from './OBRest';
import { AxiosInstance } from 'axios';
import OBContext from './OBContext';
import Criterion from './Criterion';

/**
 * OBCriteria class, equivalent to the criteria class in Openbravo.
 */
export default class OBCriteria {
    /** The rest web service name */
    private _restWsName: string;

    /** The axios instance to use*/
    private _axios: AxiosInstance;

    /** The name of the entity in openbravo */
    private _entityName: string;

    /** The array of criterias created with Restrictions */
    private _restrictions: Array<Criterion>;

    /** Maximum number of results */
    private _maxResults: Number;

    /** First result number */
    private _firstResult: Number;

    /** Order by string parameter */
    private _orderBy: string;

    constructor(axios:AxiosInstance,restWsName:string, entityName: string) {
        this._axios = axios;
        this._restWsName = restWsName;
        this._entityName = entityName;
        this._restrictions = new Array<Criterion>();
        this._maxResults = 1000000;
        this._firstResult = 0;
        this._orderBy = "";
    }

    /** Sets the max results */
    setMaxResults(maxResults: number){
        return this._maxResults = maxResults;
    }

    /** Sets the first result */
    setFirstResult(firstResult: number){
        return this._firstResult = firstResult;
    }

    /** Add a restriction to the criteria, you must use the Restrictions methods */
    add(restriction: Criterion) {
        this._restrictions.push(restriction);
    }

    /** Add order by to the criteria */
    addOrderBy(property: string, ascending: boolean) {
        if (this._orderBy.length > 0){
            this._orderBy += ", ";
        }
        if (!ascending){
            this._orderBy += "-";
        }
        this._orderBy += property;
    }


    list(): Array<Object> {
        const results = Array<Object>();
        OBRest.getInstance().getAxios().request({
            url:this._restWsName,
            method:'GET',
            //TODO: add support for this params in java... in a new correct ws?
            params:{
                sortBy:this._orderBy,
                firstResult:this._firstResult,
                maxResults:this._maxResults,
                criteria: this._restrictions,
            }
        });
        /*
        Execute request and add results if exists.
        */
        return results;
    }

    uniqueResult(): Object | undefined {
        this.setMaxResults(1);
        let resultLst = this.list();
        if( resultLst.length > 0){
            return resultLst[0];
        }else{
            return undefined;
        }
    }
}