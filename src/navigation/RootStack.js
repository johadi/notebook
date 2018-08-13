// import React from 'react';
import { StackNavigator, SwitchNavigator, DrawerNavigator } from 'react-navigation';
import { DrawerContent} from './DrawerContent';
import {
  Dashboard,
  ViewNote,
  AddNote,
  EditNote,
} from "../components/notes";
import {
  Profile
} from '../components/user'
import {
  Register,
  Logout,
  RecoverPassword,
  Login,
} from '../components/auth';
import { AppEntry } from '../components/appEntry';

const AppEntryStack = StackNavigator({
  AppEntry: {
    screen: AppEntry
  },
}, {
  navigationOptions: {
    header: null
  }
});

const AuthStack = StackNavigator({
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  },
  RecoverPassword: {
    screen: RecoverPassword
  },
}, {
  navigationOptions: {
    headerTintColor: '#092035'
  }
});

const AppStack = StackNavigator({
  Dashboard: {
    screen: Dashboard
  },
  ViewNote: {
    screen: ViewNote
  },
  AddNote: {
    screen: AddNote
  },
  EditNote: {
    screen: EditNote
  }
},
  {
    navigationOptions: {
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#092035'
      },
      headerBackTitle: null
    }
  });

const ProfileStack = StackNavigator({
  User: {
    screen: Profile
  }
},
  {
    navigationOptions: {
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#092035'
      }
    }
  });

const AppDrawer = DrawerNavigator({
  NoteDraw: {
    screen: AppStack,
    navigationOptions: {
      drawerLabel: 'Home'
    }
  },
  UserDraw: {
    screen: ProfileStack,
    navigationOptions: {
      drawerLabel: 'Edit Profile'
    }
  },
  LogoutDraw: {
    screen: Logout,
    navigationOptions: {
      drawerLabel: 'Logout'
    }
  }
}, {
  contentComponent: DrawerContent,
  drawerBackgroundColor: '#092035',
  contentOptions: {
    activeTintColor: '#092035',
    inactiveTintColor: '#fff',
    activeBackgroundColor: '#fff',
  }
});


export const RootStack = SwitchNavigator({
  Entry: AppEntryStack,
  Auth: AuthStack,
  App: AppDrawer
});
