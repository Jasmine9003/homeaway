import React, { Component } from "react";
import "react-dates/initialize";
import Dropzone from "react-dropzone";
import {v4} from "node-uuid"



class ImagesForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
        maxSize : 3145728,
        images:this.props.images,
        imagefiles:this.props.imagefiles

    };
  }

  handleOnDrop= (files, rejectedfiles) =>{
      if(this.state.images.length>5){
        alert("Already Reached Photo Limit");
      }else{
        let  n =files.length;
        if(n>5){
            n=5;
        }
        if(files.length+this.state.images.length>5){
            n=5-this.state.images.length;
            alert("Exceeding Limit, Only Choosing The First "+ n+" Photos" )
        }
        for(let i=0;i<n;i++){
          let newfile=files[i];
            const reader = new FileReader();
            reader.addEventListener("load", () =>{
                this.setState({
                    images: this.state.images.concat({imgSrc: reader.result, imgCount:i+1}),
                    imagefiles:this.state.imagefiles.concat(newfile)           
                })
                this.props.OnImagesAdded({imgSrc: reader.result, imgCount:i+1});
                this.props.OnImageFilesChanged(newfile);
            },false)
            reader.readAsDataURL(files[i])
        }
    }
}

  render() {

    let thumbnails = this.state.images.map(image => {
        return(
            <li>
            <img
              data-toggle="modal" data-target={"#imagemodal"+image.imgCount}
              src={image.imgSrc}
              alt=""
              className ="img-thumbnail resize"
            />
          </li>
        )
    });


    let modals = this.state.images.map(image => {
        return(
             <div className="modal fade bd-example-modal-lg" id={"imagemodal"+image.imgCount} tabIndex="-1" role="dialog" >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <img
              data-toggle="modal" data-target={"#imagemodal"+image.imgCount}
              src={image.imgSrc}
              alt=""
              className ="img resizeModal"
            /> 
                </div>
            </div>
            </div>    
        )
    });

    return (
      <div className="col-9">
        <div className="card  sharpEdges shadow-lg">
          <div className="card-body ">
            <h5 className="card-title">Upload Photos</h5>
            <hr />
            <div className="card-text text-center ">
              <div className="dottedbox">
                <br />
                <br />
                <br />
                <div className="container">
                  <Dropzone
                    className="dropzone"
                    multiple={true}
                    accept="image/jpeg, image/png"
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
                {thumbnails}
                </ul>
                <br />
                <br />    
                <br />
                <br />
                <br />
              </div>
              <br />
              <div className="row">
                <div className="col-2 offset-2">
                  <button
                    type="button"
                    className="viewProfileButton roundcornerbutton somePaddingforButtons btn-lg btn btn-primary"
                              onClick={this.props.OnBackPressed}
                  >
                    Back
                  </button>
                </div>
                <div className="col-2 offset-4">
                  <button
                    type="button"
                    className="viewProfileButton roundcornerbutton somePaddingforButtons btn-lg btn btn-primary"
                    onClick={this.props.OnNextPressed}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        {modals}
      </div>
    );
  }
}

export default ImagesForm;
