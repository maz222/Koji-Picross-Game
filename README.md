# Custom Game Wrapper

## Adding Your Game

You will want to replace the contents of `frontend/Game` with your game.

There is a `Game` component, where you will want to place the init/destroy functions. `componentDidMount` and `componentWillUnmount` would be handy places to do this.

## Functions

The following functions are passed to the `Game` component. From there, you can pass them to a game instance, expose them globally, etc.

`setAppView`: Use this to set the app view. Primarily, you will only want to set it to `postGame`, to trigger the post game screen from inside your game
`setScore`: Use this to set the score for submission to the leaderboard
`setOutcome`: Use this to set the outcome of the game, either `win` or `lose`, which will allow for conditional rendering on the post game screen

## Updating

You can pull in updates from the original Game Wrapper.

### Setting the upstream repository

First, you will need to set the correct upstream repository:

`git remote add upstream-game-wrapper https://projects.koji-cdn.com/4fba5aca-3a39-409c-8db0-c660207a39ee.git`

This will add the parent game wrapper repository to your git configuration.

### Pulling in updates

You can pull and merge updates from the upstream repository using the following command:

`git fetch upstream-game-wrapper && git merge upstream-game-wrapper/master --no-edit`

Updates should be primarily focused on the wrapper, backend, and packages. If you keep your changes primarily to the `frontend/Game` folder, then you shouldn't have to deal with merge conflicts too frequently.