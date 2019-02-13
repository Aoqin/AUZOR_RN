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

  async init() {
    this.allRealmName = Object.keys(allSchema);
    let allRealmObj = this.allRealmName.map(name => {
      return allSchema[name];
    });
    let time = new Date();

    this.currentRealm = await Realm.open({ schema: allRealmObj });
    console.log(this.currentRealm);
  }

  async close() {
    const realm = await this.currentRealm;
    realm.write(async () => {
      await realm.deleteAll();
    });
    RealmStorage.instance = null;
    return realm;
  }

  async save(key, item) {
    const realm = await this.currentRealm;
    realm.write(async () => {
      await realm.create(key, item);
    });
    return true;
  }

  async load(key) {
    const realm = await this.currentRealm;
    console.log(realm);
    let currentData = null;
    realm.write(async () => {
      currentData = realm.objects(key);
    });
    return currentData;
  }

  async update(key, item) {
    const realm = await this.currentRealm;
    let currentData = null;
    realm.write(() => {
      currentData = realm.objects(key);
    });
    await realm.delete(currentData);
    await realm.create(key, item);
    return "success";
  }

  async remove(key) {
    const realm = await this.currentRealm;
    let currentData = null;
    await realm.write();
    currentData = realm.objects(key);
    await realm.delete(currentData);
    return "success";
  }
}
