export const safeDocument = (doc, unwantedKeys = []) => {
    if (!doc || typeof doc.toObject !== "function") {
        return doc;
    }

    const cleanedObject = doc.toObject({
        versionKey: false,
        transform: (doc, ret) => {
            delete ret.createdAt;
            delete ret.updatedAt;
        },
    });

    unwantedKeys.forEach((key) => {
        delete cleanedObject[key];
    });

    return cleanedObject;
};
