import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import logoUdesc from '../../../assets/images/logos/udesc.png';
import logoEscritorio from '../../../assets/images/logos/empds.png';
import logoCee from '../../../assets/images/logos/cee.png';
import Footer from './styles';

export default ({ transparent }) => {
  return (
    <Footer transparent={transparent}>
      <Grid centered padded="vertically" className="grid-content">
        <Grid.Column width="5">
          <a href="https://www.udesc.br/">
            <Image src={logoUdesc} centered />
          </a>
        </Grid.Column>
        <Grid.Column width="5">
          <a href="https://www.udesc.br/ceavi/engenhariadesoftware">
            <Image src={logoEscritorio} centered />
          </a>
        </Grid.Column>
        <Grid.Column width="5">
          <a href="http://www.cee.sc.gov.br/">
            <Image src={logoCee} centered />
          </a>
        </Grid.Column>
      </Grid>
    </Footer>
  );
};
