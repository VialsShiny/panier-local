# Panier Local

Application mobile iOS et Android pour accompagner les adhérents dans le retrait de paniers de producteurs : consulter les retraits, repérer les points de collecte et valider un retrait.

![Expo SDK 57](https://img.shields.io/badge/Expo-SDK%2057-000020?logo=expo&logoColor=white)
![React Native 0.86](https://img.shields.io/badge/React%20Native-0.86-61DAFB?logo=react&logoColor=black)
![NativeWind 4](https://img.shields.io/badge/NativeWind-4-38BDF8?logo=tailwindcss&logoColor=white)
![JavaScript JSX](https://img.shields.io/badge/JavaScript-JSX-F7DF1E?logo=javascript&logoColor=black)

## Stack technique

- **Expo SDK 57** et **React Native 0.86**
- **React 19**
- **Expo Router** pour la navigation basée sur les fichiers
- **JavaScript et JSX**
- **NativeWind 4** et **Tailwind CSS 3** pour les styles utilitaires
- **EAS** pour les builds et la distribution

## Prérequis

- Node.js LTS et npm
- Git
- Un appareil iOS ou Android pour tester les fonctionnalités natives
- Un compte Expo pour les builds EAS

Le manifeste ne spécifie pas de version minimale de Node.js.

## Installation

Le projet Expo se trouve dans le dossier `src/` :

```bash
cd src
npm install
```

## Lancement

Depuis `src/`, lancer l’application avec l’une de ces commandes :

| Commande | Cible |
| --- | --- |
| `npm start` | Serveur de développement Expo |
| `npm run android` | Android |
| `npm run ios` | iOS |
| `npm run web` | Web |
| `npm run lint` | Vérification du code |

## Fonctionnalités de l’application

L’application comprend les écrans suivants :

- **Accueil** : écran principal
- **Carte** : écran de localisation des points de collecte
- **Scanner** : écran associé au scan de retrait
- **Profil** : espace du membre
- **Détail d’un retrait** : route paramétrée par identifiant

La navigation et les écrans constituent le socle de l’application. Le comportement présenté dans chaque écran dépend de son implémentation et des services configurés.

## Architecture

```text
src/
├── app/                         Routes et layouts Expo Router
│   ├── _layout.jsx              Layout racine et import de global.css
│   ├── index.jsx                Redirection vers les onglets
│   ├── (tabs)/
│   │   ├── _layout.jsx          Navigation par onglets
│   │   ├── index.jsx            Accueil
│   │   ├── map.jsx              Carte
│   │   ├── scan.jsx             Scanner
│   │   └── profile.jsx          Profil
│   └── pickup/
│       └── [id].jsx             Détail d’un retrait
├── components/                  Composants d’interface réutilisables
├── hooks/                       Hooks React partagés
├── services/                    Accès API et intégrations
├── utils/                       Fonctions utilitaires
├── constants/                   Valeurs partagées
├── app.config.js                Configuration Expo
├── babel.config.js              Transformation JSX et NativeWind
├── metro.config.js              Bundler Metro et NativeWind
├── tailwind.config.js           Sources et preset Tailwind
├── global.css                   Directives Tailwind
├── eas.json                     Profils de build EAS
├── package.json                 Dépendances et scripts npm
└── package-lock.json            Versions verrouillées par npm
```

Les fichiers de routes déterminent les URL. La route `/` redirige vers le groupe `(tabs)`, dont le nom n’apparaît pas dans les URL. La route `pickup/[id]` accepte un identifiant dynamique, par exemple `/pickup/12`.

## Styles avec NativeWind

La configuration NativeWind relie Tailwind au pipeline de compilation Expo :

1. `global.css` déclare les directives Tailwind.
2. `app/_layout.jsx` importe la feuille CSS globale.
3. `babel.config.js` configure le preset Expo et NativeWind.
4. `tailwind.config.js` précise les fichiers JSX à analyser et le preset NativeWind.
5. `metro.config.js` traite le CSS avec `withNativeWind`.
6. `app.config.js` sélectionne Metro pour le web.

Exemple d’utilisation dans un écran :

```jsx
import { Text, View } from 'react-native';

export default function Example() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-500">
      <Text className="text-2xl font-bold text-white">
        Bonjour Panier Local
      </Text>
    </View>
  );
}
```

## Variables d’environnement

Le fichier `.env.example` fournit le nom de la variable utilisée pour l’URL de l’API :

```text
EXPO_PUBLIC_API_URL
```

Depuis `src/`, créer le fichier local à partir du modèle :

```bash
cp .env.example .env
```

Les variables préfixées par `EXPO_PUBLIC_` sont intégrées à l’application et doivent être considérées comme publiques. Ne pas y placer de secrets et ne pas partager le contenu du fichier `.env`.

Pour tester depuis un téléphone, l’adresse de l’API doit être accessible depuis le réseau de l’appareil. `localhost` sur le téléphone ne désigne pas l’ordinateur de développement.

## Dépendances principales

Le projet inclut notamment :

- **Navigation et interface :** `expo-router`, `react-native-screens`, `react-native-safe-area-context`
- **Styles et animations :** `nativewind`, `tailwindcss`, `react-native-reanimated`, `react-native-worklets`
- **Données et réseau :** `@tanstack/react-query`, `expo-sqlite`, `@react-native-community/netinfo`
- **Modules natifs :** `expo-camera`, `expo-location`, `react-native-maps`, `expo-image-picker`, `expo-image-manipulator`, `expo-notifications`, `expo-haptics`, `expo-secure-store`

Les versions précises sont définies dans `src/package.json` et verrouillées dans `src/package-lock.json`.

## Builds EAS

`eas.json` définit les profils `development`, `preview` et `production`.

```bash
eas build --profile development
eas build --profile preview
eas build --profile production
```

Le profil `development` produit un build de développement, `preview` une version distribuable pour les tests internes et `production` un build de production. Les builds iOS et Android peuvent nécessiter des identifiants et certificats configurés dans EAS.
