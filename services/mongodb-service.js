async function getDocuments(MongoModel) {
    const entitys = await MongoModel.find();
    return entitys;
}
async function getDocument(MongoModel, id) {
    const entity = await MongoModel.find({ _id: id });
    return entity;
}

async function postDocument(MongoModel, newdocument) {
    const entity = new MongoModel(newdocument);
    try {
        const res = await entity.save();
    } catch (ex) {
        for (let err in ex.errors) {
            console.log(ex.errors[err].message);
        }
    }
}
async function updateDocument(MongoModel, id, newdocument) {
    const entity = await MongoModel.findByIdAndUpdate(id, {
        $set: newdocument
    }, { new: true });

    return entity;
}
async function deleteDocument(MongoModel, id) {
    const entity = await MongoModel.deleteOne({ _id: id });
    console.log("deleted: ", entity)
}

exports.postDocument = postDocument;
exports.getDocuments = getDocuments;
exports.getDocument = getDocument;
exports.updateDocument = updateDocument;
exports.deleteDocument = deleteDocument;