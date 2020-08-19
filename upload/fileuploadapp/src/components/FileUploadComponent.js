import React from 'react'
import axios from 'axios';

class FileUploadComponent extends React.Component{

    constructor(){
        super();
        this.state = {
            selectedFile:'',
            submission_id:0
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }


    handleInputChange(event) {
      this.setState({
        submission_id: event.target.value,
        })
  }

    handleFileChange(event) {
        this.setState({
            selectedFile: event.target.files[0],
          })
    }

    submit(){
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
        data.append('submission_id', this.state.submission_id)
        console.warn(this.state.selectedFile);
        let url = "http://localhost:8080/cvportal/backend/api/submissions/FileUpload";
              

        axios.post(url, data, { // receive two parameter endpoint url ,form data 
        })
        .then(res => { // then print response status
            console.warn(res);
        })

    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <br /><br />

                            <h3 className="text-white">React File Upload </h3>
                            <br />

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label className="text-white">ID :</label>
                                    <input type="text" className="form-control" name="submission_id" onChange={this.handleInputChange} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label className="text-white">Select File :</label>
                                    <input type="file" className="form-control" name="upload_file" onChange={this.handleFileChange} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-md-6">
                                    <button type="submit" className="btn btn-dark" onClick={()=>this.submit()}>Save</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        )  
    }
}

export default FileUploadComponent;
