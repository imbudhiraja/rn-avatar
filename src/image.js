import React from 'react';
import PropTypes from 'prop-types';
import { Animated,
  Image as RNImage,
  Platform,
  StyleSheet,
  View,
  ViewPropTypes } from 'react-native';
import styles from './styles';

class Image extends React.PureComponent {
  placeholderContainerOpacity = new Animated.Value(1);

  onLoadEnd = () => {
    /* Images finish loading in the same frame for some reason,
        the images will fade in separately with staggerNonce */
    const minimumWait = 100;
    const staggerNonce = 200 * Math.random();

    setTimeout(
      () => Animated.timing(this.placeholderContainerOpacity, {
        duration: 350,
        toValue: 0,
        useNativeDriver: true,
      }).start(),
      minimumWait + staggerNonce
    );
  };

  render() {
    const {
      placeholderStyle,
      PlaceholderContent,
      containerStyle,
      style,
      ImageComponent,
      ...attributes
    } = this.props;

    return (
      <View style={StyleSheet.flatten([styles.placeholderContainer, containerStyle])}>
        {Platform.select({
          android: (
            <React.Fragment>
              <View style={styles.placeholderWrapper}>
                <Animated.View
                  style={StyleSheet.flatten([
                    style,
                    styles.placeholder,
                    {
                      backgroundColor: this.placeholderContainerOpacity.interpolate(
                        {
                          inputRange: [0, 1],
                          outputRange: [
                            styles.placeholder.backgroundColor,
                            'transparent',
                          ],
                        }
                      ),
                    },
                    placeholderStyle,
                  ])}
                >
                  {PlaceholderContent}
                </Animated.View>
              </View>

              <ImageComponent {...attributes} style={style} />
            </React.Fragment>
          ),
          default: (
            <React.Fragment>
              <ImageComponent
                {...attributes}
                onLoadEnd={this.onLoadEnd}
                style={style}
              />

              <Animated.View
                style={StyleSheet.flatten([
                  styles.placeholderWrapper,
                  { opacity: this.placeholderContainerOpacity },
                ])}
              >
                <View
                  style={StyleSheet.flatten([
                    style,
                    styles.placeholder,
                    placeholderStyle,
                  ])}
                >
                  {PlaceholderContent}
                </View>
              </Animated.View>
            </React.Fragment>
          ),
        })}
      </View>
    );
  }
}

Image.propTypes = {
  ...RNImage.propTypes,
  ImageComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  PlaceholderContent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object,
    PropTypes.bool,
    PropTypes.func,
  ]).isRequired,
  containerStyle: ViewPropTypes.style.isRequired,
  placeholderStyle: RNImage.propTypes.style,
};

Image.defaultProps = {
  ImageComponent: RNImage,
  placeholderStyle: {},
};

export { Image };
export default Image;
