export { AppServerModule as default } from './app/Angular/app.module.server';


const valuesMap = new Map()

class LocalStorage {
    getItem(key: any) {
        const stringKey = String(key)
        if (valuesMap.has(key)) {
            return String(valuesMap.get(stringKey))
        }
        return null
    }

    setItem(key: any, val: any) {
        valuesMap.set(String(key), String(val))
    }

    removeItem(key: any) {
        valuesMap.delete(key)
    }

    clear() {
        valuesMap.clear()
    }

    key(i: any) {
        if (arguments.length === 0) {
            throw new TypeError("Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present.") // this is a TypeError implemented on Chrome, Firefox throws Not enough arguments to Storage.key.
        }
        var arr = Array.from(valuesMap.keys())
        return arr[i]
    }

    get length() {
        return valuesMap.size
    }
}
const instance: any = new LocalStorage()

global.localStorage = new Proxy(instance, {
    set: function (obj, prop, value) {
        if (LocalStorage.prototype.hasOwnProperty(prop)) {
            instance[prop] = value
        } else {
            instance.setItem(prop, value)
        }
        return true
    },
    get: function (target, name) {
        if (LocalStorage.prototype.hasOwnProperty(name)) {
            return instance[name]
        }
        if (valuesMap.has(name)) {
            return instance.getItem(name)
        }
    }
})