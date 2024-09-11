const config = require("../config/config");
const ShipEngine = require("shipengine");
const shipengine = new ShipEngine(config.SHIP_ENGINE_KEY);

async function listCarriers() {
  const carriers = await shipengine.listCarriers();
  return carriers.map((carrier) => carrier.carrierId);
}

async function validateAddresses({
  firstName,
  lastName,
  addressLine1,
  addressLine2,
  cityLocality,
  stateProvince,
  postalCode,
}) {
  // 1) Build a params object for API call
  const params = [
    {
      name: `${firstName} ${lastName}`,
      addressLine1,
      addressLine2,
      cityLocality,
      stateProvince,
      postalCode,
      countryCode: "US",
    },
  ];

  // 2) Validate Address API call
  try {
    const validation = await shipengine.validateAddresses(params);

    if (validation[0].status === "verified") {
      // Extract normalized address fields for order
      const { addressResidentialIndicator, postalCode } =
        validation[0]["normalizedAddress"];
      return { addressResidentialIndicator, postalCode };
    } else {
      // Bad address. Print the warning & error messages
      console.log("The address is not valid");
      console.log(validation);
      console.log(validation[0].messages);
      return validation;
    }
  } catch (e) {
    console.log("Error validating address: ", e.message);
    return e;
  }
}

async function getRates(shipment) {
  const carrierIds = await listCarriers();
  const params = {
    rateOptions: {
      carrierIds,
      serviceCodes: [
        "usps_first_class_mail",
        "usps_priority_mail",
        "ups_ground",
        "fedex_ground",
      ],
      packageTypes: ["package"],
    },
    shipment,
  };

  try {
    const result = await shipengine.getRatesWithShipmentDetails(params);
    return result;
  } catch (e) {
    console.log("Error creating rates: ", e.message);
    return e;
  }
}

async function createLabel(rateId) {
  const params = {
    rateId,
    validateAddress: "no_validation",
    labelLayout: "4x6",
    labelFormat: "pdf",
    labelDownloadType: "url",
    displayScheme: "label",
  };

  try {
    const result = await shipengine.createLabelFromRate(params);
    return result;
  } catch (e) {
    console.log("Error creating label: ", e.message);
  }
}

async function trackUsingLabelId(labelId) {
  try {
    const result = await shipengine.trackUsingLabelId(labelId);
    return result;
  } catch (e) {
    console.log("Error tracking shipment: ", e.message);
  }
}

module.exports = {
  validateAddresses,
  getRates,
  createLabel,
  trackUsingLabelId,
};
