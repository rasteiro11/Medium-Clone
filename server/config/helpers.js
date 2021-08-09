const sortArgsHelper = (sort) => {
    let sortArgs = {
        "sortBy": "_id",
        "order": "desc",
        "limit": 3,
        "skip": 0
    }

    for (key in sort) {
        if (sort[key]) {
            sortArgs[key] = sort[key]
        }
    }

    return sortArgs
}



module.exports = {
    sortArgsHelper
}