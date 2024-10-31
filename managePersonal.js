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

let SalesManStorage = [];

let SocialPerformanceRecordStorage = [];

export function createSalesMan(SalesMan){
    if(SalesManStorage.includes(SalesMan)){
        return false;
    }
    
    SalesManStorage.push(SalesMan);
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
    SalesMan.gids.push(record.gid);

    const checkRecord = SocialPerformanceRecordStorage.find(foundRecord => foundRecord.gid === record.gid);

    if(checkRecord != undefined) {
        return 'An record with this id already exists';
    }

    SocialPerformanceRecordStorage.push(record);

    return true;
}

export function readSocialPerformanceRecords(SalesMan) {
    let foundRecords = [];
    
    SalesMan.gids.forEach(element => {
        const foundRecord = SocialPerformanceRecordStorage.find(record => record.gid === element.gid);
        foundRecords.push(foundRecord);
    });

    return foundRecords;
}

export function readSocialPerformanceRecord(gid) {
    const foundRecord = SocialPerformanceRecordStorage.find(record => record.gid === gid);

    if(foundRecord == -1){
        return 'Theres no record with this id';
    }

    return foundRecord;
}

export function delSocialPerformanceRecord(record, SalesMan) {
    if(!SocialPerformanceRecordStorage.includes(record.gid)){
        return 'Theres no Record with this id';
    }

    let foundIndex = SalesMan.gids.findIndex(foundRecord => foundRecord.gid === record.gid);
    SalesMan.gids.splice(foundIndex, 1);
    updateSalesMan(SalesMan);

    foundIndex = SalesMan.gids.findIndex(foundRecord => foundRecord.gid === record.gid);
    SocialPerformanceRecordStorage.splice(foundIndex, 1);

    return true;
}