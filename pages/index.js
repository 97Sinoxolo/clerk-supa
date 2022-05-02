import styles from "../styles/Home.module.css";
import { useUser, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { useState } from "@clerk/nextjs";

const supabaseClient = async (supabaseAccessToken) => {const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY
  );

  // set Supabase JWT on the client object
  //so it is sent up with all the Supabase requests
  supabase.auth.setAuth(supabaseAccessToken);

  return supabase;
}

export default function Home() {
  

  const { isSignedIn, isLoading, user } = useUser();
  return (
    <>
      <Header />
      {isLoading ? (
        <></>
      ) : (
        <main className={styles.main}>
          <div className={styles.container}>
            {isSignedIn ? (
              <>
                <div className={styles.label}>Welcome {user.firstName}!</div>
                <AddTodoForm todos={todos} setTodos={setTodos} />
                <TodoList todos={todos} setTodos={setTodos} />
              </>
            ) : (
              <div className={styles.label}>
                Sign in to create your todo list!
              </div>
            )}
          </div>
        </main>
      )}
    </>
  );
}

const Header = () => {
  const { isSignedIn } = useUser();

  return (
    <header className={styles.header}>
      <div>My Todo App</div>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <div>
          <SignInButton/>
          &nbsp;
          <SignUpButton/>
        </div>
      )
      }
    </header>
  )
}