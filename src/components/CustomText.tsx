import React from 'react';
import {Text} from 'react-native';

interface Props {
  content: string;
  styles?: any;
}

const CustomText = ({content, styles}: Props) => {
  const addStyles = styles ? styles : {};
  return (
    <Text style={{...addStyles, fontFamily: 'AirbnbCerealLight'}}>
      {content}
    </Text>
  );
};

export default CustomText;
