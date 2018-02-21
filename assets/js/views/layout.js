import { h, Component, createElement } from 'preact';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../components/navbar.js';
import GuessView from './guessing.js';
import LeaderboardView from './leaderboards';

const cookies = document
  .cookie
  .split("; ")
  .map(cookie => cookie.split("="))
  .reduce((acc, x) => Object.assign(acc, {[x[0]]: x[1]}), {});

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: cookies["username"],
      moderator: cookies["roll"] === "mod" || cookies["role"] === "admin",
    };
  }

  render(props, state) {
    return (
      <div class="container">
        <div class="row">
          <div class="col">
            <Navbar username={state.username} />
          </div>
        </div>
        <Switch>
          <Route exact path="/" render={() => (<GuessView {...state} />)} />
          <Route path="/leaderboards/" component={LeaderboardView} />
        </Switch>
      </div>
    );
  }
}