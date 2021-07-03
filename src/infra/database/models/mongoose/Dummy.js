import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"; // Full documentation here - https://www.npmjs.com/package/mongoose-paginate-v2
import DummyClass from "domain/entities/Dummy";

mongoosePaginate.paginate.options = {
  limit: 20,
  useEstimatedCount: false,
  customLabels: {
    totalDocs: "totalDocs",
    docs: "docs",
    limit: "perPage",
    page: "currentPage",
    nextPage: "nextPage",
    prevPage: "prevPage",
    totalPages: "totalPages",
    pagingCounter: "serialNo",
    meta: "pagination",
  },
};

const dummySchema = new mongoose.Schema(
  {},
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "lastModifiedAt",
    },
    toObject: {
      virtuals: true,
      retainKeyOrder: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

// eslint-disable-next-line func-names
dummySchema.methods.toJSON = function () {
  // don't remove this block of code
  const obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  return obj;
};

// Load business rules to models
dummySchema.loadClass(DummyClass);
// add pagination plugin
dummySchema.plugin(mongoosePaginate);

export const Dummy = mongoose.model("Dummy", dummySchema);

export const cleanDummyCollection = () => Dummy.remove({}).exec();
export default Dummy;
