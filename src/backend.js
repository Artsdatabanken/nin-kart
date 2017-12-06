
class Backend {
    static async getToken() {
        return new Promise((resolve, reject) => {
            fetch(`https://www.norgeskart.no/ws/gkt.py`)
                .then(result => result.json())
                .then(json => resolve(json));
        });
    }

    static async getNatureAreaByLocalId(localId) {
        return new Promise((resolve, reject) => {
            fetch(
                `http://it-webadbtest01.it.ntnu.no/nin_master/Api/data/GetNatureAreaByLocalId/${
                    localId
                    }`
            )
                .then(result => result.json())
                .then(json => resolve(json));
        });
    }
    static async getMetadataByNatureAreaLocalId(localId) {
        return new Promise((resolve, reject) => {
            fetch(
                `http://it-webadbtest01.it.ntnu.no/nin_master/Api/data/GetMetadataByNatureAreaLocalId/${
                    localId
                    }`
            )
                .then(result => result.json())
                .then(json => resolve(json));
        });
    }

    static async getAreaSummary(filter) {
        return new Promise((resolve, reject) => {
            fetch(
                `http://it-webadbtest01.it.ntnu.no/nin_master/Api/data/GetAreaSummary/`,
                {
                    method: "POST",
                    body: filter
                }
            )
                .then(result => result.json())
                .then(json => resolve(json));
        });
    }
    static async getNatureAreaSummary(filter) {
        return new Promise((resolve, reject) => {
            fetch(
                `http://it-webadbtest01.it.ntnu.no/nin_master/Api/data/GetNatureAreaSummary/`,
                {
                    method: "POST",
                    body: filter
                }
            )
                .then(result => result.json())
                .then(json => resolve(json));
        });
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
