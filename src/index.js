import React from 'react';
import PropTypes from 'prop-types';
import { View,
  ViewPropTypes,
  Text,
  Image as RNImage,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback } from 'react-native';
import { renderNode, getInitials } from './utility';
import Icon from './icon';
import Image from './image';
import styles from './styles';
import { AvatarSizes, IconTypes, Sizes } from './contants';

const defaultEditButton = {
  color: '#fff',
  name: 'edit',
  type: IconTypes.Entypo,
  underlayColor: '#000',
};

const Avatar = ({
  onPress,
  onLongPress,
  Component = onPress || onLongPress ? TouchableOpacity : View,
  containerStyle,
  icon,
  iconStyle,
  source,
  size,
  avatarStyle,
  rounded,
  title,
  titleStyle,
  overlayContainerStyle,
  showEditButton,
  editButton: passedEditButton,
  onEditPress,
  imageProps,
  placeholderStyle,
  renderPlaceholderContent,
  ImageComponent,
  ...attributes
}) => {
  const width = typeof size === 'number' ? size : AvatarSizes[size] || AvatarSizes.small;
  const height = width;
  const titleSize = width / 2;
  const iconSize = width / 2;

  const editButton = {
    ...defaultEditButton,
    ...passedEditButton,
  };
  const editButtonSize = editButton.size || (width + height) / 2 / 3;
  const user = getInitials(title);

  const Utils = showEditButton && (
    <TouchableHighlight
      style={StyleSheet.flatten([
        styles.editButton,
        {
          borderRadius: editButtonSize / 2,
          height: editButtonSize,
          width: editButtonSize,
        },
        editButton.style,
      ])}
      underlayColor={editButton.underlayColor}
      onPress={onEditPress}
    >
      <View>
        <Icon size={editButtonSize * 0.8} {...editButton} />
      </View>
    </TouchableHighlight>
  );

  const PlaceholderContent = (renderPlaceholderContent
      && renderNode(undefined, renderPlaceholderContent))
    || (title && (
      <Text
        style={StyleSheet.flatten([
          styles.title,
          { fontSize: titleSize },
          titleStyle,
        ])}
      >
        {user.initials}
      </Text>
    ))
    || (icon && (
      <Icon
        style={iconStyle && iconStyle}
        color={icon.color || 'white'}
        name={icon.name || 'user'}
        size={icon.size || iconSize}
        type={icon.type && icon.type}
      />
    ));

  // Remove placeholder styling if we're not using image
  const hidePlaceholder = !source;

  return (
    <Component
      onPress={onPress}
      onLongPress={onLongPress}
      style={StyleSheet.flatten([
        styles.container,
        {
          height, width,
        },
        rounded && { borderRadius: width / 2 },
        containerStyle,
      ])}
      {...attributes}
    >
      <Image
        placeholderStyle={StyleSheet.flatten([
          placeholderStyle, { backgroundColor: user.bgColor },
          hidePlaceholder && { backgroundColor: 'transparent' },
        ])}
        PlaceholderContent={PlaceholderContent}
        containerStyle={StyleSheet.flatten([
          styles.overlayContainer,
          overlayContainerStyle,
          rounded && {
            borderRadius: width / 2, overflow: 'hidden',
          },
        ])}
        source={source}
        {...imageProps}
        style={StyleSheet.flatten([
          styles.avatar,
          imageProps && imageProps.style,
          avatarStyle,
        ])}
        ImageComponent={ImageComponent}
      />
      {Utils}
    </Component>
  );
};

Avatar.propTypes = {
  Component: PropTypes.oneOf([
    View,
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
  ]).isRequired,
  ImageComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  activeOpacity: PropTypes.number,
  avatarStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  editButton: PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number,
    style: ViewPropTypes.style,
    type: PropTypes.string,
    underlayColor: PropTypes.string,
  }),
  icon: PropTypes.object,
  iconStyle: Text.propTypes.style,
  imageProps: PropTypes.object.isRequired,
  onEditPress: PropTypes.func,
  onLongPress: PropTypes.func,
  onPress: PropTypes.func,
  overlayContainerStyle: ViewPropTypes.style,
  placeholderStyle: ViewPropTypes.style,
  renderPlaceholderContent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object,
    PropTypes.bool,
    PropTypes.func,
  ]).isRequired,
  rounded: PropTypes.bool,
  showEditButton: PropTypes.bool,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
    PropTypes.number,
  ]),
  source: RNImage.propTypes.source.isRequired,
  title: PropTypes.string.isRequired,
  titleStyle: Text.propTypes.style,
};

Avatar.defaultProps = {
  ImageComponent: RNImage,
  activeOpacity: 1,
  avatarStyle: {},
  containerStyle: {},
  editButton: defaultEditButton,
  icon: null,
  iconStyle: {},
  onEditPress: null,
  onLongPress: null,
  onPress: null,
  overlayContainerStyle: {},
  placeholderStyle: {},
  rounded: false,
  showEditButton: false,
  size: 'small',
  titleStyle: {},
};

export { IconTypes, Sizes };

export default Avatar;
