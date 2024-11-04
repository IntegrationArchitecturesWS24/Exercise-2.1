export function SalesMan(sid, firstname, lastname) {
  this.sid = sid;
  this.firstname = firstname;
  this.lastname = lastname;
  this.gids = [];
}

SalesMan.prototype.addSocialPerformanceRecord = function (record) {
  if (record instanceof Number) {
    this.gids.push(record);
    return this;
  }
  this.gids.push(record.gid);
  return this;
};

SalesMan.prototype.removeSocialPerformanceRecord = function (record) {
  const index = this.gids.findIndex((gid) => gid === record.gid);
  this.gids.splice(index, 1);
  return this;
};

export function SocialPerformanceRecord(
  gid,
  description,
  targetValue,
  actValue,
  year
) {
  this.gid = gid;
  this.description = description;
  this.targetValue = targetValue;
  this.actValue = actValue;
  this.year = year;
}

let socialRecordsStorage = [
  new SocialPerformanceRecord(1, "Something", 5, 3, 2021),
  new SocialPerformanceRecord(2, "Another", 5, 4, 2023),
  new SocialPerformanceRecord(3, "Yes", 5, 5, 2022),
];

let salesManStorage = [
  new SalesMan(1, "Sascha", "Alda").addSocialPerformanceRecord(
    socialRecordsStorage[0]
  ),
  new SalesMan(2, "Hans", "Müller")
    .addSocialPerformanceRecord(socialRecordsStorage[1])
    .addSocialPerformanceRecord(socialRecordsStorage[2]),
  new SalesMan(3, "Max", "Mustermann"),
];

export function createSalesMan(salesman) {
  if (salesManStorage.find((man) => man.sid === salesman.sid)) {
    return false;
  }
  salesManStorage.push(salesman);
  return true;
}

export function readSalesMan(sid) {
  return salesManStorage.find((salesman) => salesman.sid === sid);
}

export function readAllSalesMen() {
  return salesManStorage;
}

export function updateSalesMan(updatedSalesman) {
  const foundSalesMan = readSalesMan(updatedSalesman.sid);

  if (!foundSalesMan) {
    return false;
  }

  foundSalesMan.firstname = updatedSalesman.firstname;
  foundSalesMan.lastname = updatedSalesman.lastname;
  foundSalesMan.gids = updatedSalesman.gids;

  return true;
}

export function deleteSalesMan(salesman) {
  const foundIndex = SalesManStorage.findIndex((s) => s.sid === salesman.sid);

  if (foundIndex == -1) {
    return false;
  }

  salesManStorage[foundIndex].gids.forEach((gid) => {
    deleteSocialPerformanceRecord(salesman, readSocialPerformanceRecord(gid));
  });
  salesManStorage.splice(foundIndex, 1);

  return true;
}

export function addSocialPerformanceRecord(salesman, record) {
  const foundSalesman = readSalesMan(salesman.sid);
  if (!foundSalesman) {
    return false;
  }

  if (readSocialPerformanceRecord(record.gid)) {
    return false;
  }

  foundSalesman.addSocialPerformanceRecord(record);
  socialRecordsStorage.push(record);
  return true;
}

export function readSocialPerformanceRecords(salesman) {
  let foundRecords = [];

  salesman.gids.forEach((record) => {
    foundRecords.push(readSocialPerformanceRecord(record.gid));
  });

  return foundRecords;
}

export function readSocialPerformanceRecord(gid) {
  return socialRecordsStorage.find((record) => record.gid === gid);
}

export function deleteSocialPerformanceRecord(salesman, record) {
  const foundSalesman = readSalesMan(salesman.sid);
  if (!foundSalesman) return false;
  if (!salesman.gids.find((gid) => gid === record.gid)) return false;

  const foundRecord = readSocialPerformanceRecord(record.gid);
  if (!foundRecord) {
    return false;
  }

  foundSalesman.removeSocialPerformanceRecord(foundRecord);
  const foundIndex = socialRecordsStorage.findIndex(
    (record) => record.gid === foundRecord.gid
  );
  socialRecordsStorage.splice(foundIndex, 1);
  return true;
}
