import Realm from "realm";
// "auth","vcCombos","vcOrders","autoBrands","storeUsers","remoteConfig","taskDefaultHandler","preLicenses","unread","readTimestamp"
//备注：vcOrders: 将info、parts、service 存成字符串
const allSchema = {
  readTimestamp: {
    name: "readTimestamp",
    properties: {
      review: "int"
    }
  },
  loginAuth: {
    name: "loginAuth",
    properties: {
      id: "string",
      name: "string",
      mobile: "string",
      token: "string",
      dateAdded: "string",
      dateModifyed: "string",
      sex: "string",
      status: "string",
      storeName: "string",
      storeId: "string"
    }
  },
  unread: {
    name: "unread",
    properties: {
      message: "int",
      review: "int",
      task: "int"
    }
  },
  vcOrders: {
    name: "vcOrders",
    properties: {
      vc: "string"
    }
  },
  _storeUsers: {
    name: "_storeUsers",
    properties: {
      id: "string",
      is_admin: "int",
      name: "string",
      mobile: "string"
    }
  },
  storeUsers: {
    name: "storeUsers",
    properties: {
      users: "_storeUsers[]"
    }
  },
  remoteConfig: {
    name: "remoteConfig",
    properties: {
      config: "string"
    }
  },
  taskDefaultHandler: {
    name: "taskDefaultHandler",
    properties: {
      id: "int",
      is_admin: "int",
      name: "string",
      mobile: "string"
    }
  },
  vcCombos: {
    name: "vcCombos",
    properties: {
      vcCombos: "string"
    }
  },
  originDemandConfig: {
    name: "originDemandConfig",
    properties: {
      showTip: "bool"
    }
  }
};
// console.log(Realm.defaultPath);
export default class RealmStorage {
  constructor() {
    this.currentRealm = null;
    this.allRealmName = [];

    this.init();
  }

  static getInstance() {
    if (!RealmStorage.instance) {
      RealmStorage.instance = new this();
    }
    return RealmStorage.instance;
  }

  init() {
    this.allRealmName = Object.keys(allSchema);
    let allRealmObj = this.allRealmName.map(name => {
      return allSchema[name];
    });
    // let time = new Date();

    this.currentRealm = Realm.open({ schema: allRealmObj }).then(realm => {
      // console.log(new Date() - time);
      return realm;
    })
  }

  close() {
    return this.currentRealm
      .then(realm => {
        realm.write(() => {
          realm.deleteAll();
        });
        return realm;
      })
      .then(realm => {
        // realm.close();
        RealmStorage.instance = null;
      });
  }

  save(key, item) {
    return this.currentRealm.then(realm => {
      realm.write(() => {
        realm.create(key, item);
      });
      return true;
    });
  }

  load(key) {
    return this.currentRealm.then(realm => {
      let currentData = null;
      realm.write(() => {
        currentData = realm.objects(key);
      });
      // console.log(key, currentData[0]);
      return currentData;
    });
  }

  update(key, item) {
    return this.currentRealm.then(realm => {
      let currentData = null;
      realm.write(() => {
        currentData = realm.objects(key);
        realm.delete(currentData);
        realm.create(key, item);
      });
      // console.log(currentData[0]);
      return "success";
    });
  }

  remove(key) {
    return this.currentRealm.then(realm => {
      realm.write(() => {
        let currentData = realm.objects(key);
        realm.delete(currentData);
      });
      return "success";
    });
  }
}
