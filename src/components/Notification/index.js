import React, { useEffect, useState } from 'react';
import { Icon, List, Button, Card, Modal } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import api from '../../services/api';
import { Card as CustomCard } from '../Layout';
import { CustomTableAct } from '../../components/Tables';
import {
  ListItem,
  DeleteButton,
  ItemHeader,
  NotificationContainer,
  NotificationContentHeader,
  NotificationText
} from './styles';

export default ({ handleSideBar, history }) => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showMessageModal, setMessageModal] = useState(false);
  const [showMessageModalNotification, setMessageModalNotification] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState({});

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/notifications');

        const formatedData = data.map(notification => {
          notification.createdAt = formatDistance(new Date(parseISO(notification.createdAt)), new Date(), {
            addSuffix: true,
            locale: pt
          });
          return notification;
        });
        setNotifications(formatedData);
      } catch (err) {
        console.log(err);
        const { error } = err.response.data;
        toast.error(error);
      }
      setLoading(false);
    };
    fetchNotifications();
  }, []);

  const closeModal = () => {
    setMessageModal(false);
    setMessageModalNotification(false);
    handleSideBar(true);
  };

  const handleCheckActNotification = async (notification, index, act) => {
    if (!notification.lida) {
      const { data } = await api.put(`/notifications/${notification._id}`, { ...notification, lida: true });
      const auxNotifications = notifications;
      auxNotifications[index] = {
        ...data,
        createdAt: formatDistance(parseISO(data.createdAt), new Date(), { addSuffix: true, locale: pt })
      };
      setNotifications([]);
      setNotifications(auxNotifications);
    }
    setSelectedNotification(notification);

    if (act === undefined) {
      setMessageModalNotification(true);
    } else {
      setMessageModal(true);
    }
    handleSideBar(false);
  };

  const handleDeleteNotification = async notification => {
    await api.delete(`/notifications/${notification._id}`);
    const newList = notifications.filter(notif => notif._id !== notification._id);
    setNotifications(newList);
  };

  const buildNotification = approved => {
    return (
      <List celled>
        {notifications.map((notification, index) =>
          notification.dadosEntidade && notification.dadosEntidade.isApproved !== approved ? null : (
            <ListItem key={notification._id} isseen={notification.lida}>
              <List.Content>
                <DeleteButton
                  floated="right"
                  icon={<Icon name="trash" color="black" />}
                  onClick={() => handleDeleteNotification(notification)}
                />
                <ItemHeader onClick={() => handleCheckActNotification(notification, index, approved)}>
                  {notification.titulo}
                </ItemHeader>
                <List.Description>Recebido {notification.createdAt}</List.Description>
              </List.Content>
            </ListItem>
          )
        )}
      </List>
    );
  };

  return (
    <>
      <Modal open={showMessageModal}>
        <Modal.Header>{selectedNotification.titulo}</Modal.Header>
        <Modal.Content>
          {
            <>
              {!selectedNotification.dadosEntidade && (
                <NotificationContainer>
                  <NotificationContentHeader>Resultado da avaliação</NotificationContentHeader>
                  <NotificationText>{selectedNotification.conteudo}</NotificationText>
                </NotificationContainer>
              )}
              <CustomTableAct data={selectedNotification.dadosEntidade} />
            </>
          }
        </Modal.Content>
        <Modal.Actions>
          <>
            <Button color="red" size="large" onClick={closeModal} loading={loading} floated="left">
              Voltar
            </Button>
            <Button
              color="green"
              size="large"
              onClick={() => history.push(`/novo-ato/${selectedNotification.dadosEntidade?._id}`)}
              loading={loading}
            >
              Editar Ato
            </Button>
          </>
        </Modal.Actions>
      </Modal>

      <Modal open={showMessageModalNotification} size="tiny">
        <Modal.Header>{selectedNotification.titulo}</Modal.Header>
        <Modal.Content>
          {
            <>
              <NotificationContainer>
                <NotificationContentHeader>Formulário</NotificationContentHeader>
                <NotificationText>
                  Dados do formulario
                  <br />
                  Nome: {selectedNotification.dadosEntidade?.titulo} <br />
                  Ano de Aplicação: {selectedNotification.dadosEntidade?.anoAplicacao}
                </NotificationText>
              </NotificationContainer>
            </>
          }
        </Modal.Content>
        <Modal.Actions>
          <>
            <Button color="red" size="large" onClick={closeModal} loading={loading} floated="left">
              Voltar
            </Button>
            <Button
              color="green"
              size="large"
              onClick={() => history.push(`/responder-avaliacao/${selectedNotification.dadosEntidade?._id}`)}
              loading={loading}
            >
              Responder Formulário
            </Button>
          </>
        </Modal.Actions>
      </Modal>

      <Card.Group>
        <CustomCard
          content={() => buildNotification(true)}
          title={() => (
            <>
              <Icon name="checkmark" color="green" />
              <span>Atos Aprovados</span>
            </>
          )}
        />
        <CustomCard
          content={() => buildNotification(false)}
          title={() => (
            <>
              <Icon name="close" color="red" />
              <span>Atos Reprovados</span>
            </>
          )}
        />
        <CustomCard
          content={() => buildNotification()}
          title={() => (
            <>
              <Icon name="circle" color="red" />
              <span>Notificações</span>
            </>
          )}
        />
      </Card.Group>
    </>
  );
};
