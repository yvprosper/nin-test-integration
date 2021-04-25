class InvalidEntityDataError extends Error {
  constructor(errors) {
    super("Provide a valid entity data");
    this.name = "InvalidEntityDataError";
    this.code = "INVALID_ENTITY_DATA_ERROR";
    this.details = errors.map((error) => {
      return { message: error.message };
    });
  }
}

export default InvalidEntityDataError;
