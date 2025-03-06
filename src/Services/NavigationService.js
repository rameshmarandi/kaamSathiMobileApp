import {CommonActions} from '@react-navigation/native';

let navigator;

function setNavigator(ref) {
  navigator = ref;
}

function navigate(routeName, params) {
  navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: params,
    }),
  );
}

function navigateBack() {
  navigator.dispatch(CommonActions.goBack());
}

function resetNavigation(routeName, params) {
  navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: routeName, params: params}],
    }),
  );
}

function replaceScreen(routeName, params) {
  navigator.dispatch(
    CommonActions.replace({
      name: routeName,
      params: params,
    }),
  );
}

function pushScreen(routeName, params = {}) {
  console.log('navigator0', navigator);
  console.log('Navigator', routeName);
  if (navigator) {
    navigator.dispatch(
      CommonActions.push({
        name: routeName,
        params: params,
      }),
    );
  } else {
    console.error('Navigator is not set properly.'); // Log an error if navigator is not set
  }
}

export {
  navigate,
  navigateBack,
  resetNavigation,
  replaceScreen,
  pushScreen,
  setNavigator,
};
