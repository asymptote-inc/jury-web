import React from 'react';
import { Image, Header, Container } from 'semantic-ui-react';

import add1Image from './add_1.png';
import add2Image from './add_2.png';
import removeImage from './remove.png';

export default function InstallationPage() {
  return (
    <div>
      <Container text>
        <Header size="huge">Installation</Header>
        <p>
          Since the client is a website, installation is not required. However
          the user may chose to install the app locally on the device. In mobile
          browsers (especially in <b>Android</b> browsers like Google Chrome and
          Samsung Browser), the user will be prompted to install the app.
        </p>
        <Image size="medium" src={add1Image} alt="Automatically add" />
        <p>
          Otherwise, the user can click the corresponding button/menu item in
          the browser to manually install the app. Installing the app will add
          shortcuts on both the home screen and the app drawer
          (browser-dependant).
        </p>
        <Image size="medium" src={add2Image} alt="Manually add" />
        <p>
          Even in non mobile browsers, the app can be added as a standalone app.
        </p>
        <hr />
        <Header size="huge">Removal</Header>
        <p>
          The app can be removed in the same way any other Android app is
          removed.
        </p>
        <Image size="medium" src={removeImage} alt="Remove" />
      </Container>
    </div>
  );
}
