import { createSignal } from "solid-js";
import { Show } from "solid-js";
import { createMutation, createQuery } from "solid-urql";

export default function Counter() {
  const [count, setCount] = createSignal(0);

  const loginMutation = `
  mutation {
  login(input:{ password:"password", email:"kieran@email.com"})  
  }`;

  const deckQuery = `
  query {
  getDecks {
    id
  }
}`;

  const [result, login] = createMutation(loginMutation);

  const [decks, deckState] = createQuery({
    query: deckQuery,
  });

  login();

  console.log("hello", result());

  return (
    <Show when={!deckState().fetching} fallback={<p>Loading...</p>}>
      <p>
        Items are:{" "}
        {decks()
          .getDecks.map((item: any) => item.title)
          .join()}
      </p>
    </Show>
  );
}
