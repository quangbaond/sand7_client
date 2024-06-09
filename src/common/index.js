import moment from "moment";
// save data to location storage by key
export const setStorage = (key, data) => {
    window.localStorage.setItem(key, JSON.stringify(data));
};

// get data from location storage by key
export const getStorage = (key) => {
    const data = window.localStorage.getItem(key);
    console.log(data);

    if (data) {
        return JSON.parse(data);
    }
    return null;
};

// remove data from location storage by key
export const removeStorage = (key) => {
    window.localStorage.removeItem(key);
};

export const formatDateTime = (date) => {
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
};

export const formatCurrency = (value) => {
    return value.toLocaleString("en-US", { style: "currency", currency: "USD" });

}