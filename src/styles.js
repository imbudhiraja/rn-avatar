import { Platform,
  StyleSheet } from 'react-native';
import { Colors } from './contants';

const styles = StyleSheet.create({
  avatar: {
    flex: 1,
    height: null,
    width: null,
  },
  button: { margin: 7 },
  container: { backgroundColor: Colors.TRANSPARENT },
  disabled: { backgroundColor: Colors.DISABLED_COLOR },
  editButton: {
    alignItems: 'center',
    backgroundColor: Colors.EDIT_BUTTON_COLOR,
    ...Platform.select({
      android: { elevation: 1 },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          height: 1, width: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
    }),
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
  },
  overlayContainer: {
    backgroundColor: Colors.OVERLAY_COLOR,
    flex: 1,
  },
  placeholder: {
    alignItems: 'center',
    backgroundColor: Colors.PLACEHOLDER_COLOR,
    justifyContent: 'center',
  },
  placeholderContainer: {
    backgroundColor: Colors.TRANSPARENT,
    position: 'relative',
  },
  placeholderWrapper: { ...StyleSheet.absoluteFillObject },
  raised: {
    ...Platform.select({
      android: { elevation: 2 },
      default: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: {
          height: 1, width: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
  title: {
    backgroundColor: Colors.TRANSPARENT,
    color: Colors.WHITE,
    textAlign: 'center',
  },
});

export default styles;
