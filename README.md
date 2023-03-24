# Link Builder

Make Link alternative to WebExtensions.

Easily build links and copy them to the clipboard in various formats.

## Usage

Link Builder adds context menus that copy the page title and/or URL to the clipboard.
You can create your own copy formats.
In addition to plain text, you can also copy as styled text.

### Copying to the Clipboard

1. Open the web page.
1. Access the context menus.
1. Choose a format from [Link Builder].

### Customization

You can customize the following:

- Add user-defined formats.
- Edit preset or user-defined formats.
- Delete preset or user-defined formats.
- Hide formats from the context menu.
- Reorder formats in the context menu.

Customizations can be made on the options page. You can open the options page from the context menu, [Link Builder] > [Configure].

#### Adding a Custom Format

1. Click the [Add New Format] button and select [Text] or [Styled Text].
1. Fill in the Name and Format fields, then click [Save].

#### Reordering Formats in the Context Menu

You can change the order of menu items.

1. Grab the handle on the right side of the format.
1. Drag and drop it to the desired position.

## For Developers

### Getting Started

Install dependencies and build.

```shell
% yarn install
% yarn build
```

### Scripts

- yarn watch: Build in watch mode
- yarn test: Run tests
- yarn lint: Lint code using ESLint
- yarn format: Format code using Prettier
- yarn storybook: Launch Storybook
