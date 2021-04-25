import mongoose from "mongoose";

/**
 * Runs the provided `mutations` callback within a transaction and commits the changes to the DB
 * only when it has run successfully.
 *
 * @param mutations A callback which does DB writes and reads using a transaction session.
 */
export default async (mutations) => {
  return new Promise(async (resolve, reject) => {
    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        const result = await mutations(session);
        // Return any value returned by `mutations` to make this function as transparent as possible.
        resolve(result);
      });
      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      // Rethrow the error to be caught by the caller.
      reject(error);
    } finally {
      // End the previous session.
      session.endSession();
    }
  });
};
