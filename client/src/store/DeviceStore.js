import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this._types = [];
    this._brands = [];
    this._devices = [];
    this._selectedType = {};
    this._selectedBrand = {};
    this._selectedDevice = {};
    this._page = 1;
    this._totalGoodCount = 0;
    this._limit = 3;

    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }

  setBrands(brands) {
    this._brands = brands;
  }

  setDevices(devices) {
    this._devices = devices;
  }

  setSelectedType(type) {
    this.setPage(1);
    this._selectedType = type;
  }

  setSelectedBrand(brand) {
    this.setPage(1);
    this._selectedBrand = brand;
  }

  setSelectedDevice(brand) {
    this._selectedBrand = brand;
  }

  setPage(page) {
    this._page = page;
  }

  setTotalGoodCount(count) {
    this._totalGoodCount = count;
  }

  setLimit(limit) {
    this._limit = limit;
  }

  get types() {
    return this._types;
  }

  get brands() {
    return this._brands;
  }

  get devices() {
    return this._devices;
  }

  get selectedType() {
    return this._selectedType;
  }

  get selectedBrand() {
    return this._selectedBrand;
  }

  get selectedDevice() {
    return this._selectedDevice;
  }

  get page() {
    return this._page;
  }

  get totalGoodCount() {
    return this._totalGoodCount;
  }

  get limit() {
    return this._limit;
  }
}
