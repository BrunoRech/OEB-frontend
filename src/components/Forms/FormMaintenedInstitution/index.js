import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { CitySelect } from './styles';
import { Telephone, CEP, CNPJ, Mobile } from '../../Masks';
import ibgeApi from '../../../services/ibgeApi';

const FormMaintened = ({ loading, handleInputChange, values, renderButtonUpdate, handleSelectChange, setLoading }) => {
  const [cities, setCities] = useState([{ key: '', text: '', value: { id: '', nome: '' } }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await ibgeApi.get('v1/localidades/estados/42/municipios');
        const options = [];
        data.forEach(city => {
          options.push({
            key: city.id,
            text: city.nome,
            value: {
              id: city.id,
              nome: city.nome
            }
          });
        });
        setCities(options);
      } catch (err) {
        const { error } = err.response.data;
        toast.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [setLoading]);

  return (
    <Form className="form-internal" loading={loading}>
      <Form.Group widths="equal">
        {!renderButtonUpdate && (
          <>
            <CNPJ
              onChange={handleInputChange}
              name="cnpjMantenedora"
              label="CNPJ Mantenedora"
              value={values.cnpjMantenedora ? values.cnpjMantenedora : ''}
            />
            <CNPJ
              onChange={handleInputChange}
              name="cnpj"
              label="CNPJ Mantida"
              value={values.cnpj ? values.cnpj : ''}
            />
          </>
        )}
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          name="razaoSocialMantenedora"
          onChange={handleInputChange}
          label="Razão Social Mantenedora"
          value={values.razaoSocialMantenedora ? values.razaoSocialMantenedora : ''}
        />
        <Form.Input
          fluid
          onChange={handleInputChange}
          name="razaoSocial"
          label="Razão Social Mantida"
          value={values.razaoSocial ? values.razaoSocial : ''}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          onChange={handleInputChange}
          name="nomeFantasia"
          label="Nome Fantasia"
          value={values.nomeFantasia ? values.nomeFantasia : ''}
        />
        <Form.Input
          fluid
          onChange={handleInputChange}
          name="email"
          label="E-mail"
          value={values.email ? values.email : ''}
        />
      </Form.Group>
      <Form.Group>
        <Form.Input
          fluid
          onChange={handleInputChange}
          name="endereco"
          label="Endereço"
          width={6}
          value={values.endereco ? values.endereco : ''}
        />
        <Form.Input
          fluid
          onChange={handleInputChange}
          name="numero"
          label="Número"
          type="number"
          width={3}
          value={values.numero ? values.numero : ''}
        />
        <CEP onChange={handleInputChange} name="cep" label="CEP" width={4} value={values.cep ? values.cep : ''} />
        <CitySelect
          onChange={handleSelectChange}
          fluid
          name="municipio"
          label="Município"
          options={cities}
          value={values.municipio ? values.municipio.nome : ''}
          text={values.municipio ? values.municipio.nome : ''}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          onChange={handleInputChange}
          name="site"
          label="Site"
          value={values.site ? values.site : ''}
        />
        <Telephone
          onChange={handleInputChange}
          name="telefoneFixo"
          label="Telefone"
          value={values.telefoneFixo ? values.telefoneFixo : ''}
        />
        <Mobile
          onChange={handleInputChange}
          name="telefoneCelular"
          label="Celular"
          value={values.telefoneCelular ? values.telefoneCelular : ''}
        />
      </Form.Group>
      <Form.Group>
        <Form.Field>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
          <label>Dependência Administrativa</label>
        </Form.Field>
        <Form.Radio
          label="Pública"
          value="Pública"
          name="dependenciaAdministrativa"
          checked={values.dependenciaAdministrativa === 'Pública'}
          onClick={(event, { value, name }) => handleSelectChange(event, { name, value })}
        />
        <Form.Radio
          label="Privada"
          value="Privada"
          name="dependenciaAdministrativa"
          checked={values.dependenciaAdministrativa === 'Privada'}
          onClick={(event, { name, value }) => handleSelectChange(event, { name, value })}
        />
      </Form.Group>
    </Form>
  );
};

export default FormMaintened;
