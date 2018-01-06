import React, { Component } from 'react';

export default class Terms extends Component {
  render() {
    return (
      <div className="standardPage">
        <h1 className="primaryHeader">Terms of Service</h1>
        <p className="appParagraph">
          By using our services ("Services"), you are agreeing to these terms.
        </p>
        <h2 className="secondaryHeader">Use of Our Services</h2>
        <p className="appParagraph">
          You must be 13 years or older to use our Services.
        </p>
        <p className="appParagraph">
          Using our Services is at your sole risk. Do not misuse the Service.
          Modifications made to the Service's source code, which is freely
          available, must not be affiliated with the Service.
        </p>
        <p className="appParagraph">
          We may suspend or prevent you from accessing or using the Services at
          any time.
        </p>
        <h2 className="secondaryHeader">Changing or Terminating Our Service</h2>
        <p className="appParagraph">
          Hearth is a constantly changing Service. We may add and remove
          functionality, or suspend and stop the Service altogether.
        </p>
        <h2 className="secondaryHeader">Your Data in the Services</h2>
        <p className="appParagraph">
          Hearth allows you to create and manage data that can be stored within
          Hearth. Hearth claims no ownership of data that you create.
        </p>
        <p className="appParagraph">
          We hold the right to remove any data that is stored within this
          Service.
        </p>
        <h2 className="secondaryHeader">Liability for our Services</h2>
        <p className="appParagraph">
          When permitted by law, Hearth shall not be responsible for direct,
          indirect, incidental, special, consequential or exemplary damages
          resulting from your use of the Service. This covers, but is not
          limited to, any data or information stored in Hearth.
        </p>
        <h2 className="secondaryHeader">Business Use of Our Services</h2>
        <p className="appParagraph">
          If you are using these Services on behalf of a business, that business
          also accepts these terms. It shall defend Hearth from any third-party
          that alleges that your content or use of this Service in violation of
          this agreement infringes or misappropriates the intellectual property
          rights of a third-party or violates applicable law.
        </p>
        <h2 className="secondaryHeader">About these Terms</h2>
        <p className="appParagraph">
          We may modify these terms at any time, or add additional terms that
          apply to the Service. We encourage you to read the terms regularly. We
          will post notifications of changes to the terms on this page.
        </p>
      </div>
    );
  }
}
