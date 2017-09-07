const MatchWhenLoggedIn = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      client.isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: {from:props.location
            }
          }}
        />
      )}
  />
);
