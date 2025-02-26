import {createNavigationContainerRef} from '@react-navigation/native';

export const NavigationRef = createNavigationContainerRef();

export const navigate = (name, params) => {
  if (NavigationRef.isReady()) {
    NavigationRef.navigate(name, params);
  }
};
