module.exports = {
  expo: {
    name: 'panier-local',
    slug: 'panier-local',
    version: '1.0.0',
    orientation: 'portrait',
    scheme: 'panierlocal',
    userInterfaceStyle: 'automatic',
    android: {
      predictiveBackGestureEnabled: false,
    },
    web: {
      output: 'static',
      bundler: 'metro',
    },
    plugins: ['expo-router'],
    extra: {
      eas: {
        projectId: '1f565a66-9248-4234-aeec-1e45b57d95c0',
      },
    },
  },
};
