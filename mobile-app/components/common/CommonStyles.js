import { View, TextInput } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 15px;
`;

export const StyledInput = styled.TextInput`
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 15px;
  font-size: ${(props) => props.theme.fontSize.standard};
`;
