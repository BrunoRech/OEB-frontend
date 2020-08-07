import React from 'react';

import { Button } from 'semantic-ui-react';

import cee from '../../../assets/images/logos/cee.png';
import empds from '../../../assets/images/logos/empds.png';
import udesc from '../../../assets/images/logos/udesc.png';

import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={cee} alt="CEE" />
          <img src={empds} alt="CEE" />
          <img src={udesc} alt="CEE" />
          <strong>Observatório de educação básica - OEB</strong>
        </nav>

        <aside>
          <Profile>
            <div>
              <Button>Relatar erro</Button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
