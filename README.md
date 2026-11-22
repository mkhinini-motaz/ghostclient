# ghostclient: the GhostChef customer phone app

ghostclient is the customer phone app of [GhostChef](https://github.com/mkhinini-motaz/ghostchef), a food-ordering platform I started in 2019. I wrote it by hand, before I used coding agents, between January and October 2023 (202 commits). A restaurant I co-founded took its orders through GhostChef from December 2021 to October 2023.

The other parts of the system:

- [Food](https://github.com/mkhinini-motaz/Food): the Laravel API this app calls
- [food-client](https://github.com/mkhinini-motaz/food-client): customer web app
- [food-shop](https://github.com/mkhinini-motaz/food-shop): shop back office
- [food-ws](https://github.com/mkhinini-motaz/food-ws): realtime server
- [deliveryapp](https://github.com/mkhinini-motaz/deliveryapp): delivery (rider) app

## What it does

The app has a drawer menu with the main screens (`src/navigation/DrawerNavigator.tsx`) and stacks for login, shopping and the cart.

- **Login and account**
  - Log in with a phone number and password.
  - Register with name, gender, birth date and an optional invite code. A one-time code is sent by SMS and entered on the OTP screen.
  - Reset a forgotten password with a one-time code.
  - Edit the profile and change the password.
- **Browse**
  - Home shows the services; a service leads to its shop list, then to a shop with its categories and a search bar.
  - A category lists products. A product with option groups opens a screen where the customer picks options, within the minimum and maximum set for each group.
  - A shop location screen shows the shop on a map.
- **Cart and order**
  - Add and remove products and change quantities; the drawer shows a cart badge.
  - Choose delivery or take away, add a note and apply a promo code.
  - Pick the delivery address on a map that draws the shop's service area, with the user's position followed live.
  - Submit the order to the API.
- **Orders**: list of past orders with date, shop, products and total. A past order can be replayed: it refills the cart, the address and the note.
- **Loyalty**: points, loyalty actions, available promo codes, and the user's invite code (copied to the clipboard).
- **Languages**: French, English, Arabic and two Tunisian variants, switched in a language screen, with right-to-left layout for Arabic (`src/i18n`).

## Stack

- React Native 0.72, React 18, TypeScript 4.8
- React Navigation 6 (drawer, bottom tabs, native stack)
- React Query 3 for server data; React context with reducers for the cart and the language
- `axios` 1, `react-native-maps` 1, `react-native-date-picker`, `react-native-mask-input`
- `react-native-reanimated` 3, `react-native-fast-image`, `react-native-svg`
- Jest 29, ESLint 8, Prettier 2

## Layout

```
src/screens/      one file per screen
src/navigation/   root, login, home, drawer and cart navigators
src/components/   Cart, Product, Category, Shop, Order, Loyalty, Form, Common
src/api/          API calls: auth, shop, order, promo code, loyalty, service
src/classes/      TypeScript types for API objects
src/store/        cart and language state
src/i18n/         translations
android/, ios/    native projects
```

## Running it

```
npm install
npm start          # Metro bundler
npm run android
npm run ios        # run `pod install` in ios/ first
npm test
npm run lint
```

The app calls the client API of [Food](https://github.com/mkhinini-motaz/Food). The code is archived and not maintained, and it may need older Node, Android or iOS tooling to build.

## Status

Archived. The restaurant closed in October 2023. Since September 2026 I am rebuilding GhostChef as a delivery platform with Claude Code; that code is private. The [case study](https://github.com/mkhinini-motaz/ghostchef) tells the full story.
