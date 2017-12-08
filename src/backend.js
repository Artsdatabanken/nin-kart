
class Backend {

    static async postFilterPromise(url, filter) {
        return new Promise((resolve, reject) => {
            fetch(
                url,
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(filter),
                }
            )
                .then(result => result.json())
                .then(json => resolve(json));
        });
    }

    static async getPromise(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(result => result.json())
                .then(json => resolve(json));
        });
    }

    static async getToken() {
        return this.getPromise(`https://www.norgeskart.no/ws/gkt.py`);
    }

    static async getNatureAreaByLocalId(localId) {
        return this.getPromise(
            `http://it-webadbtest01.it.ntnu.no/nin_master/Api/data/GetNatureAreaByLocalId/${localId}`);
    }
    static async getMetadataByNatureAreaLocalId(localId) {
        return this.getPromise(
            `http://it-webadbtest01.it.ntnu.no/nin_master/Api/data/GetMetadataByNatureAreaLocalId/${localId}`);
    }

    static async countsByRedlistTheme(filter) {
        let url = `https://adb-nin-api.azurewebsites.net/api/CountsByRedlistTheme`;
        return this.postFilterPromise(url, filter);
    }

    static async countsByRedlistCategory(filter) {
        let url = `https://adb-nin-api.azurewebsites.net/api/CountsByRedlistCategory`;
        return this.postFilterPromise(url, filter);
    }

    static async getAreaSummary(filter) {
        let url = `http://it-webadbtest01.it.ntnu.no/nin_master/Api/data/GetAreaSummary/`;
        return this.postFilterPromise(url, filter);
    }

    static async getNatureAreaSummary(filter) {
        let url = `http://it-webadbtest01.it.ntnu.no/nin_master/Api/data/GetNatureAreaSummary/`;
        return this.postFilterPromise(url, filter);
    }

    static NatureLevelNames = Object.freeze({
        0: "Udefinert",
        1: "Landskapstype",
        2: "Landskapsdel",
        3: "Naturkompleks",
        4: "Natursystem",
        5: "Naturkomponent",
        6: "Livsmedium",
        7: "Egenskapsområde"
    });

}

export default Backend;
