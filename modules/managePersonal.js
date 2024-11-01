export function SalesMan(sid, firstname, lastname) {
    this.sid = sid,
    this.firstname = firstname,
    this.lastname = lastname
    this.gids = [];
};

export function SocialPerformanceRecord(gid, description, targetValue, actValue, year) {
    this.gid = gid,
    this.description = description,
    this.targetValue = targetValue,
    this.actValue = actValue,
    this.year = year
};

let SalesManStorage = [
    { "sid": 453, "firstname": "John", "lastname": "Doe", "gids": [12,47] },
    { "sid": 812, "firstname": "Emma", "lastname": "Smith", "gids": [23] },
    { "sid": 329, "firstname": "James", "lastname": "Johnson", "gids": [88] },
    { "sid": 114, "firstname": "Sophia", "lastname": "Williams", "gids": [34] },
    { "sid": 947, "firstname": "Michael", "lastname": "Brown", "gids": [56] },
    { "sid": 266, "firstname": "Olivia", "lastname": "Jones", "gids": [75] },
    { "sid": 795, "firstname": "William", "lastname": "Garcia", "gids": [19] },
    { "sid": 512, "firstname": "Isabella", "lastname": "Martinez", "gids": [] },
    { "sid": 678, "firstname": "David", "lastname": "Rodriguez", "gids": [] },
    { "sid": 231, "firstname": "Mia", "lastname": "Lopez", "gids": [] },
    { "sid": 349, "firstname": "Ethan", "lastname": "Gonzalez", "gids": [62] },
    { "sid": 587, "firstname": "Ava", "lastname": "Harris", "gids": [44] }
];

let SocialPerformanceRecordStorage = [
    {
        "gid": 12,
        "description": "Employee satisfaction",
        "targetValue": 150,
        "actValue": 140,
        "year": 2021
    },
    {
        "gid": 47,
        "description": "Community outreach impact",
        "targetValue": 100,
        "actValue": 110,
        "year": 2020
    },
    {
        "gid": 23,
        "description": "Carbon footprint reduction",
        "targetValue": 75,
        "actValue": 80,
        "year": 2019
    },
    {
        "gid": 88,
        "description": "Diversity & inclusion score",
        "targetValue": 120,
        "actValue": 115,
        "year": 2023
    },
    {
        "gid": 34,
        "description": "Training hours per employee",
        "targetValue": 60,
        "actValue": 65,
        "year": 2022
    },
    {
        "gid": 56,
        "description": "Employee retention rate",
        "targetValue": 90,
        "actValue": 85,
        "year": 2021
    },
    {
        "gid": 19,
        "description": "Volunteer participation rate",
        "targetValue": 80,
        "actValue": 70,
        "year": 2018
    },
    {
        "gid": 75,
        "description": "Health & wellness index",
        "targetValue": 130,
        "actValue": 125,
        "year": 2022
    },
    {
        "gid": 62,
        "description": "Education support projects",
        "targetValue": 100,
        "actValue": 95,
        "year": 2020
    },
    {
        "gid": 44,
        "description": "Work-life balance initiatives",
        "targetValue": 85,
        "actValue": 90,
        "year": 2019
    }
];

export function createSalesMan(SalesMan){
    if(SalesManStorage.find(man => man.sid === SalesMan.sid)){
        return 'Theres already a Salesman with this Id.';
    }
    
    SalesManStorage.push(SalesMan);
    console.log(SalesManStorage);
    
    return true;
}

export function readSalesMan(sid) {
    const foundSalesMan = SalesManStorage.find(SalesMan => SalesMan.sid === sid);

    if(foundSalesMan !== undefined){
        return foundSalesMan;
    }

    return 'No SalesMan found';
}

export function readAllSalesMen() {
    return SalesManStorage;
}

export function updateSalesMan(SalesMan) {
    const foundSalesMan = SalesManStorage.find(salesman => salesman.sid === SalesMan.sid);
    
    if( foundSalesMan === undefined){
        return 'theres no SalesMan';
    }
    
    Object.assign(foundSalesMan, SalesMan);

    return true;
}

export function deleteSalesMan(SalesMan) {
    const foundIndex = SalesManStorage.findIndex(salesman => salesman.sid === SalesMan.sid); 
    
    if(( foundIndex == -1 )){
        return 'Theres no SalesMan';
    }

    SalesManStorage.splice(foundIndex,1);

    return true;
}

export function addSocialPerformanceRecord(SalesMan, record) {
    const foundSalesMan = SalesManStorage.find(man => man.sid === SalesMan.sid);

    if(foundSalesMan === undefined){
        return 'No such SalesMan';
    }
    
    SalesMan.gids.push(record.gid);

    updateSalesMan(SalesMan);

    const checkRecord = SocialPerformanceRecordStorage.find(foundRecord => foundRecord.gid === record.gid);

    if(checkRecord != undefined) {
        return 'An record with this id already exists';
    }

    SocialPerformanceRecordStorage.push(record);
    console.log(SocialPerformanceRecordStorage);
    
    return true;
}

export function readSocialPerformanceRecords(SalesMan) {
    let foundRecords = [];
    
    console.log(SalesMan);

    SalesMan.gids.forEach(element => {
        console.log(element);
        const foundRecord = SocialPerformanceRecordStorage.find(record => record.gid === element);
        foundRecords.push(foundRecord);
    });

    console.log(SocialPerformanceRecordStorage);
    

    return foundRecords;
}

export function readSocialPerformanceRecord(gid) {
    const foundRecord = SocialPerformanceRecordStorage.find(record => record.gid === gid);

    if(foundRecord == -1){
        return 'Theres no record with this id';
    }

    return foundRecord;
}

export function deleteSocialPerformanceRecord(SalesMan,record) {
    const foundRecord = SocialPerformanceRecordStorage.find(actRecord => actRecord.gid === record.gid);
    
    if(foundRecord === undefined){
        return 'Theres no Record with this id';
    }

    let foundIndex = SalesMan.gids.findIndex(foundRecord => foundRecord.gid === record.gid);
    SalesMan.gids.splice(foundIndex, 1);
    updateSalesMan(SalesMan);

    foundIndex = SalesMan.gids.findIndex(foundRecord => foundRecord.gid === record.gid);
    SocialPerformanceRecordStorage.splice(foundIndex, 1);

    return true;
}