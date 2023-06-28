![](https://exos-solutions.com/wp-content/uploads/2021/12/Etendo-RGB-02.png)

# 📚 ETRest - Rest library for Etendo secure web services module. 🌐

## 📄 Documentation

You can see the [code reference here](https://github.com/etendosoftware/etrest)

## 🔬 Run tests

It's important to run tests before making changes in the Etendo module. 👨‍💻

```
$ yarn test
```

## 🚀 Release to npm

You should increment the version number of the package.json file and run the following commands.

```
$ yarn build
$ npm publish --tag next --access public
```

## 📝 Examples

```
import { OBRest } from "etrest";

let criteria = OBRest.getInstance().createCriteria("Organization");
```

### 🚀 Initialize app

```
import { OBRest } from "obrest";

OBRest.init("http://localhost:8080");
```

### 🔐 Login with username and password / token

The app should be initialized before login 💻

```
await OBRest.loginWithUserAndPassword("admin", "admin"); //Make a request to get token

OBRest.loginWithToken("your_token"); //only set token
```

### 📋 Create criterias

The user should be logged before get data. 🗂️

```
let criteria = OBRest.getInstance().createCriteria("Product");

criteria.add(Restriction.equals("name", "Cerveza Lager 0,5L"));

//make a request to get the products list
criteria.list();

//make a request to get only the first result
criteria.uniqueResult();
```

💬 _Check the code reference for more information about Restrictions_ 💬

### ✏️ Create/Update objects

The user should be logged before create data. 🆕📝

```
let myProduct = {
    "_entityName":"Product", // this field is required.
    "searchKey": "ES/1234",
    "name": "Test product with OBRest.js",
    "description": "This is a test product created using OBRest.js",
    "uOM": "100",
    "salesRepresentative": "100",
    "summaryLevel": false,
    "stocked": true,
    "purchase": true,
    "sale": true,
    "productCategory": "DC7F246D248B4C54BFC5744D5C27704F",
    "volume": 0,
    "weight": 0,
    "taxCategory": "E020A69A1E784DC39BE57C41D6D5DB4E"
}


let refreshedProduct = await OBRest.getInstance().save(myProduct); //this method save the object in etendo and return a promise with the saved object.

// you can save a objects list too
let refreshedProductList = await OBRest.getInstance().saveList([myProduct]); //this method save the objects in etendo and return a promise with the saved list.
```

💬 _It is always better to save lists than individual objects_ 📥💾

### 🗑️ Remove objects

The user should be logged before delete data. 🚫

```
let myProduct = {
    "_entityName":"Product", // this field is required.
    "searchKey": "ES/1234",
    "name": "Test product with OBRest.js",
    "description": "This is a test product created using OBRest.js",
    "uOM": "100",
    "salesRepresentative": "100",
    "summaryLevel": false,
    "stocked": true,
    "purchase": true,
    "sale": true,
    "productCategory": "DC7F246D248B4C54BFC5744D5C27704F",
    "volume": 0,
    "weight": 0,
    "taxCategory": "E020A69A1E784DC39BE57C41D6D5DB4E"
}


let refreshedProduct = await OBRest.getInstance().remove(myProduct); //this method save the object in etendo and return a promise with the saved object.

// you can remove a objects list too❗
let refreshedProductList = await OBRest.getInstance().removeList([myProduct]); //this method remove the objects in etendo and return a promise with the removed list.
```

_It is always better to remove lists than individual objects_ 📝📤
