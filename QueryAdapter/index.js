const moduleName = "[QueryAdapter]"
const logger = require("/third-party/logger")(moduleName)

const queryAdapter = async (queryObject) => {
    const {query, model, body, filter, projection, options} = queryObject;
    let result = null;
    try {
        if (query.queryType === "insert") {
            if (query.operation === "many") {
                result = await model.collection.insertMany(body);
                return {success: true, result};
            }
            result = await model.create(body);
            return {success: true, result};
        }
        if (query.queryType === "find") {
            if (query.queryOperation === "many") {
                result = await model.find(filter, projection, options);
                return {success: true, result};
            }
            result = await model.findOne(filter, projection, options);
            return {success: true, result};
        }

        if (query.queryType === "count") {
            if (query.queryOperation === "estimated") {
                result = await model.estimatedDocumentCount();
                return {success: true, result};
            }
            result = await model.countDocuments(filter);
            return {success: true, result};
        }

        if (query.queryType === "update") {
            if (query.queryOperation === "many") {
                result = await model.updateMany(filter, body, options);
                return {success: true, result};
            }
            result = await model.updateOne(filter, body, options);
            return {success: true, result};
        }
        if (query.queryType === "findAndUpdate") {
            result = await model.findOneAndUpdate(filter, body, options);
            return {success: true, result};
        }
        if (query.queryType === "delete") {
            if (query.queryOperation === "many") {
                result = await model.deleteMany(filter);
                return {success: true, result};
            }
            result = await model.deleteOne(filter);
            return {success: true, result};
        }
    } catch (e) {
        logger.error(`[${query}, ${filter}] [ERROR]`, e.message)
        console.log("Error => ", e);
        throw e;
    }
};
module.exports = {
    queryAdapter,
};