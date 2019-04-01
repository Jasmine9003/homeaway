import React from "react";
import Dropzone from "react-dropzone";
import { Field, reduxForm, getFormSyncErrors } from "redux-form";
import validate from "./validation";
import { connect } from "react-redux";
import { v4 } from "node-uuid";

const validateImage = imageList => {
  if (imageList) {
    if (imageList.length > 5) {
      alert("You can't upload more than 5");
      return "You can't upload more than 5";
    } else if (imageList.length < 2) {
      alert("Minimum 2 Images Required");
      return "Minimum 2 Images Required";
    } else if (imageList.length >= 2 && imageList.length <= 5) {
      let err = "";
      let selectedImage = [];
      for (let i = 0; i < imageList.length; i++) {
        selectedImage.push(imageList[i]);
      }
      selectedImage.forEach(image => {
        if (!image.type.match("image.*")) {
          alert("Only image files are allowed");
          err = "Only image files are allowed";
        } else if (image.size > 9145728) {
          alert("Maximum file size exceeded");
          err = "Maximum file size exceeded";
        }
      });

      if (err !== "") {
        return err;
      }
    }
  }
};

const renderDropzoneField = function({
  input,
  multiple,
  name,
  meta: { dirty, error }
}) {
  return (
    <div>
      <Dropzone
        className="dropzone"
        name={name}
        onDrop={filesToUpload => input.onChange(filesToUpload)}
        multiple={multiple}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div>
          Try dropping some files here, or click to select files to upload.
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </Dropzone>
      <br />
      <br />
      <br />
      {dirty && (error && <span className="text-danger">{error}</span>)}
    </div>
  );
};

class ImagesForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      preview: []
    };
    this.onChange = this.onChange.bind(this);

  }

  onChange(e) {
    var result = Object.keys(e).map(function(key) {
      return e[key];
    });
    result.splice(-1, 1);
    this.setState({ preview: result });
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.inputErrors &&
      newProps.inputErrors !== this.props.inputErrors
    ) {
      console.log(newProps.inputErrors);
      if (newProps.inputErrors.image) {
        // clear invalid image field
        this.props.change("image", "");
        this.setState({ preview: [] });
      }
    }
  }

  render() {
   
    let thumbnails = this.state.preview.map(image => {
      
      return (
        <li key={v4()}>
          <img
            key={v4()}
            src={image.preview}
            alt=""
            className="img-thumbnail resize"
          />
        </li>
      );
    });

    const { nextPage, previousPage } = this.props;
    return (
      <div className="col-12">
        <div className="card  sharpEdges shadow-lg">
          <form>
            <div className="card-body ">
              <h5 className="card-title">Upload Photos</h5>
              <hr />
              <div className="card-text text-center ">
                <div className="dottedbox">
                  <br />
                  <br />
                  <br />
                  <div className="container">
                    <Field
                      onChange={this.onChange}
                      validate={validateImage}
                      name="image"
                      component={renderDropzoneField}
                    />

                    {this.state.preview.length > 0 ? <h3>Preview</h3> : null}
                    <ul className="imagelist">{thumbnails}</ul>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-2 offset-2">
                  <button
                    type="button"
                    className="viewProfileButton roundcornerbutton somePaddingforButtons btn-lg btn btn-primary"
                    onClick={previousPage}>
                    Back
                  </button>
                </div>
                <div className="col-2 offset-4">
                <button
                    type="button"
                    className="viewProfileButton roundcornerbutton somePaddingforButtons btn-lg btn btn-primary"
                    onClick={nextPage}>                  
                    Next
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
export default connect(
  state => ({
    inputErrors: getFormSyncErrors("wizard")(state)
  }),
  { ImagesForm }
)(
  reduxForm({
    form: "wizard",
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
  })(ImagesForm)
);
