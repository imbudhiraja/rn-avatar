
import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight,
  ViewPropTypes,
  View,
  StyleSheet,
  Text as NativeText } from 'react-native';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import { IconTypes } from './contants';

const customIcons = {};

export const registerCustomIconType = (id, customIcon) => {
  customIcons[id] = customIcon;
};

export const getIconType = (type) => {
  switch (type) {
    case IconTypes.AntDesign:
      return AntIcon;

    case IconTypes.Entypo:
      return EntypoIcon;

    case IconTypes.EvilIcon:
      return EvilIcon;

    case IconTypes.Feather:
      return FeatherIcon;

    case IconTypes.FontAwesome:
      return FAIcon;

    case IconTypes.FontAwesome5:
      return FontAwesome5;

    case IconTypes.Foundation:
      return FoundationIcon;

    case IconTypes.Ionicon:
      return Ionicon;

    case IconTypes.Material:
      return MaterialIcon;

    case IconTypes.MaterialCommunity:
      return MaterialCommunityIcon;

    case IconTypes.Octicon:
      return OcticonIcon;

    case IconTypes.SimpleLineIcon:
      return SimpleLineIcon;

    case IconTypes.Zocial:
      return ZocialIcon;

    default:
      if (Object.prototype.hasOwnProperty.call(customIcons, type)) {
        return customIcons[type];
      }

      return MaterialIcon;
  }
};

const Icon = (props) => {
  const {
    type,
    name,
    size,
    color,
    iconStyle,
    underlayColor,
    reverse,
    raised,
    containerStyle,
    reverseColor,
    disabled,
    disabledStyle,
    onPress,
    Component = onPress ? TouchableHighlight : View,
    ...attributes
  } = props;

  const IconComponent = getIconType(type);
  const getBackgroundColor = () => {
    if (reverse) {
      return color;
    }

    return raised ? 'white' : 'transparent';
  };

  return (
    <View style={containerStyle && containerStyle}>
      <Component
        {...attributes}
        underlayColor={reverse ? color : underlayColor || color}
        style={StyleSheet.flatten([
          (reverse || raised) && styles.button,
          (reverse || raised) && {
            borderRadius: size + 4,
            height: size * 2 + 4,
            width: size * 2 + 4,
          },
          raised && styles.raised,
          {
            alignItems: 'center',
            backgroundColor: getBackgroundColor(),
            justifyContent: 'center',
          },
          disabled && styles.disabled,
          disabled && disabledStyle,
        ])}
        {...onPress && { disabled }}
        onPress={onPress}
      >
        <IconComponent
          testID="iconIcon"
          style={StyleSheet.flatten([
            { backgroundColor: 'transparent' },
            iconStyle && iconStyle,
          ])}
          size={size}
          name={name}
          color={reverse ? reverseColor : color}
        />
      </Component>
    </View>
  );
};

Icon.propTypes = {
  Component: PropTypes.func.isRequired,
  color: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  disabled: PropTypes.bool,
  disabledStyle: ViewPropTypes.style,
  iconStyle: NativeText.propTypes.style,
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  raised: PropTypes.bool,
  reverse: PropTypes.bool,
  reverseColor: PropTypes.string,
  size: PropTypes.number,
  type: PropTypes.string,
  underlayColor: PropTypes.string,
};

Icon.defaultProps = {
  color: 'black',
  containerStyle: {},
  disabled: false,
  disabledStyle: {},
  iconStyle: {},
  onPress: null,
  raised: false,
  reverse: false,
  reverseColor: 'white',
  size: 24,
  type: 'material',
  underlayColor: 'white',
};

export default Icon;
