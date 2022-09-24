import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export function navigate(screenName:any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screenName);
  }
}