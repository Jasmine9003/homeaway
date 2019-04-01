const validate = values => {
  const errors = {};

  // Address Validations
  if (!values.addressline1) {
    errors.addressline1 = "Required";
  }
  if (!values.addressline2) {
    errors.addressline1 = "Required";
  }
  if (!values.city) {
    errors.city = "Required";
  }
  if (!values.country) {
    errors.country = "Required";
  }
  if (!values.phone) {
    errors.phone = "Required";
  }
  if (
    !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(
      values.phone
    )
  ) {
    errors.phone = "Invalid Phone Number";
  }
  if (!values.state) {
    errors.state = "Required";
  }

  if (!values.zip) {
    errors.zip = "Required";
  }
  if (!/^[0-9]{1,6}$/.test(values.zip)) {
    errors.zip = "Invalid Zip";
  }

  //Description Validations
  if (!values.headline) {
    errors.headline = "Required";
  }
  if (!values.description) {
    errors.description = "Required";
  } else if (values.description.length < 200) {
    errors.description = "Minimum 200 Characters Requires";
  }
  if (!values.bedrooms) {
    errors.bedrooms = "Required";
  } else if (values.bedrooms.valueOf() <= 0 || values.bedrooms.valueOf() > 99) {
    errors.bedrooms = "Invalid Bedrooms";
  }
  if (!values.accomodates) {
    errors.accomodates = "Required";
  } else if (
    values.accomodates.valueOf() <= 0 ||
    values.accomodates.valueOf() > 99
  ) {
    errors.accomodates = "Invalid Accomodations";
  }
  if (!values.bathrooms) {
    errors.bathrooms = "Required";
  } else if (
    values.bathrooms.valueOf() <= 0 ||
    values.bathrooms.valueOf() > 99
  ) {
    errors.bathrooms = "Invalid Bathrooms";
  }
  if (!values.placetype) {
    errors.placetype = "Required";
  }

  if (!values.image) {
    errors.image = "Required";
  }
  if (!values.startDate) {
    errors.startDate = "Required";
  }
  if (!values.endDate) {
    errors.endDate = "Required";
  }

  if (!values.currency) {
    errors.currency = "Required";
  }
  if (!values.nightlybaserent) {
    errors.nightlybaserent = "Required";
  }
  if (!values.minimumstay) {
    errors.minimumstay = "Required";
  }


  
  return errors;
};

export default validate;
