import dateIsInvalid from 'date-is-invalid';

const toDateInstance = (date) => {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    return dateIsInvalid(date) ? null : date;
};

export default toDateInstance;
