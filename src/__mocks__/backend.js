const backend = jest.genMockFromModule("Funksjoner/backend");

backend.default.hentKodeMeta.mockReturnValue(
  new Promise((resolve, reject) => resolve({}))
);

backend.default.hentPunkt.mockReturnValue(
  new Promise((resolve, reject) => resolve({}))
);

backend.default.hentStedsnavn.mockReturnValue(
  new Promise((resolve, reject) => resolve({}))
);

backend.default.getMetadataByNatureAreaLocalId.mockReturnValue(
  new Promise((resolve, reject) => resolve({}))
);

backend.default.mockReturnValue(new Promise((resolve, reject) => resolve({})));
module.exports = backend;
