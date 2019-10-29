---
title: Data fetching with a diet state machine and ReasonML
date: '2019-10-27T23:09:29.119Z'
template: 'post'
draft: false
slug: '/posts/data-fetching-state-machine-reasonml'
category: 'Post'
tags:
  - 'Software Engineering'
  - 'State Machines'
  - 'XState'
  - 'ReasonML'
  - 'React'
  - 'ReasonReact'
  - 'RemoteData'
  - 'bs-remotedata'
description: 'Placeholder content'
---

```ocaml
[@react.component]
let make = () => {
  let ((status, movieTitles), send) =
    React.useReducer(, initial);
  React.useEffect1(
    () => {
      let didCancel = ref(false);
      switch (status) {
      | Loading when didCancel^ == false =>
        FlowbuilderApi.Templates.getAll(~accountId, ~domain)
        ->Future.map(
            fun
            | Result.Ok(ts) => Receive(ts)
            | Result.Error(_) => Fail,
          )
        ->Future.tap(send)
        ->ignore;
        Some(() => didCancel := true);
      | Loading
      | Success
      | Failure
      | NotAsked =>
        send(NoOp);
        None;
      };
    },
    (status),
  );
  switch (status) {
  | Success => movieTitles->Belt.Array.map((x => <div>{x}</div>)->React.array
  | Failure => "🤧"
  | Loading
  | NotAsked => "Loading...🤔"->React.string
  };
};
```

```ocaml
module Remote = {
  type status =
    | Loading
    | Success
    | Failure
    | NotAsked;
  type event('a) =
    | Receive('a)
    | Fail
    | Fetch
    | NoOp;
  let initial = (Loading, None);
  type t('a) = (status, option('a));
  let make = ((status, xs), event) =>
    switch (status, event) {
    | (Loading, Receive(x)) => (Success, Some(x))
    | (Loading, Fail) => (Failure, xs)
    | (NotAsked, Fetch)
    | (Success, Fetch)
    | (Failure, Fetch) => (Loading, xs)
    | (Loading, Fetch)
    | (Success, Receive(_))
    | (Success, Fail)
    | (Failure, Receive(_))
    | (Failure, Fail)
    | (NotAsked, Fail)
    | (NotAsked, Receive(_))
    | (_, NoOp) => (status, xs)
    };
};
```
