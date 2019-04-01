import React from "react";

export const renderField = ({ input, label, maxLength, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input
        {...input}
        placeholder={label}
        type={type}
        className="form-control"
        maxLength={maxLength}
      />
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
);


export const renderTextArea = ({ input,rows, maxLength , label, maxlength, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea
        {...input}
        placeholder={label}
        type={type}
        className="form-control"
        maxLength={maxLength}
        rows={rows}
      />{" "}
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
);


export const renderFieldLarge = ({ input, label, maxLength, type, meta: { touched, error } }) => (
  <div>
    <div>
      <input
        {...input}
        placeholder={label}
        type={type}
        className="form-control form-control-lg"
        maxLength={maxLength}
      />
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
);


export const renderFieldSharp = ({ input, label, maxLength, type, meta: { touched, error } }) => (
  <div>
    <div>
      <input
        {...input}
        placeholder={label}
        type={type}
        className="form-control sharpEdges"
        maxLength={maxLength}
      />
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
);

export const renderFieldMedium = ({ input, label, maxLength, type, meta: { touched, error } }) => (
  <div>
    <div>
      <input
        {...input}
        placeholder={label}
        type={type}
        className="form-control form-control-md"
        maxLength={maxLength}
      />
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>




);

export const renderFieldMediumForProfile = ({ input, placeholder, maxLength, type, meta: { touched, error } }) => (
  <div>
        <label>{placeholder}</label>

    <div>
      <input
        {...input}
        placeholder={placeholder}
        type={type}
        className="form-control form-control-md"
        maxLength={maxLength}
      />
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>



);export const renderTextAreaForProfile = ({ input,rows, maxLength , placeholder, maxlength, type, meta: { touched, error } }) => (
  <div>
        <label>{placeholder}</label>

    <div>
      <textarea
        {...input}
        placeholder={placeholder}
        type={type}
        className="form-control form-control-md "
        maxLength={maxLength}
        rows={rows}
      />{" "}
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
);