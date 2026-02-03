import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";

export default function NavbarLayout() {
  return (
    <div className="flex flex-row bg-zinc-900 p-2 justify-between w-full h-12 items-center border-b-2 border-b-zinc-800">
      <div className="nav-left">
        <h1 className="text-xl">All Notes</h1>
      </div>
      <div className="nav-right flex flex-row items-center">
        <SignedOut>
          <button className="button-md button-accept">
            <SignInButton />
          </button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
