import React, { Component } from "react";
import "react-dates/initialize";
import Profile from "../../Modules/Headers/ProfileHeader";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Dropzone from "react-dropzone";
import { read } from "fs";




class ImagesForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
        maxSize : 3145728,//3Mb
        images:[]

    };
  }

  handleOnDrop= (files, rejectedfiles) =>{
   if(files.length>5){
       alert("Exceeded Photo Limit, Choosing only 1st 5 Images");
        for(let i=0;i<5;i++){
            const reader = new FileReader();
            reader.addEventListener("load", () =>{

            },false)

            reader.readAsDataURL(files[i])
        }
   }
}

  render() {

    let thumbnails = this.state.images.map(book => {
        return(
            <tr>
                <td>{book.BookID}</td>
                <td>{book.Title}</td>
                <td>{book.Author}</td>
            </tr>
        )
    })

    return (
      <div className="col-9">
        <div class="card  sharpEdges shadow-lg">
          <div class="card-body ">
            <h5 class="card-title">Upload Photos</h5>
            <hr />
            <p class="card-text text-center ">
              <div className="dottedbox">
                <br />
                <br />
                <br />

                <div className="container">
                  <Dropzone
                    className="dropzone"
                    multiple={true}
                    accept="image/jpeg, image/png"
                    maxSize={this.maxSize}
                    onDrop={this.handleOnDrop}
                  >
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div>
                      Try dropping some files here, or click to select files to
                      upload.
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </Dropzone>
                </div>

                <br />
                <br />

                <ul className="imagelist">
                  <li>
                    <img
                      src="https://via.placeholder.com/100x100"
                      alt="..."
                      class="img-thumbnail"
                    />
                  </li>
                </ul>
                <br />
                <br />
                <br />
              </div>
              <br />
              <div className="row">
                <div className="col-2 offset-2">
                  <button
                    type="button"
                    class="viewProfileButton roundcornerbutton somePaddingforButtons btn-lg btn btn-primary"
                  >
                    Back
                  </button>
                </div>
                <div className="col-2 offset-4">
                  <button
                    type="button"
                    class="viewProfileButton roundcornerbutton somePaddingforButtons btn-lg btn btn-primary"
                  >
                    Next
                  </button>
                </div>
              </div>
            </p>
          </div>
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

export default ImagesForm;
