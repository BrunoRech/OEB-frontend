# Observatório de Educação Básica

O FrontEnd do Observatório de Educação Básica.

## Dependências

- [Node.js](https://nodejs.org/en/) 8.0.0 ou >
- [Yarn](https://yarnpkg.com/pt-BR/docs/install)

## Instalação e execução

1. Faça um clone do repositório;
2. Navegue até a pasta do projeto;
3. Rode ``yarn`` para instalar as dependências;
4. Execute `yarn start` para abrir rodar o aplicativo em modo de desenvolvimento.

## Comandos

Dentro do diretório do projeto você pode executar os seguintes comandos:

- `npm start` - Roda a aplicação em modo de desenvolvedor.
- `npm run build` - Faz um *build* da aplicação para modo de produção.
- `npm test` - Roda os testes da aplicação.
- `npm run lint` - Procura por erros no código (Formatação, importações...).
- `npm run lint:fix` - Corrige os erros encontrados no projeto.
- `npm run format` - Formata o código para o padrão.

## Observações

- Lembre-se que temos um *pre-push* hook que analisa o código e evita erros na *master*;
- Baixe e instale a extensão do [EditorConfig for VSCode](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig);

## Padrões

- Utilizamos duas bibliotecas principais no front-end
- Uma forma de estilização diferente do css comum com mais organização e flexibilidade. [Styled-Components](https://styled-components.com/docs/basics)
- Uma biblioteca com layouts de componentes que utilizamos em todas as páginas. [Semantic-ui-React](https://react.semantic-ui.com/)

### Funções 
- Todas as funções são declaradas como arrow functions 
```Javascript
    const function = ()=> {
    <código>
    };
```

### Estilização 

- Todas as estilizações são feitas com um arquivo styles.js dentro da pasta do componente com uma biblioteca chamada styled-components
- Exemplo para componentes html:
 ```Javascript
 import styled from 'styled-components';
 
 export const StyledDiv = styled.div`
    margin-top: 10px;
    padding: 30px;
    ...
 `;
 
```

- Para componentes de outras bibliotecas ou já estilizados que não são html.
- Exemplo :
 ```Javascript
 import styled from 'styled-components';
 import Componente from 'biblioteca-externa';
 
 export const StyledComponent = styled(Componente)`
    margin-top: 10px;
    padding: 30px;
    ...
 `;
 
```

- Exemplos mais complexos e explicações mais detalhadas podem ser encontradas no link da biblioteca no início do readme:

### Formulários
- Para a construção de formulários temos um hook se provém as funções que precisamos sem duplicar código em src/hooks/useForm.js
- - Isso pode ser visto na página scr/pages/Institution/NewAct/index.js
- Exemplo de utilização em formulário:

 ```
import { Form } from 'semantic-ui-react';
import useForm from '../../../hooks/useForm';

const [
    {
      data, // os dados do formulário
      loading, 
      handleChange, // função para o onChange dos formulários
      handleSubmit, // função que executa o callback 
      setData,
      handleSelectChange, // função para os selects dos formulários
      handleFileChange, // função para inputs do tipo arquivo
      handleDateChange, // função para inputs do tipo data
      setLoading
    }
  ] = useForm(
  callbackSubmit, // função que é executada quando o handleSubmit for acionado
  {               // Dados do formulário quando a página é carregada
    texto: ''
  });
  
  
  return (
    <Form loading={loading} onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
            name="texto"  // esse nome será o nome do atributo no objeto data do formulário
            value={data.texto} // o que está escrito dentro do input
            label="Digite o texto aqui:" //label que aparece em cima do formulário
            onChange={handleChange} //função que pega o que foi escrito no formulário e atribue ao objeto data
        />
        <Form.Button type="submit" disabled={loading}>Enviar</Form.Button>
    </Form>
  );
 ```

- Exemplo passando um terceiro parâmetro (Opcional) no useForm, que irá executar uma requisição HTTP quando a página for carregada com aquele endereço e armazenar as informações no data
- Isso pode ser visto na página scr/pages/Institution/MyAccount/index.js

 ```Javascript
 import useForm from '../../../hooks/useForm';
 
 const [{ data, loading, handleChange, handleSubmit }] = useForm(callback, {
     atributo1: '',
     atributo2: '',
 }, `/institutions/${institutionId}`);
 
 return (...);
 
```

### Criação de novas Páginas e Componentes
- As páginas são divididas em 3 partes
 1. Public: As que não precisam de autenticação para ter acesso.
 2. Admin: As que precisam de autenticação como administrador para acessar.
 3. Institution: As que precisam de autenticação como instituição para ter acesso.
    

#### Observações
    
- Nenhuma página pode ter dependências com páginas de outro grupo.
- Exemplo: Dentro de uma página da instituição possuir um import de alguma página do public.
- Caso exista necessidade de utilizar várias funcionalidades de uma página em várias de diferentes grupos, cria-se um componente próprio dentro de src/components que poderá ser utilizado sem problemas por todas as páginas e sem repetição de código.
    

### Imports e Exports

- Componentes e páginas só exportam a sí próprios, para isso usamos o export default:

```
    export default ({atributos}) =>{ 
        const texto = 'oi';
        
        return (
            <div>
            {texto}
            </div>
        );    
    };
```

- Caso haja muitos componentes/páginas dentro de um arquivo, é criado um index.js que cuidará somente de exportar tudo de forma desestruturada para que outras partes do frontend possam importá-los de forma mais dinâmica
- Exemplo, um arquivo index.js dentro da pasta pages:

```
    import Pag1 from './Pag1';
    import Pag2 from './Pag3';
    import Pag3 from './Pag3';
    
    export {Pag1, Pag2, Pag3};
```

- O import desses componentes antes da criação de index.js seria algo como:

```
    import Pag1 from '../pages/Pag1';
    import Pag2 from '../pages/Pag3';
    import Pag3 from '../pages/Pag3';
```

- Ficaria assim: 

```
import { Pag1, Pag2, Pag3 } from '../pages';
```

- Esse exemplo pode ser visto no projeto pelo index.js dentro de src/pages e importado dentro de src/routes.js e DEVE ser utilizado sempre.
