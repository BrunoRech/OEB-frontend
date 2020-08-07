import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 15px;
`;

export const useTreeItemStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.secondary
  },
  content: {
    backgroundColor: 'transparent',
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular
    }
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1.5px dashed #ccc`,
    '& $content': {
      paddingLeft: theme.spacing(2)
    }
  },
  expanded: {},
  selected: {},
  label: {
    backgroundColor: 'transparent',
    fontWeight: 'inherit',
    color: 'inherit',
    fontSize: 20,
    lineHeight: '41px'
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0)
  },
  labelIcon: {
    marginRight: theme.spacing(1)
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1
  }
}));
