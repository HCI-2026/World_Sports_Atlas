# World Sports Atlas

HCI group project: Traditional Sports & Martial Arts Around the World (theme: Internationalization).

## Files

| File | What it is |
| --- | --- |
| `index.html` | Home page: banner, interactive world map, list of all sports |
| `about.html` | About the project and how to use the map |
| `sources.html` | Every Wikipedia source and video link |
| `style.css` | All styling for every page (external stylesheet) |
| `js/data.js` | All sport content: facts, key terms, video IDs, map locations |
| `js/howtoplay.js` | What each sport is, how it is played and how to win |
| `js/countries.js` | Which continent each country belongs to |
| `js/map.js` | Map, zoom, hover list, side panel, banner slideshow |

## How to open it

The site needs an internet connection, because it loads the map shapes, the D3 map library and the photos from the web.

Best way: open the folder in VS Code and use the **Live Server** extension (right-click `index.html` > Open with Live Server).

Double-clicking `index.html` also works. Videos are shown as thumbnails that open on YouTube in a new tab.

## Editing content

- To change how a sport is explained, edit `js/howtoplay.js`.
- To change a fact, edit `js/data.js`. Each sport has `sections` (heading + text) and `terms` (term + meaning). Wrap a word in `*stars*` to make it italic.
- The list under the map and the Sources table are written into `index.html` and `sources.html`. If you add or rename a sport in `data.js`, update those two pages too.
