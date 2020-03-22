import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class Lifeway extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderWeb: ""
    };
  }
  render() {
    return (
      <div className="App">
        <h2>The Green Way</h2>
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onInit={editor => {
            // You can store the "editor" and use when it is needed.
            console.log("Write your code !!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            this.setState({
              renderWeb: data
            });
            // console.log({ event, editor, data });
          }}
          // onBlur={(event, editor) => {
          //   console.log("Blur.", editor);
          // }}
          // onFocus={(event, editor) => {
          //   console.log("Focus.", editor);
          // }}
        />

        <div dangerouslySetInnerHTML={{ __html: this.state.renderWeb }} />
      </div>
    );
  }
}

export default Lifeway;
