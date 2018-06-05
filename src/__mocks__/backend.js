const backend = jest.genMockFromModule('../backend')

backend.default.hentKodeMeta.mockReturnValue(
  new Promise((resolve, reject) => resolve({}))
)

backend.default.hentPunkt.mockReturnValue(
  new Promise((resolve, reject) => resolve({}))
)

backend.default.hentAdmEnhet.mockReturnValue(
  new Promise((resolve, reject) => resolve(''))
)

backend.default.hentVerneområde.mockReturnValue(
  new Promise((resolve, reject) =>
    resolve(
      '<FeatureInfoResponse xmlns:esri_wms="http://www.esri.com/wms" xmlns="http://www.esri.com/wms"/>'
    )
  )
)

backend.default.hentStedsnavn.mockReturnValue(
  new Promise((resolve, reject) => resolve({}))
)

backend.default.getMetadataByNatureAreaLocalId.mockReturnValue(
  new Promise((resolve, reject) => resolve({}))
)

backend.default.mockReturnValue(new Promise((resolve, reject) => resolve({})))
module.exports = backend
