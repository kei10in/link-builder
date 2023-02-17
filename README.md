# Link Builder

Make Link alternative to WebExtensions.

Build a link and copy to the clipboard in various formats.

## Usage

Link Builder add the context menus that copies page title and/or page url to the clipboard.
You can create your own copy format.
In addition to copying as plain text, you can also copy as styled text.

### Copy to the clipboard

1. Open the web page.
2. Open the context menus.
3. Select format from [Link Builder].

### Customize

You can customize the following:

* Add the user defined format.
* Edit the preset or user defined format.
* Delete the preset or user defined format.
* Hide the format from the context menu.
* Recorder formats in the context menu.

These customization are made on the option page.
You can open the option page from context menu, [Link Builder] > [Configure].

#### Add the custom format

1. Click [Add New Format] button and select [Text] or [Styled Text].
2. Type Name and Format fields and click [Save].

#### Reorder formats in the context menu

You can change the order of menu items.

1. Grab the right side handle of the format.
2. Drag and drop to the desired position.

## For Developer

### Getting Started

Install dependencies and build.

```
% yarn install
% yarn build
```

### Scripts

* `yarn watch`: Build in watch mode
* `yarn test`: Run tests
* `yarn lint`: Lint code by ESLint
* `yarn format`: Format code by prettier
* `yarn storybook`: Start storybook

