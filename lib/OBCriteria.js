"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var OBRest_1 = require("./OBRest");
var _1 = require(".");
var OBRestUtils_1 = require("./OBRestUtils");
/**
 * OBCriteria class, equivalent to the criteria class in Openbravo.
 *
 * @author androettop
 */
var OBCriteria = /** @class */ (function () {
    function OBCriteria(axios, restWsName, entityName) {
        this._axios = axios;
        this._restWsName = restWsName;
        this._entityName = entityName;
        this._restrictions = new Array();
        this._maxResults = 1000000;
        this._firstResult = 0;
        this._orderBy = "";
        this._query = "";
        this._showIdentifiers = false;
        this._fields = [];
        this._distinct = "";
    }
    OBCriteria.prototype.setShowIdentifiers = function (value) {
        this._showIdentifiers = value;
        return this;
    };
    OBCriteria.prototype.setFields = function (value) {
        this._fields = value;
        return this;
    };
    /** Sets the max results */
    OBCriteria.prototype.setMaxResults = function (maxResults) {
        this._maxResults = maxResults;
        return this;
    };
    /** WARNING: This method empties the _restrictions object */
    OBCriteria.prototype.setQuery = function (rsqlQuery) {
        this._query = rsqlQuery;
        this._restrictions = new Array();
        return this;
    };
    /** Sets the first result */
    OBCriteria.prototype.setFirstResult = function (firstResult) {
        this._firstResult = firstResult;
        return this;
    };
    /** Sets the first result */
    OBCriteria.prototype.setDistinct = function (distinct) {
        this._distinct = distinct;
        return this;
    };
    /** Sets additional request parameters */
    OBCriteria.prototype.setAdditionalParameters = function (params) {
        this._additionalParams = params;
        return this;
    };
    /**
     * Add a restriction to the criteria, you must use the Restrictions methods,
     * WARNING: This method reset the _query object
     */
    OBCriteria.prototype.add = function (restriction) {
        this._restrictions.push(restriction);
        this._query = OBRestUtils_1.default.criteriaToRsql(_1.Restrictions.and(this._restrictions));
        return this;
    };
    /** Add order by to the criteria */
    OBCriteria.prototype.addOrderBy = function (property, ascending) {
        if (this._orderBy.length > 0) {
            this._orderBy += ",";
        }
        if (!ascending) {
            this._orderBy += "-";
        }
        this._orderBy += property;
        return this;
    };
    OBCriteria.prototype.list = function () {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, OBRest_1.default.getInstance().getAxios().request({
                            url: this._restWsName + "/" + this._entityName,
                            method: 'GET',
                            //TODO: add support for this params in java... in a new correct ws?
                            params: __assign(__assign(__assign({ sortBy: this._orderBy, firstResult: this._firstResult, maxResults: this._maxResults, q: this._query, identifiers: this._showIdentifiers }, (this._fields.length > 0 ? { fields: this._fields.join(",") } : {})), (this._distinct ? { distinct: this._distinct } : {})), this._additionalParams)
                        })];
                    case 1:
                        request = (_a.sent());
                        if (request.data && request.data.data) {
                            return [2 /*return*/, request.data.data];
                        }
                        else {
                            //TODO: error?
                            return [2 /*return*/, new Array()];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    OBCriteria.prototype.uniqueResult = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resultLst;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setMaxResults(1);
                        return [4 /*yield*/, this.list()];
                    case 1:
                        resultLst = _a.sent();
                        if (resultLst.length > 0) {
                            return [2 /*return*/, resultLst[0]];
                        }
                        else {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return OBCriteria;
}());
exports.default = OBCriteria;
