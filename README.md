# Kernel tech test

## Tech reqs

- If localstorage is empty fetch initial data from https://finalspaceapi.com/api/v0/episode
  - Store results in localstorage
- If localstorage is populated use that to populate page
  - Show data possibly stale warning with refresh option
  - If refresh button is clicked clear localstorage and reload page
- build helper for fetching data
  - Send the url and return the result
- Stub components for:
  - character: which renders image and fallback
  - episode: which renders episode info and contains character components
  - page: which renders 10 episodes
  - pagination: which renders available pages
  - container: which renders page and pagination components
