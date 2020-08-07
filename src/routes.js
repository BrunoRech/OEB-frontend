import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  Error404,
  Dashboard,
  FinishSignUpAdm,
  NewAct,
  LegalActs,
  MaintenedInstitution,
  MyAccount,
  MyAccountAdmin,
  SignIn,
  SignUp,
  ForgotPassword,
  PublicConsult,
  CreateEvaluations,
  AdminConsult,
  NewPole,
  Poles,
  ManageInstitution,
  DashboardAdmin,
  Evaluations,
  AnswerEvaluation
} from './pages';
import PrivateRoute from './components/PrivateRoute';

const Error404Private = () => {
  return <Error404 privateSession />;
};

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        {/** Public routes */}
        <Route exact path="/" component={SignIn} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/esqueceu-senha" component={ForgotPassword} />
        <Route exact path="/instituicoes" component={PublicConsult} />
        {/** Private routes */}
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/minha-conta" component={MyAccount} />
        <PrivateRoute exact path="/instituicao-mantida" component={MaintenedInstitution} />
        <PrivateRoute exact path="/novo-ato" component={NewAct} />
        <PrivateRoute exact path="/novo-ato/:id" component={NewAct} />
        <PrivateRoute exact path="/atos-legais" component={LegalActs} />
        <PrivateRoute exact path="/polos" component={Poles} />
        <PrivateRoute exact path="/novo-polo" component={NewPole} />
        <PrivateRoute exact path="/novo-polo/:id" component={NewPole} />
        <PrivateRoute exact path="/avaliacoes" component={Evaluations} />
        <PrivateRoute exact path="/responder-avaliacao/:id" component={AnswerEvaluation} />
        {/** Admin private routes */}
        <PrivateRoute exact path="/formularios" component={CreateEvaluations.Forms} isAdminRoute />
        <PrivateRoute
          exact
          path="/formularios/:formId/dimensoes"
          component={CreateEvaluations.Dimensions}
          isAdminRoute
        />
        <PrivateRoute
          exact
          path="/formularios/:formId/requisitos"
          component={CreateEvaluations.LegalRequirements}
          isAdminRoute
        />
        <PrivateRoute
          exact
          path="/formularios/:formId/dimensoes/:dimId/indicadores"
          component={CreateEvaluations.Indicators}
          isAdminRoute
        />
        <PrivateRoute
          exact
          path="/formularios/:formId/dimensoes/:dimId/indicadores/:indId/criterios"
          component={CreateEvaluations.Criteria}
          isAdminRoute
        />
        <PrivateRoute
          exact
          path="/formularios/:formId/dimensoes/:dimId/indicadores/:indId/descritores"
          component={CreateEvaluations.Description}
          isAdminRoute
        />

        <PrivateRoute exact path="/dashboardAdm" component={DashboardAdmin} isAdminRoute />
        <PrivateRoute exact path="/instituicoes-adm" component={AdminConsult} isAdminRoute />
        <PrivateRoute exact path="/minha-conta-adm" component={MyAccountAdmin} isAdminRoute />
        <PrivateRoute exact path="/cadastro-adm" component={FinishSignUpAdm} isAdminRoute />
        <PrivateRoute exact path="/gerenciar-inst" component={ManageInstitution} isAdminRoute />
        <PrivateRoute exact path="/cadastro-inst/:id" component={SignUp} isAdminRoute />
        <PrivateRoute exact path="/cadastro-inst" component={SignUp} isAdminRoute />
        {/** Invalid routes */}
        <Route path="*" component={Error404} />
        <PrivateRoute path="*" component={Error404Private} />
      </Switch>
    </BrowserRouter>
  );
};
