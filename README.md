# Cocktail

Drug Safety App

## Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v14 or higher)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   [Expo Go](https://expo.dev/client) app on your mobile device
    -   [iOS App Store](https://apps.apple.com/app/apple-store/id982107779)
    -   [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/michaelslain/cocktail.git
cd cocktail
```

2. Install dependencies:

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

## Running the App

1. Start the development server:

```bash
# Using npm
npm start

# Or using yarn
yarn start
```

2. Open the app on your device:
    - iOS: Open the Camera app and scan the QR code shown in the terminal
    - Android: Open the Expo Go app and scan the QR code
    - Or press 'i' for iOS simulator or 'a' for Android emulator (if installed)

## Development

-   The app will reload automatically when you save changes
-   Shake your device to open the developer menu
-   Press 'r' in the terminal to reload the app
-   Press 'm' to toggle the menu

## Troubleshooting

If you encounter any issues:

1. Make sure Expo Go is up to date
2. Try clearing the npm/yarn cache:
    ```bash
    npm cache clean -f
    # or
    yarn cache clean
    ```
3. Delete node_modules and reinstall:
    ```bash
    rm -rf node_modules
    yarn install
    ```
