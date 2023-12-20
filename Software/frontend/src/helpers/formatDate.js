import {format, parse} from 'date-fns';

const formatDate = (date, strFormat = 'MMM d, yyyy') => {
    if (!date) {
        return;
    }

    // Goal: 'Apr 5, 2023'
    try {
        const parsedDateTime = parse(date, 'yyyyMMdd', new Date());
        return format(parsedDateTime, strFormat);
    } catch (err) {
        console.error(err);
        return date;
    }
}

export default formatDate;
