import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { TreeItem, TreeView } from '@material-ui/lab';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useTreeItemStyles, ItemContainer } from './styles';
import api from '../../../../services/api';

export default ({ form }) => {
  const classes = useTreeItemStyles();
  const [formData, setFormData] = useState({
    _id: '1',
    titulo: '',
    anoAplicacao: '',
    createdAt: '',
    dimensoes: []
  });

  useEffect(() => {
    const fetchForm = async () => {
      const { data } = await api.get(`/forms/${form._id}`);
      setFormData(data);
    };

    fetchForm();
  }, [form._id]);

  const StyledTreeItem = ({ labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other }) => {
    return (
      <TreeItem
        label={() => (
          <div className={classes.labelRoot}>
            <LabelIcon color="inherit" className={classes.labelIcon} />
            <Typography variant="body2" className={classes.labelText}>
              {labelText}
            </Typography>
          </div>
        )}
        style={{
          '--tree-view-color': color,
          '--tree-view-bg-color': bgColor
        }}
        classes={{
          root: classes.root,
          content: classes.content,
          expanded: classes.expanded,
          selected: classes.selected,
          group: classes.group,
          label: classes.label
        }}
        {...other}
      />
    );
  };

  const renderDimensions = (dimension, d_index) => {
    return (
      formData && (
        <div key={'DimensionContainer' + d_index}>
          <StyledTreeItem key={dimension._id} nodeId={dimension._id} label={`Dimensão ${d_index+1} - ${dimension.titulo}`}>
            <StyledTreeItem key={d_index + dimension._id} nodeId={d_index + dimension._id} label="Descrição">
              <StyledTreeItem
                key={dimension.descricao + dimension._id}
                nodeId={dimension.descricao + dimension._id}
                label={dimension.descricao}
              />
            </StyledTreeItem>
            <StyledTreeItem key={dimension._id + d_index} nodeId={dimension._id + d_index} label="Indicadores">
              {dimension.indicadores.map((indicadores, i_index) => renderIndicators(indicadores, i_index))}
            </StyledTreeItem>
          </StyledTreeItem>
        </div>
      )
    );
  };

  const renderIndicators = (indicator, i_index) => {
    return (
      <div key={'IndicatorContainer' + i_index}>
        <StyledTreeItem key={indicator._id} nodeId={indicator._id} label={`Indicador ${i_index+1} - ${indicator.titulo}`}>
          <StyledTreeItem key={i_index + indicator._id} nodeId={i_index + indicator._id} label="Critérios">
            {indicator.criterios &&
              indicator.criterios.map((criterion, c_index) => (
                <StyledTreeItem key={criterion._id} nodeId={criterion._id} label={`${c_index+1} - ${criterion.titulo}`} />
              ))}
          </StyledTreeItem>
          <StyledTreeItem key={indicator._id + i_index} nodeId={indicator._id + i_index} label={'Descritores'}>
            {indicator.descritores &&
              indicator.descritores.map((desc, d_index) => (
                <StyledTreeItem key={desc._id} nodeId={desc._id} label={`Descritor ${d_index+1} - ${desc.descricao}`} />
              ))}
          </StyledTreeItem>
        </StyledTreeItem>
      </div>
    );
  };

  return (
    <>
      <TreeView
        className={classes.root}
        defaultExpanded={['3']}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
      >
        <ItemContainer>
          <StyledTreeItem key={formData._id} nodeId={formData._id} label={formData.titulo}>
            <StyledTreeItem
              key={'ano' + formData._id}
              nodeId={'ano' + formData._id}
              label={'Ano: ' + formData.anoAplicacao}
            />
            <StyledTreeItem key={'dimensao' + formData._id} nodeId={'dimensao' + formData._id} label="Dimensões">
              {formData.dimensoes.map((dimensions, d_index) => renderDimensions(dimensions, d_index))}
            </StyledTreeItem>
          </StyledTreeItem>
        </ItemContainer>
      </TreeView>
    </>
  );
};
