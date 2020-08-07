import React, { useEffect, useState } from 'react';
import { Card, Item, Icon } from 'semantic-ui-react';
import { Dashboard } from '../../../components/Layout';
import api from '../../../services/api';
import ItemHeader from './styles';

export default () => {
  const [actInfo, setActInfo] = useState(null);

  useEffect(() => {
    const loadActData = async () => {
      const response = await api.get('/dashboard-admin');
      setActInfo(response.data);
    };
    loadActData();
  }, []);

  return (
    <Dashboard title="Dashboard" adm showSideBar>
      <Card.Group>
        <Card>
          <Card.Content>
            <Card.Header>Atos Legais</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <Item.Group divided>
              <Item>
                <Icon name="book" size="big" />
                <Item.Content verticalAlign="middle">
                  <ItemHeader>{actInfo && actInfo.allActs} cadastrados</ItemHeader>
                </Item.Content>
              </Item>
              <Item>
                <Icon name="check circle" size="big" color="green" />
                <Item.Content verticalAlign="middle">
                  <ItemHeader>{actInfo && actInfo.approvedActs} Aprovados</ItemHeader>
                </Item.Content>
              </Item>
              <Item>
                <Icon name="close" size="big" color="red" />
                <Item.Content verticalAlign="middle">
                  <ItemHeader>{actInfo && actInfo.disapprovedActs} Reprovados</ItemHeader>
                </Item.Content>
              </Item>
            </Item.Group>
          </Card.Content>
        </Card>
      </Card.Group>
    </Dashboard>
  );
};
